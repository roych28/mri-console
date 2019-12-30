import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import './index.scss';

function MyDropzone(props) {
    const { setFiles } = props;
    const path = '';
    const onDrop = useCallback(
        acceptedFiles => {
            console.log(acceptedFiles);
            if (acceptedFiles && acceptedFiles.length > 0) {
                if (acceptedFiles.length === 1 && acceptedFiles[0].path.endsWith('.pdf')) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        // Do whatever you want with the file contents
                        const binaryStr = reader.result;
                        console.log(binaryStr);
                        setFiles(binaryStr, 'pdf');
                    };
                    reader.readAsDataURL(acceptedFiles[0]);
                    console.log(acceptedFiles);
                }
            } else console.log('No files accepted');
        },
        [setFiles]
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className='dropzone-container'>
            <input {...getInputProps()} type='file' directory='' webkitdirectory='' multiple={false} />
            {isDragActive ? (
                <label className='drop-instruction'>Drop the pdf file here ...</label>
            ) : (
                <label className='drop-instruction'>
                    Drag 'n' drop a PDF file here, or click to select a file
                </label>
            )}
        </div>
    );
}

export default MyDropzone;
