import React from 'react';

import DoctorsList from './list';
import NavBar from 'components/navBar';

import './index.scss';

class DoctorsPage extends React.Component {
    constructor(props) {
        super(props);
        console.log('Doctors Page');
    }

    render() {
        return (
            <div id='page-doctors'>
                <NavBar />
                <div id='page-doctors-body' className='app-body'>
                    <DoctorsList />
                </div>
            </div>
        );
    }
}

export default DoctorsPage;
