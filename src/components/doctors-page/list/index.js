import React from 'react';

import imagePlaceholder from '../../../assets/placeholder.svg';
import './index.scss';

const Placeholder = () => (
    <div className='placeholder-wrapper'>
        <div className='placeholder'>
            <div className='placeholder-sprite-wrapper'>
                <img src={imagePlaceholder} alt='placeholder' />
            </div>
            <div className='placeholder-label'>
                <div className='placeholder-gradient' />
                <div className='placeholder-label-1'>There are no second opinions right now</div>
                <div className='placeholder-label-2'>Stay updated</div>
            </div>
        </div>
    </div>
);

class DoctorsItem extends React.Component {
    render() {
        const {
            id,
            name,
            academicRanking,
            division,
            specialtyAreas,
            medicalDegree,
            location,
            image
        } = this.props.doctor;
        const { history } = this.props;
        console.log(image);
        console.log(this.props);
        return (
            <li className='doctor-wrapper'>
                <div className='doctor'>
                    <div className='header'>
                        <div className='logo-container' onClick={() => history.push(`/doctors/${id}`)}>
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
                            <li className='specialty' key={specialtyAreas.indexOf(specialty) + 1}>
                                &#9642; {specialty}
                            </li>
                        ))}
                    </ul>
                </div>
            </li>
        );
    }
}

class DoctorsList extends React.Component {
    render() {
        const { doctorsList, history } = this.props;
        console.log(this.props);
        return doctorsList && doctorsList.length ? (
            <div id='doctors-list'>
                <ul>
                    {doctorsList.map(doctor => {
                        return <DoctorsItem key={doctor.id} doctor={doctor} history={history} />;
                    })}
                </ul>
            </div>
        ) : (
            <div id='doctors-list'>
                <Placeholder />
            </div>
        );
    }
}

export default DoctorsList;
