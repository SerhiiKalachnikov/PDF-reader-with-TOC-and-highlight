import { usePdfViewerLogic } from "./pdf-viewer.logic";

interface Props {
  pdfUrl: string;
  tocUrl: string;
}
const PDFViewer = (props: Props) => {
  const { data, handlers, setState, state } = usePdfViewerLogic(props);

  return (
    <div>
      <input
        type='text'
        placeholder='Search in document'
        value={state.searchQuery}
        onChange={(e) => setState.setSearchQuery(e.target.value)}
      />
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          {state.canvases.map((canvas, index) => (
            <canvas
              key={index}
              ref={(el) => {
                data.canvasRefs.current[index] = el;
                if (el) {
                  el.width = canvas.width;
                  el.height = canvas.height;
                  const context = el.getContext("2d");
                  if (context) {
                    context.drawImage(canvas, 0, 0);

                    // Highlight specific areas within the canvas
                    const item = state.toc[state.highlightedItem!];
                    if (item && item.page_number === index + 1) {
                      context.strokeStyle = "yellow";
                      context.lineWidth = 3;
                      context.strokeRect(
                        item.left,
                        item.top,
                        item.width,
                        item.height
                      );
                    }

                    // Highlight search results
                    for (const res of state.searchResults) {
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
                        font.highlightHeight + 4
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
              }}
              style={{
                marginBottom: "10px",
              }}
            />
          ))}
        </div>
        <div
          style={{
            width: "300px",
            padding: "10px",
            borderLeft: "1px solid #ccc",
            position: "sticky",
            top: "0",
            backgroundColor: "white",
            zIndex: 1000,
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <h3>Table of Contents</h3>
          <ul>
            {state.toc.map((item, index) => (
              <li key={index}>
                <div
                  onClick={() => handlers.handleItemClick(index)}
                  style={{ cursor: "pointer" }}
                >
                  {item.text.substring(0, Math.min(item.text.length, 20))}
                  {"..."}
                  {state.visibleItems[index] ? "▲" : "▼"}
                </div>
                {state.visibleItems[index] && (
                  <div>
                    <p>{item.text}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
