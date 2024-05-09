import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { Document, Page, pdfjs } from 'react-pdf';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// pdfjs 라이브러리의 worker 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = ({ hexString }) => {

    const [pdfData, setPdfData] = useState(null);
    const [numPages, setNumPages] = useState(null);

    const hexString2 = hexString.replace(/["]/g,'');

    // PDF 로드 성공 시 호출될 함수
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    // PDF 헥사값을 Blob으로 변환
    const handleLoadPdf = (hex) => {
        const bytes = new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        const blob = new Blob([bytes], { type: 'application/pdf' });
        setPdfData(blob);
    };

    // PDF 다운로드
    const handleDownloadPdf = () => {
        saveAs(pdfData, "downloaded.pdf");
    };

    return (
        <div>
            <button onClick={() => handleLoadPdf( hexString2 )}>PDF 불러오기</button>
            <button onClick={handleDownloadPdf}>PDF 다운로드</button>
            {pdfData && (
                <Document
                    file={pdfData}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page key={`page_${1}`} pageNumber={1} />
                </Document>
            )}
        </div>
    );
};

export default PdfViewer;
