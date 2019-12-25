import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PDFViewer from 'pdf-viewer-reactjs';

// import { ReactComponent as fileSvg } from '../../theme/icons/icon_file.svg';
import './index.scss';
import MyDropzone from '../utils/dropzone';
import DwvComponent from './dicom-viewer';
import PDFRenderer from './pdf-renderer';
import pdfExample from 'assets/dummy-folder/transport.pdf';

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadingStatus: 1,
            uploadPercentage: 70,
            uploadingPdfStatus: 1,
            uploadPdfPercentage: 70,
            tab: 2,
            files: [],
            txtFile: null,
            pdfFile: null,
            reportText: 'No report yet',
            dicomLoaded: false
        };

        this.setFiles = this.setFiles.bind(this);
        this.onConfirmUpload = this.onConfirmUpload.bind(this);
        this.findtxtFile = this.findtxtFile.bind(this);
    }

    componentDidUpdate() {
        const { uploadPercentage } = this.state;
        const { history } = this.props;

        if (uploadPercentage === 100) {
            setTimeout(() => {
                history.push('/analysis');
            }, 300);
        }
    }

    onConfirmUpload(type) {
        if (type === 'dicom') {
            this.setState({ uploadingStatus: 3 });
            const interval = setInterval(() => {
                const { uploadPercentage } = this.state;
                this.setState({ uploadPercentage: uploadPercentage + 1 });
                if (uploadPercentage === 99) clearInterval(interval);
            }, 120);
        } else if (type === 'pdf') {
            this.setState({ uploadingPdfStatus: 3 });
            const interval = setInterval(() => {
                const { uploadPdfPercentage } = this.state;
                this.setState({ uploadPdfPercentage: uploadPdfPercentage + 1 });
                if (uploadPdfPercentage === 99) clearInterval(interval);
            }, 120);
        }
    }

    setFiles(acceptedFiles, fileType) {
        const { uploadingStatus } = this.state;
        console.log('ACCEPTED FILES:', acceptedFiles);
        if (uploadingStatus === 1 && fileType === 'txt') {
            // Pending
            this.setState({ uploadingStatus: 2, files: acceptedFiles });
            this.findtxtFile();
            console.log('State files:', this.state.files);
            return; // Set the confirm stage
        } else if (uploadingStatus === 1 && fileType === 'pdf') {
            this.setState({ uploadingPdfStatus: 2, pdfFile: acceptedFiles });
        }
    }

    findtxtFile() {
        const { files } = this.state;
        const txtFile = files.find(file => file.path.endsWith('.txt'));
        if (txtFile) {
            this.setState({ txtFile });
            this.renderTxtFile();
        }
        console.log(this.state.txtFile);
    }

    renderTxtFile() {
        const { txtFile } = this.state;
        let reader = new FileReader();
        reader.onload = event => {
            this.setState({ reportText: event.target.result });
        };
        reader.readAsText(txtFile);
    }

    render() {
        const {
            uploadingStatus,
            uploadPercentage,
            uploadingPdfStatus,
            uploadPdfPercentage,
            tab,
            reportText,
            pdfFile,
            dicomLoaded
        } = this.state;
        console.log('Tab: ', tab);
        console.log('Report Text:', reportText);
        console.log('Uploading Status:', uploadingStatus);
        return (
            <div className='upload-container'>
                <div className='tabs'>
                    {/*<p className={`tab ${tab === 1 ? 'active' : ''}`} onClick={() => this.setState({ tab: 1 })}>
                        FILE
        </p>*/}
                    <p
                        className={`tab ${tab === 2 ? 'active' : ''}`}
                        disabled={uploadingStatus !== 2}
                        onClick={() => this.setState({ tab: 2 })}
                    >
                        DICOM
                    </p>
                    <p
                        className={`tab ${tab === 3 ? 'active' : ''}`}
                        disabled={uploadingStatus !== 2}
                        onClick={() => this.setState({ tab: 3 })}
                    >
                        REPORT
                    </p>
                </div>
                <div className='upload-container-body'>
                    {/*<div className='body-tab-1' style={{ display: tab === 1 ? 'block' : 'none' }}>
                        <div className='fa fa-file-o fa-3x img' />
                        {uploadingStatus === 1 ? (
                            <MyDropzone className='dropzone' setFiles={this.setFiles} />
                        ) : uploadingStatus === 2 ? (
                            <p className='upload-btn' onClick={this.onConfirmUpload}>
                                Confirm Upload
                            </p>
                        ) : (
                            <p className='upload-btn filled'>Uploading {uploadPercentage}%</p>
                        )}
                        </div>*/}
                    <div className='body-tab-2' style={{ display: tab === 2 ? 'flex' : 'none' }}>
                        <DwvComponent onDicomLoad={() => this.setState({ uploadingStatus: 2 })} />
                        {uploadingStatus === 2 ? (
                            <p
                                className='upload-btn'
                                onClick={() => this.onConfirmUpload('dicom')}
                                style={{ display: uploadingStatus === 2 ? 'flex' : 'none' }}
                            >
                                Confirm DICOM
                            </p>
                        ) : (
                            <p
                                className='upload-btn filled'
                                style={{ display: uploadingStatus === 3 ? 'flex' : 'none' }}
                            >
                                Analyzing {uploadPercentage}%
                            </p>
                        )}
                    </div>
                    <div className='body-tab-3' style={{ display: tab === 3 ? 'flex' : 'none' }}>
                        {uploadPdfPercentage !== 100 ? (
                            <div className='body-tab-3-upload'>
                                <div className='fa fa-file-o fa-3x img' />
                                {uploadingPdfStatus === 1 ? (
                                    <MyDropzone className='dropzone' setFiles={this.setFiles} />
                                ) : uploadingPdfStatus === 2 ? (
                                    <p className='upload-btn' onClick={() => this.onConfirmUpload('pdf')}>
                                        Confirm Upload
                                    </p>
                                ) : (
                                    <p className='upload-btn filled'>Uploading {uploadPdfPercentage}%</p>
                                )}
                            </div>
                        ) : (
                            <PDFRenderer pdfFile={pdfFile} />
                        )}
                    </div>
                    <p className='footer' style={{ display: tab === 3 ? 'none' : 'flex' }}>
                        By submitting your file to CT-Total you are asking CT-Total to share your submission with
                        the security community and agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        );
    }
}

export default withRouter(Upload);
