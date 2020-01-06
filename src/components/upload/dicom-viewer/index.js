import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Slide from '@material-ui/core/Slide';

import './index.scss';
import dwv from 'dwv';

// gui overrides

// decode query
dwv.utils.decodeQuery = dwv.utils.base.decodeQuery;
// progress
dwv.gui.displayProgress = function(prog) {
    console.log('Progress', prog);
};
// get element
dwv.gui.getElement = dwv.gui.base.getElement;
// refresh element
dwv.gui.refreshElement = dwv.gui.base.refreshElement;

// Image decoders (for web workers)
dwv.image.decoderScripts = {
    jpeg2000: 'assets/dwv/decoders/pdfjs/decode-jpeg2000.js',
    'jpeg-lossless': 'assets/dwv/decoders/rii-mango/decode-jpegloss.js',
    'jpeg-baseline': 'assets/dwv/decoders/pdfjs/decode-jpegbaseline.js',
    rle: 'assets/dwv/decoders/dwv/decode-rle.js'
};

const styles = theme => ({
    button: {
        margin: theme.spacing(1)
    },
    appBar: {
        position: 'relative'
    },
    title: {
        flex: '0 0 auto'
    },
    tagsDialog: {
        minHeight: '90vh',
        maxHeight: '90vh',
        minWidth: '90vw',
        maxWidth: '90vw'
    },
    iconSmall: {
        fontSize: 20
    }
});

const TransitionUp = React.forwardRef((props, ref) => <Slide direction='up' {...props} />);

class DwvComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            versions: {
                dwv: dwv.getVersion(),
                react: React.version
            },
            tools: ['Scroll', 'WindowLevel', 'ZoomAndPan', 'Draw'],
            selectedTool: 'Select Tool',
            loadProgress: 0,
            dataLoaded: false,
            dwvApp: null,
            tags: [],
            showDicomTags: false,
            toolMenuAnchorEl: null
        };
    }

    render() {
        const { classes, onDicomLoad } = this.props;
        const { versions, tools, loadProgress, dataLoaded, tags, toolMenuAnchorEl } = this.state;

        const toolsMenuItems = tools.map(tool => (
            <MenuItem onClick={this.handleMenuItemClick.bind(this, tool)} key={tool} value={tool}>
                {tool}
            </MenuItem>
        ));

        return (
            <div id='dwv'>
                {/*<div className='button-row'>
                    <Button
                        variant='contained'
                        color='primary'
                        aria-owns={toolMenuAnchorEl ? 'simple-menu' : null}
                        aria-haspopup='true'
                        onClick={this.handleMenuButtonClick}
                        disabled={!dataLoaded}
                        className={classes.button}
                        size='medium'
                    >
                        {this.state.selectedTool}
                        <ArrowDownIcon className={classes.iconSmall} />
                    </Button>
                    <Menu
                        id='simple-menu'
                        anchorEl={toolMenuAnchorEl}
                        open={Boolean(toolMenuAnchorEl)}
                        onClose={this.handleMenuClose}
                    >
                        {toolsMenuItems}
                    </Menu>
                    <Button variant='contained' color='primary' disabled={!dataLoaded} onClick={this.onReset}>
                        Reset
                    </Button>

                    <Button
                        variant='contained'
                        color='primary'
                        onClick={this.handleTagsDialogOpen}
                        disabled={!dataLoaded}
                        className={classes.button}
                        size='medium'
                    >
                        Tags
                    </Button>
                    <Dialog
                        open={this.state.showDicomTags}
                        onClose={this.handleTagsDialogClose}
                        TransitionComponent={TransitionUp}
                        classes={{ paper: classes.tagsDialog }}
                    >
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton
                                    color='inherit'
                                    onClick={this.handleTagsDialogClose}
                                    aria-label='Close'
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant='h6' color='inherit' className={classes.flex}>
                                    DICOM Tags
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <TagsTable data={tags} />
                    </Dialog>
                </div>*/}
                <div className='layerContainer'>
                    <div className='dropBox'>
                        <Typography>Drag files here.</Typography>
                    </div>
                    <canvas className='imageLayer' style={{ display: dataLoaded ? '' : 'none' }}>
                        Only for HTML5 compatible browsers...
                    </canvas>
                    <div className='drawDiv'></div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        // create app
        var app = new dwv.App();
        // initialise app
        app.init({
            containerDivId: 'dwv',
            tools: this.state.tools,
            shapes: ['Ruler'],
            isMobile: false
        });
        // progress
        const self = this;
        app.addEventListener('load-progress', function(event) {
            console.log(event);
            self.setState({ loadProgress: event.loaded });
        });
        app.addEventListener('load-end', function(event) {
            // set data loaded flag
            self.setState({ dataLoaded: true });
            // set dicom tags
            self.setState({ tags: app.getTags() });
            // set the selected tool

            // if (app.isMonoSliceData() && app.getImage().getNumberOfFrames() === 1) {
            //     self.setState({ selectedTool: 'ZoomAndPan' });
            // } else {
            self.setState({ selectedTool: 'Scroll' });
            // }
            self.props.onDicomLoad();
            const uploadBoxElement = document.querySelector('.body-tab-2');
            uploadBoxElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
        });
        console.log(app);
        // store
        this.setState({ dwvApp: app });
    }

    onChangeTool = tool => {
        if (this.state.dwvApp) {
            this.setState({ selectedTool: tool });
            this.state.dwvApp.onChangeTool({ currentTarget: { value: tool } });
        }
    };

    onReset = tool => {
        if (this.state.dwvApp) {
            this.state.dwvApp.onDisplayReset();
        }
    };

    handleTagsDialogOpen = () => {
        this.setState({ showDicomTags: true });
    };

    handleTagsDialogClose = () => {
        this.setState({ showDicomTags: false });
    };

    handleMenuButtonClick = event => {
        this.setState({ toolMenuAnchorEl: event.currentTarget });
    };

    handleMenuClose = event => {
        this.setState({ toolMenuAnchorEl: null });
    };

    handleMenuItemClick = tool => {
        this.setState({ toolMenuAnchorEl: null });
        this.onChangeTool(tool);
    };
}

DwvComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DwvComponent);
