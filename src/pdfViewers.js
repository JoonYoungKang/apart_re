import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { pdfjs } from 'react-pdf';

import 'bootstrap/dist/css/bootstrap.min.css';

// pdfjs 라이브러리의 worker 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = ({ hexString }) => {
    const [pdfData, setPdfData] = useState(null);

    // PDF 헥사값을 Blob으로 변환하고 다운로드
    const handleDownloadPdf = () => {
        const hexStringCleaned = hexString.replace(/["]/g, '');
        const bytes = new Uint8Array(hexStringCleaned.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        const blob = new Blob([bytes], { type: 'application/pdf' });
        setPdfData(blob); // 상태 업데이트
        saveAs(blob, "downloaded.pdf");
    };

    return (
        <div>
            <button onClick={handleDownloadPdf}>PDF 다운로드</button>
        </div>
    );
};

export default PdfViewer;
