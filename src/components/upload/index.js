import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// import { ReactComponent as fileSvg } from '../../theme/icons/icon_file.svg';
import './index.scss';

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadingStatus: 1,
            uploadPercentage: 70
        };

        this.onClickUpload = this.onClickUpload.bind(this);
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

    onClickUpload() {
        const { uploadingStatus } = this.state;
        if (uploadingStatus === 1) {
            // Pending
            this.setState({ uploadingStatus: 2 });
            return;
        }
        this.setState({ uploadingStatus: 3 });
        const interval = setInterval(() => {
            const { uploadPercentage } = this.state;
            this.setState({ uploadPercentage: uploadPercentage + 1 });
            if (uploadPercentage === 99) clearInterval(interval);
        }, 120);
    }

    render() {
        const { uploadingStatus, uploadPercentage } = this.state;

        return (
            <div className='upload-container'>
                <div className='tabs'>
                    <p className='tab active'>FILE</p>
                    <p className='tab'>URL</p>
                    <p className='tab'>SEARCH</p>
                </div>
                <div className='fa fa-file-o fa-3x img' />
                <p className={`upload-btn ${uploadingStatus !== 3 ? '' : 'filled'}`} onClick={this.onClickUpload}>
                    {uploadingStatus === 1
                        ? 'Choose File'
                        : uploadingStatus === 2
                        ? 'Confirm Upload'
                        : `Uploading ${uploadPercentage}%`}
                </p>
                <p className='footer'>
                    By submitting your file to CT-Total you are asking CT-Total to share your submission with the
                    security community and agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        );
    }
}

export default withRouter(Upload);
