import React from 'react';
import './App.css';
import PDFViewer from './PDFViewer';
import 'pdfjs-dist/webpack';

function App() {
  const pdfUrl = 'http://localhost:8082/download';
  const tocUrl = 'http://localhost:8082/toc.json';

  return (
    <div>
      <h1>PDF Viewer with TOC</h1>
      <PDFViewer pdfUrl={pdfUrl} tocUrl={tocUrl} />
    </div>
  );
}

export default App;
