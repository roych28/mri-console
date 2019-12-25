import React from 'react';
import PDFViewer from 'pdf-viewer-reactjs';

import './index.scss';

const PDFRenderer = props => {
    const { pdfFile } = props;
    console.log(pdfFile);
    return (
        <PDFViewer
            document={{
                url: pdfFile
            }}
            scale={0.95}
            scaleStep={0.1}
            maxScale={1.05}
            minScale={0.6}
            navbarOnTop
            css='customViewer'
            canvasCss='customCanvas'
            // navigation={{
            //     css: {
            //         navbarWrapper: 'navBarWrapper'
            //     }
            // }}
        />
    );
};

export default PDFRenderer;
