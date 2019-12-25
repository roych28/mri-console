import React, { Component } from 'react';

import Upload from '../upload';
import './index.scss';

class Home extends Component {
    render() {
        return (
            <div className='home'>
                <div className='title-container'>
                    <div className='title-with-img'>
                        <div className='fa fa-user-md fa-4x img'></div>
                        <div className='title'>CTTOTAL</div>
                    </div>
                    <div className='description'>Analyze CT files to detect types of injuries &amp; diseases</div>
                </div>
                <div className='card'>
                    <Upload />
                </div>
            </div>
        );
    }
}

export default Home;
