import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// import { ReactComponent as fileSvg } from '../../theme/icons/icon_file.svg';
import './index.scss';
import MyDropzone from '../utils/dropzone';

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadingStatus: 1,
            uploadPercentage: 70,
            tab: 1,
            files: [],
            txtFile: null,
            reportText: 'No report yet'
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

    onConfirmUpload() {
        this.setState({ uploadingStatus: 3 });
        const interval = setInterval(() => {
            const { uploadPercentage } = this.state;
            this.setState({ uploadPercentage: uploadPercentage + 1 });
            if (uploadPercentage === 99) clearInterval(interval);
        }, 120);
    }

    setFiles(acceptedFiles) {
        const { uploadingStatus } = this.state;
        if (uploadingStatus === 1) {
            // Pending
            this.setState({ uploadingStatus: 2, files: acceptedFiles });
            this.findtxtFile();
            console.log('State files:', this.state.files);
            return; // Set the confirm stage
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
        const { uploadingStatus, uploadPercentage, tab, reportText } = this.state;
        console.log('Tab: ', tab);
        console.log('Report Text:', reportText);
        return (
            <div className='upload-container'>
                <div className='tabs'>
                    <p className={`tab ${tab === 1 ? 'active' : ''}`} onClick={() => this.setState({ tab: 1 })}>
                        FILE
                    </p>
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
                    {tab === 1 ? (
                        <div className='body-tab-1'>
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
                        </div>
                    ) : (
                        <div className='body-tab-2'>
                            <p>{reportText}</p>
                        </div>
                    )}
                    <p className='footer'>
                        By submitting your file to CT-Total you are asking CT-Total to share your submission with
                        the security community and agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        );
    }
}

export default withRouter(Upload);
