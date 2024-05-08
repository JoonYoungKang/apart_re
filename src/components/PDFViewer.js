import React from 'react';

function PDFViewer({ src }) {
  return (
    <iframe src={src} style={{ width: '100%', height: '500px' }} frameborder="0"></iframe>
  );
}

export default PDFViewer;
