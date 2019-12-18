import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './index.scss';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        console.log('Doctors Page');
    }

    render() {
        const {
            location: { pathname }
        } = this.props;
        return (
            <header>
                <nav className='title'>
                    <Link to='/'>Ct Total</Link>
                </nav>
                <nav className='breadcrumb'>
                    <Link className={pathname === '/analysis' ? 'selected' : ''} to='/analysis'>
                        Analysis
                    </Link>
                    <Link className={pathname === '/doctors' ? 'selected' : ''} to='/doctors'>
                        Second Opinion
                    </Link>
                </nav>
            </header>
        );
    }
}

export default withRouter(NavBar);
