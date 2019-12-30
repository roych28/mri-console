import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './index.scss';
import NavBar from 'components/navBar';

class PageProduct extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {
            vendor,
            about,
            logo,
            fdaStatus,
            ceStatus,
            srcScreenshots,
            introImg,
            exampleCaseImgs,
            website,
            appDescription,
            featuresAndBenefits,
            exampleCase,
            training,
            applicationName
        } = this.props;
        return (
            <div id='page-product' className='app-body'>
                <NavBar />
                <div id='block-body' className='page-block'>
                    <div className='page-block-content'>
                        <div className='column content'>
                            <div className='header'>
                                <div className='title-wrapper'>
                                    <div className='title'>{applicationName}</div>
                                    <div className='vendor'>{vendor}</div>
                                </div>
                            </div>
                            <div className='block about'>
                                <p dangerouslySetInnerHTML={{ __html: about }} />
                                {introImg && introImg.length && introImg[0] !== '' ? (
                                    <div className='block image'>
                                        <img src={introImg} alt='' />
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className='block'>
                                <h1>Application Description</h1>
                                <p dangerouslySetInnerHTML={{ __html: appDescription }} />
                            </div>
                            <div className='block'>
                                <h1>Features &amp; Benefits</h1>
                                <p dangerouslySetInnerHTML={{ __html: featuresAndBenefits }} />
                            </div>
                            <div className='block'>
                                <h1>Example Case</h1>
                                <p dangerouslySetInnerHTML={{ __html: exampleCase }} />
                                <div className='block image'>
                                    <img src={exampleCaseImgs} alt='' />
                                </div>
                            </div>
                            <div className='block'>
                                <h1>Background on Training, Validation &amp; Publication</h1>
                                <p dangerouslySetInnerHTML={{ __html: training }} />
                            </div>
                        </div>
                        <div className='column subcontent'>
                            <div className='logo'>
                                <img src={logo} alt='logo' />
                            </div>
                            <a className='link' target='_blank' rel='noopener noreferrer' href={website}>
                                {website}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (
    { products: { applications } },
    {
        match: {
            params: { applicationName: paramApplicationName }
        }
    }
) => {
    const product = applications.find(({ applicationName }) => applicationName === paramApplicationName);
    const {
        workflowStage,
        appDescription,
        featuresAndBenefits,
        exampleCase,
        training,
        bodyPart,
        modality,
        pointOfCare,
        id: applicationId,
        vendor,
        rating,
        reviewCount,
        about,
        logo,
        ceStatus,
        fdaStatus,
        screenshots: [srcScreenshots],
        introImg,
        exampleCaseImgs,
        website,
        applicationName
    } = product;
    return {
        vendor,
        rating,
        reviewCount,
        about,
        logo,
        fdaStatus,
        ceStatus,
        srcScreenshots,
        introImg,
        exampleCaseImgs,
        website,
        featuresAndBenefits,
        exampleCase,
        training,
        appDescription,
        applicationName,
        applicationId
    };
};

export default withRouter(connect(mapStateToProps)(PageProduct));
