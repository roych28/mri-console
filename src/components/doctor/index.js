import React from 'react';
import { connect } from 'react-redux';

import NavBar from 'components/navBar';

import './index.scss';

class DoctorDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        console.log('Doctor Details Page');
    }

    render() {
        const {
            name,
            academicRanking,
            division,
            specialtyAreas,
            medicalDegree,
            clinicalInterests,
            location,
            image,
            phone,
            fax,
            email
        } = this.props;
        console.log(name, academicRanking);
        return (
            <div id='page-doctor'>
                <NavBar />
                <div id='page-doctor-body' className='app-body'>
                    <div id='block-body' className='page-block'>
                        <div className='page-block-content'>
                            <div className='column content'>
                                <div className='header'>
                                    <div className='title-wrapper'>
                                        <div className='title'>{name}</div>
                                        <div className='vendor'>{academicRanking}</div>
                                    </div>
                                </div>
                                <div className='block clinical-interests'>
                                    <h1>Clinical Interests</h1>
                                    <ul>
                                        {clinicalInterests.map(interest => (
                                            <li className='interest'>&#9642; {interest}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='block education'>
                                    <h1>Education And Training:</h1>
                                    <ul>
                                        <li className='training'>&#9642; Medical School: {medicalDegree}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='column subcontent'>
                                <div className='doctor-img'>
                                    <img src={image} alt='doctor' />
                                </div>
                                <div className='block contact'>
                                    <label className='title'>Contact</label>
                                    <div className='fields'>
                                        <label className='field'>Phone: {phone}</label>
                                        <label className='field'>Fax: {fax}</label>
                                        <label className='field'>E-mail: {email}</label>
                                        <label className='field'>Office: {location}, 12th floor</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (
    { doctors: { doctorsList } },
    {
        match: {
            params: { id: paramDoctorId }
        }
    }
) => {
    console.log(paramDoctorId);
    console.log(doctorsList);
    const doctor = doctorsList.find(doctor => doctor.id === parseInt(paramDoctorId));
    const {
        name,
        academicRanking,
        division,
        specialtyAreas,
        medicalDegree,
        clinicalInterests,
        location,
        image,
        phone,
        fax,
        email
    } = doctor;
    return {
        name,
        academicRanking,
        division,
        specialtyAreas,
        medicalDegree,
        clinicalInterests,
        location,
        image,
        phone,
        fax,
        email
    };
};

export default connect(mapStateToProps)(DoctorDetailsPage);
