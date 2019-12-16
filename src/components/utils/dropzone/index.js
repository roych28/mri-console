import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import './index.scss';

function MyDropzone(props) {
    const { setFiles } = props;
    const onDrop = useCallback(
        acceptedFiles => {
            if (acceptedFiles && acceptedFiles.length > 0) setFiles(acceptedFiles);
            else console.log('No files accepted');
        },
        [setFiles]
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className='dropzone-container'>
            <input {...getInputProps()} directory='' webkitdirectory='' type='file' />
            {isDragActive ? (
                <p className='drop-instruction'>Drop the folder here ...</p>
            ) : (
                <p className='drop-instruction'>Drag 'n' drop a folder here, or click to select a folder</p>
            )}
        </div>
    );
}

export default MyDropzone;
