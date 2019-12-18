import React from 'react';

import dummyDoctorsJson from 'dummy/dummyDoctors.json';
import './index.scss';

class DoctorsItem extends React.Component {
    render() {
        const {
            name,
            academicRanking,
            division,
            specialtyAreas,
            medicalDegree,
            location,
            image
        } = this.props.doctor;
        console.log(image);
        // console.log(doctorImg);
        return (
            <li className='doctor-wrapper'>
                <div className='doctor'>
                    <div className='header'>
                        <div className='logo-container'>
                            <div className='logo'>
                                <img src={image} alt='Doctor Logo' />
                            </div>
                        </div>
                        <div className='field name'>{name}</div>
                    </div>
                    <div className='field division'>
                        <label className='field-name'>Academic Ranking:</label> {academicRanking}
                    </div>
                    <div className='field division'>
                        <label className='field-name'>Division:</label> {division}
                    </div>
                    <div className='field medical-degree'>
                        <label className='field-name'>Medical Degree: </label>
                        {medicalDegree}
                    </div>
                    <div className='field location'>
                        <label className='field-name'>Location:</label>
                        {location}
                    </div>
                    <ul className='field specialities'>
                        <label className='field-name'>Specialty Areas:</label>
                        {specialtyAreas.map(specialty => (
                            <li className='specialty'>&#9642; {specialty}</li>
                        ))}
                    </ul>
                </div>
            </li>
        );
    }
}

class DoctorsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            doctorsArray: dummyDoctorsJson
        };
    }

    render() {
        const { doctorsArray } = this.state;
        return (
            <div id='doctors-list'>
                <ul>
                    {doctorsArray.map(doctor => {
                        return <DoctorsItem key={doctor.id} doctor={doctor} />;
                    })}
                </ul>
            </div>
        );
    }
}

export default DoctorsList;
