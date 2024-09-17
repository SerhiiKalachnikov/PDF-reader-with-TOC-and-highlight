import { Box, Typography } from "@mui/material";

import PDFViewer from "../../components/pdf-viewer/pdf-viewer";
import { useHomePageStyle } from "./home.style";

const pdfUrl = "http://localhost:8082/download";
const tocUrl = "http://localhost:8082/toc.json";

const HomePage = () => {
  const sx = useHomePageStyle();

  return (
    <Box sx={sx.wrapper}>
      <Typography variant='h4'>PDF Viewer with TOC</Typography>

      <PDFViewer pdfUrl={pdfUrl} tocUrl={tocUrl} />
    </Box>
  );
};

export default HomePage;
