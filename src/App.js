import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import Home from './components/home';
import Analysis from './components/analysis';

import './App.scss';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className='App'>
                    <Route path='/' exact component={Home} />
                    <Route path='/analysis' exact component={Analysis} />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
