import { usePdfViewerLogic } from "./pdf-viewer.logic";

import { Box, Divider, IconButton, TextField } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import TableOfContents from "../table-of-contents/table-of-contents";
import { usePdfViewerStyle } from "./pdf-viewer.style";

interface Props {
  pdfUrl: string;
  tocUrl: string;
}
const PDFViewer = (props: Props) => {
  const { handlers, setState, state } = usePdfViewerLogic(props);
  const sx = usePdfViewerStyle();

  return (
    <Box sx={sx.wrapper}>
      <TextField
        size='small'
        name='keyword_search'
        label='Search in document'
        value={state.searchQuery}
        onChange={(e) => setState.setSearchQuery(e.target.value)}
      />

      <Box sx={sx.contentWrapper}>
        <Box sx={sx.leftSideWrapper}>
          <Box sx={sx.iconsWrapper}>
            <IconButton size='small'>
              <DescriptionOutlinedIcon />
            </IconButton>
            <IconButton size='small' color='primary'>
              <SubjectOutlinedIcon />
            </IconButton>
          </Box>

          <Divider />

          <Box>
            {state.canvases.map((canvas, index) => (
              <canvas
                key={index}
                ref={(el) => handlers.handleRenderPdf(canvas, index, el)}
              />
            ))}
          </Box>
        </Box>

        <Divider sx={sx.divider} />

        <TableOfContents
          toc={state.toc}
          visibleItems={state.visibleItems}
          handleItemClick={handlers.handleItemClick}
        />
      </Box>
    </Box>
  );
};

export default PDFViewer;
