import React, { Component } from 'react';

import Upload from '../upload';
import './index.scss';
import MyDropzone from '../utils/dropzone';

class Home extends Component {
    render() {
        return (
            <div className='home'>
                <div className='title-container'>
                    <div className='title-with-img'>
                        <div className='fa fa-user-md fa-4x img'></div>
                        <div className='title'>CTTOTAL</div>
                    </div>
                    <div className='description'>
                        Analyze files to detect types of injuries &amp; diseases,
                        <br />
                        automatically share them with the security community
                    </div>
                </div>
                <div className='card'>
                    <Upload />
                </div>
            </div>
        );
    }
}

export default Home;
