import React from 'react';
import { connect } from 'react-redux';

import DoctorsList from './list';
import NavBar from 'components/navBar';

import './index.scss';

class DoctorsPage extends React.Component {
    constructor(props) {
        super(props);
        console.log('Doctors Page');
    }

    render() {
        const { history, doctorsList } = this.props;
        return (
            <div id='page-doctors'>
                <NavBar />
                <div id='page-doctors-body' className={`app-body ${doctorsList && doctorsList.length ? '' : 'placeholder-body'}`}>
                    <DoctorsList history={history} doctorsList={doctorsList} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ doctors: { doctorsList } }) => ({ doctorsList });

export default connect(mapStateToProps)(DoctorsPage);
