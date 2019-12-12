import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';

class Analysis extends Component {
    constructor(props) {
        super(props);

        this.state = {
            threats: 0,
            totalAmmount: this.props.applications.length,
            // scanned: 0,
            scanning: true,
            firstAppsArr: [],
            secondAppsArr: []
        };

        // this.scanThreats = this.scanThreats.bind(this);
        this.randomizeIsDetected = this.randomizeIsDetected.bind(this);
        this.loadApps = this.loadApps.bind(this);
        this.getAppClassNameAndLabel = this.getAppClassNameAndLabel.bind(this);
    }

    componentDidMount() {
        console.log('Analysis DidMount, Applications:', this.props.applications);
        // this.scanThreats();
        this.props.applications.sort((a, b) => a.applicationName.localeCompare(b.applicationName));
        this.props.applications.forEach(app => this.randomizeIsDetected(app));
        this.loadApps();
    }

    loadApps() {
        let counter = 0;
        const { applications } = this.props;
        const interval = setInterval(() => {
            if (counter < applications.length / 2) {
                this.setState({ firstAppsArr: [...this.state.firstAppsArr, applications[counter]] });
            } else if (counter < applications.length) {
                this.setState({ secondAppsArr: [...this.state.secondAppsArr, applications[counter]] });
            } else {
                clearInterval(interval);
                this.setState({ scanning: false });
            }
            counter++;
        }, 800);
        // interval();

        // const firstAppsArr = this.props.applications.slice(0, this.props.applications.length / 2 + 1);
        // const secondAppsArr = this.props.applications.slice(
        //     this.props.applications.length / 2 + 1,
        //     this.props.applications.length
        // );
    }

    // scanThreats() {
    //     const { totalAmmount } = this.state;

    //     const interval = setInterval(() => {
    //         const { scanned } = this.state;
    //         this.setState({ scanned: scanned + 1 });
    //         if (scanned === totalAmmount) {
    //             this.setState({ scanning: false });
    //             clearInterval(interval);
    //         }
    //     }, 1500);
    // }

    randomizeIsDetected(app) {
        app.detected = Math.random() * 100 < 90 ? false : true;
        return app.detected;
    }

    getAppClassNameAndLabel(app, type) {
        const { applications } = this.props;
        const { firstAppsArr } = this.state;
        if (type === 'class') {
            if (
                applications.length % 2 === 1 &&
                firstAppsArr.indexOf(app) === firstAppsArr.length - 1 &&
                firstAppsArr.indexOf(app) !== Math.floor(applications.length / 2)
            )
                return 'fa fa-hourglass-start';
            else if (
                applications.length % 2 === 0 &&
                firstAppsArr.indexOf(app) === firstAppsArr.length - 1 &&
                firstAppsArr.indexOf(app) !== Math.floor(applications.length / 2 - 1)
            )
                return 'fa fa-hourglass-start';
            else if (!app.detected) return 'fa fa-check-circle-o';
            else return 'fa fa-times-circle-o';
        } else {
            if (
                applications.length % 2 === 1 &&
                firstAppsArr.indexOf(app) === firstAppsArr.length - 1 &&
                firstAppsArr.indexOf(app) !== Math.floor(applications.length / 2)
            )
                return 'Calculating..';
            else if (
                applications.length % 2 === 0 &&
                firstAppsArr.indexOf(app) === firstAppsArr.length - 1 &&
                firstAppsArr.indexOf(app) !== Math.floor(applications.length / 2 - 1)
            )
                return 'Calculating..';
            else if (!app.detected) return 'Undetected';
            else return 'Detected';
        }
    }

    render() {
        const { threats, totalAmmount, scanning, firstAppsArr, secondAppsArr } = this.state;
        const { applications } = this.props;
        console.log(applications.length / 2);
        return (
            <div className='analysis-body'>
                <div className='top-container'>
                    <div className='spinner-container'>
                        <div
                            className={`fa ${
                                scanning ? 'fa-spin fa-circle-o-notch' : 'fa-circle-o'
                            } fa-fw spin-img`}
                        ></div>
                        <label className='threats'>{threats}</label>
                        <label className='total'>/ {totalAmmount}</label>
                        <div className='score-container'>
                            <div className='fa fa-question-circle grey-img' />
                            <div className='lines'>
                                <div className='line red'></div>
                                <div className='line green'></div>
                            </div>
                            <div className='under-the-line'>
                                <i className='fa fa-times-circle grey-img' />
                                <label className='community-scr'>
                                    Community <br />
                                    Score
                                </label>
                                <i className='fa fa-check-circle grey-img' />
                            </div>
                        </div>
                        <div className='description'></div>
                    </div>
                    <div className='file-desc-box'>
                        <div className='desc-header'>
                            <li className='fa fa-check-circle-o' />
                            <label>No engines detected this file</label>
                        </div>
                        <div className='desc-body'>
                            <div className='names'>
                                <label>9dce7acd0d1ce10d8f375d3d19b443196cde674d9debe1150f3a58703937f1d5</label>
                                <label>Screen Shot 2019-11-26 at 12.51.12.zip</label>
                                <label className='circled'>zip</label>
                            </div>
                            <div className='column size'>
                                <label>120.07 KB</label>
                                <label className='weak'>Size</label>
                            </div>
                            <div className='column date-uploaded'>
                                <label>2019-12-09 11:59:09 UTC</label>
                                <label className='weak'>a moment ago</label>
                            </div>
                            <div className='column file-type'>
                                <div className='fa fa-file-archive-o' />
                                <label>ZIP</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='apps-list'>
                    <div className='apps-list-header'>
                        <div className='tab active'>Detection</div>
                    </div>
                    {applications.length > 10 ? (
                        <div className='table-container'>
                            <div className='table-body'>
                                {firstAppsArr.map(app => {
                                    return (
                                        <div key={app.id} className='table-row not-bordered-right'>
                                            <p>{app.applicationName}</p>
                                            <li className={this.getAppClassNameAndLabel(app, 'class')}></li>
                                            <label style={{ paddingLeft: '8px' }}>
                                                {this.getAppClassNameAndLabel(app, 'label')}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className='table-body'>
                                {secondAppsArr.map(app => {
                                    return (
                                        <div key={app.id} className='table-row not-bordered-left'>
                                            <p>{app.applicationName}</p>
                                            <li
                                                className={`${
                                                    secondAppsArr.indexOf(app) === secondAppsArr.length - 1 &&
                                                    applications.indexOf(app) !== applications.length - 1
                                                        ? 'fa fa-hourglass-start'
                                                        : !app.detected
                                                        ? 'fa fa-check-circle-o'
                                                        : 'fa fa-times-circle-o'
                                                }`}
                                            ></li>
                                            <label style={{ paddingLeft: '8px' }}>
                                                {secondAppsArr.indexOf(app) === secondAppsArr.length - 1 &&
                                                applications.indexOf(app) !== applications.length - 1
                                                    ? 'Calculating..'
                                                    : app.detected === false
                                                    ? 'Undetected'
                                                    : 'Detected'}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className='table-container'>
                            <div className='table-body'>
                                {applications.map(app => {
                                    return (
                                        <div key={app.id} className='table-row'>
                                            <p>{app.applicationName}</p>
                                            <li
                                                className={`${
                                                    !app.detected ? 'fa fa-check-circle-o' : 'fa fa-times-circle-o'
                                                }`}
                                            ></li>
                                            <label style={{ paddingLeft: '8px' }}>
                                                {app.detected === false ? 'Undetected' : 'Detected'}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ products: { applications } }) => ({
    applications
});

export default connect(mapStateToProps)(Analysis);
