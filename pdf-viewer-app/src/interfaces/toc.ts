export interface TocItem {
  left: number;
  top: number;
  width: number;
  height: number;
  page_number: number;
  page_width: number;
  page_height: number;
  text: string;
  type: string;
}

export interface BlockSizes {
  pageIndex: number;
  rects: number[];
  size: number[];
  font: {
    name: string;
    highlightX: number;
    highlightY: number;
    highlightWidth: number;
    highlightHeight: number;
  };
  before: {
    name: string;
    highlightX: number;
    highlightY: number;
    highlightWidth: number;
    highlightHeight: number;
  };
}
