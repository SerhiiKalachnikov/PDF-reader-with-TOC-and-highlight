import { useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import { BlockSizes, TocItem } from "../../interfaces/toc";
import { TextItem } from "pdfjs-dist/types/src/display/api";

const pdfjsLib = pdfjs;

interface Props {
  pdfUrl: string;
  tocUrl: string;
}

export const usePdfViewerLogic = (props: Props) => {
  const { pdfUrl, tocUrl } = props;

  // State to store the PDF document proxy
  const [pdfProxy, setPdfProxy] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [canvases, setCanvases] = useState<HTMLCanvasElement[]>([]);

  const [searchResults, setSearchResults] = useState<BlockSizes[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  function getTextSize(text: string, font: string) {
    // Create a temporary canvas element
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    if (!context) return { width: 0, height: 0 };
    context.font = font; // e.g., '16px Arial'

    // Measure the text
    let textMetrics = context.measureText(text);

    // Width of the text
    let width = textMetrics.width;

    // Approximate height (from ascent and descent properties)
    let height =
      Math.abs(textMetrics.actualBoundingBoxAscent) +
      Math.abs(textMetrics.actualBoundingBoxDescent);

    return { width, height };
  }

  // State to store the visible items in the TOC
  const [visibleItems, setVisibleItems] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [highlightedItem, setHighlightedItem] = useState<number | null>(null);

  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  const normalizeText = (text: string) => {
    return text
      .replace(/- /g, " ") // Replace hyphens with spaces
      .replace(/-/g, "")
      .replace(/[^\w\s]/g, "") // Remove all non-word characters except spaces
      .toLowerCase() // Convert to lowercase
      .trim(); // Trim whitespace
  };

  const handleRenderPdf = (
    canvas: HTMLCanvasElement,
    index: number,
    el: HTMLCanvasElement | null,
  ) => {
    canvasRefs.current[index] = el;
    if (el) {
      el.width = canvas.width;
      el.height = canvas.height;
      const context = el.getContext("2d");
      if (context) {
        context.drawImage(canvas, 0, 0);

        // Highlight specific areas within the canvas
        const item = toc[highlightedItem!];
        if (item && item.page_number === index + 1) {
          context.strokeStyle = "yellow";
          context.lineWidth = 3;
          context.strokeRect(item.left, item.top, item.width, item.height);
        }

        // Highlight search results
        for (const res of searchResults) {
          const page = res.pageIndex;
          const rects = res.rects;
          const font = res.font;
          if (page !== index) continue;

          // if (result.pageIndex === pageIndex) {
          context.strokeStyle = "blue";
          context.lineWidth = 2;
          context.strokeRect(
            font.highlightX,
            canvas.height - rects[5] - rects[3],
            font.highlightWidth,
            font.highlightHeight + 4,
          );
        }

        // Highlight text before the word
        // for (const res of searchResults) {
        //   const page = res.pageIndex;
        //   const rects = res.rects;
        //   const font = res.before;
        //   if (page !== index) continue;

        //   context.strokeStyle = 'red';
        //   context.lineWidth = 2;
        //   context.strokeRect(
        //     font.highlightX,
        //     canvas.height - rects[5] - rects[3],
        //     font.highlightWidth,
        //     font.highlightHeight,
        //   );
        // }
      }
    }
  };

  const handleSearchInDocument = async (query: string) => {
    if (!pdfProxy) return;

    const results: BlockSizes[] = [];
    for (let i = 0; i < pdfProxy.numPages; i++) {
      const page = await pdfProxy.getPage(i + 1);
      const textContent = await page.getTextContent();
      const textItems = textContent.items;

      // each line of text is a TextItem
      textItems.forEach((item, index) => {
        const textItem = item as TextItem;
        const font = textItem.fontName;
        const fontSize = textItem.height;
        const fontName = `${fontSize}px ${font}`;

        if (textItem.str) {
          const originalSTR = textItem.str;
          const normalStr = normalizeText(textItem.str);
          const wordIndex = normalStr
            .toLowerCase()
            .indexOf(query.toLowerCase());

          if (normalStr.toLowerCase().includes(query.toLowerCase())) {
            const transform = textItem.transform;
            const width = Math.sqrt(
              transform[0] * transform[0] + transform[1] * transform[1],
            );
            const height = Math.sqrt(
              transform[2] * transform[2] + transform[3] * transform[3],
            );

            const partBeforeWord = originalSTR.slice(0, wordIndex);

            // Measure width of text before the word to position the highlight correctly
            let canvas = document.createElement("canvas");
            let context = canvas.getContext("2d") as CanvasRenderingContext2D;
            context.font = fontName; // '16px Arial'

            // const widthBeforeWord = context.measureText(partBeforeWord).width;
            const widthCurrent = getTextSize(query, fontName);
            const widthBeforeWord = getTextSize(partBeforeWord, fontName);

            console.log("test", {
              pageIndex: i,
              rects: transform,
              size: [width, height],
              font: {
                name: fontName,
                highlightX: transform[4] + widthBeforeWord.width,
                highlightY: transform[5],
                highlightWidth: widthCurrent.width,
                highlightHeight: widthCurrent.height,
                text: query,
              },
              before: {
                name: fontName,
                highlightX: transform[4],
                highlightY: transform[5],
                highlightWidth: widthBeforeWord.width,
                highlightHeight: widthBeforeWord.height,
                text: partBeforeWord,
              },
              fsz: {
                fontSize: fontSize,
                fontName: fontName,
              },
            });

            results.push({
              pageIndex: i,
              rects: transform,
              size: [width, height],
              font: {
                name: textItem.fontName,
                highlightX: transform[4] + widthBeforeWord.width,
                highlightY: transform[5],
                highlightWidth: widthCurrent.width,
                highlightHeight: widthCurrent.height,
              },
              before: {
                name: textItem.fontName,
                highlightX: transform[4],
                highlightY: transform[5],
                highlightWidth: widthBeforeWord.width,
                highlightHeight: widthBeforeWord.height,
              },
            });
          }
        }
      });
    }
    setSearchResults(results);
  };

  useEffect(() => {
    if (!searchQuery) return;

    handleSearchInDocument(searchQuery);
  }, [searchQuery]);

  const handleItemClick = (index: number) => {
    const isOpened = visibleItems[index]; // check if the item is already opened
    if (isOpened) {
      setHighlightedItem(null);
      scrollTo(null);
    } else {
      setHighlightedItem(index);
      scrollTo(index);
    }
    setVisibleItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const scrollTo = (index: number | null) => {
    if (index == null) return;
    const item = toc[index];

    canvasRefs.current.forEach((canvas, pageIndex) => {
      if (canvas) {
        const context = canvas.getContext("2d");
        if (context) {
          if (item.page_number === pageIndex + 1) {
            canvasRefs.current[pageIndex]?.scrollIntoView({
              behavior: "smooth",
            });
          }
        }
      }
    });
  };

  // Load the PDF and TOC
  useEffect(() => {
    console.log("loading pdf and toc");
    const loadPDF = async (pdfUrl: string) => {
      const response = await fetch(tocUrl);
      const data = await response.json();
      setToc(data);

      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      setPdfProxy(pdf);
    };
    loadPDF(pdfUrl);
  }, [pdfUrl, tocUrl]);

  // Draw the TOC on the canvases
  useEffect(() => {
    console.log("drawing toc");
    const apply = async () => {
      if (!pdfProxy) return;
      // when the TOC is loaded, set all items to be visible
      const canvasArray: HTMLCanvasElement[] = [];
      for (let pageNum = 1; pageNum <= pdfProxy.numPages; pageNum++) {
        const page = await pdfProxy.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
          canvasContext: context as CanvasRenderingContext2D,
          viewport: viewport,
        };
        const renderTask = page.render(renderContext);
        await renderTask.promise;
        toc.forEach((item) => {
          if (item.page_number === pageNum) {
            if (context) {
              // debug: draw a rectangle around the item
              context.strokeStyle = "violet";
              context.lineWidth = 2;
              context.beginPath();
              context.rect(item.left, item.top, item.width, item.height); // Adjust width and height as needed
              context.stroke();
            }
          }
        });
        canvasArray.push(canvas);
      }
      setCanvases(canvasArray);
    };
    apply();
  }, [toc, pdfProxy]);

  return {
    data: { canvasRefs },
    state: {
      searchQuery,
      canvases,
      toc,
      highlightedItem,
      searchResults,
      visibleItems,
    },
    setState: { setSearchQuery },
    handlers: { handleItemClick, handleRenderPdf },
  };
};
