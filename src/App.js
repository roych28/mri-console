import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import Home from './components/home';
import Analysis from './components/analysis';
import DoctorsPage from './components/doctors-page';
import DoctorDetailsPage from './components/doctor';

import './App.scss';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className='app-router'>
                    <Route path='/' exact component={Home} />
                    <Route path='/analysis' exact component={Analysis} />
                    <Route path='/doctors' exact component={DoctorsPage} />
                    <Route path='/doctors/:id' exact component={DoctorDetailsPage} />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
