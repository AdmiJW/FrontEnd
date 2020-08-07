import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import marked from 'marked';
import sounds from './sound';

import ViewerAction from '../Redux/Actions/ViewerAction';


class Viewer extends React.Component {
    constructor(props) {
        super(props);

        this.getClass = this.getClass.bind(this);
        this.getIconClass = this.getIconClass.bind(this);
        this.closeViewer = this.closeViewer.bind(this);
        this.maxOrMinimize = this.maxOrMinimize.bind(this);
    }

    //  Adding Event listeners
    componentDidMount() {
        document.getElementById('viewer-close-btn').addEventListener('click', this.closeViewer );
        document.getElementById('viewer-maxmin-btn').addEventListener('click', this.maxOrMinimize);

        //  If the window resizes to wide screen, determine if the viewer has to be opened
        //  Based on if the editor is maximized or not, and if the viewer is open or not
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 800 && !this.props.isEditorMaxed && this.props.isViewerClosed ) {
                this.props.openingViewer();
            }
        });
    }

    //  Apply appropriate class names to the viewer component
    getClass() {
        const { isViewerApplyClass, isViewerClosed, isViewerApplyMaxClass, isViewerMaxed } = this.props;
        let cls = 'viewer';
        if ( isViewerApplyClass ) cls += ' scale0';
        if ( isViewerApplyMaxClass ) cls += ' maxClass';
        if ( isViewerClosed ) cls += ' closed';
        if ( isViewerMaxed ) cls += ' maxed';

        return cls;
    }

    //  Apply appropriate class names to the maximize-minimize button. So it will show the correct icon for max min
    getIconClass() {
        let cls = 'fas viewer-maxmin-btn'
        if (this.props.isViewerMaxed) cls += ' fa-compress-arrows-alt';
        else cls += ' fa-expand-arrows-alt';
        return cls;
    }

    //  Triggered when the close button is clicked
    closeViewer() {
        const { closingViewer } = this.props;
        sounds.playBeep();
        closingViewer();
    }

    //  Max or min button is clicked, so apply maximizing transition, then change the button type
    maxOrMinimize() {
        const { isViewerMaxed, maxingViewer, miningViewer, transitioning } = this.props;
        if (transitioning) return;

        sounds.playBeep();
        if (isViewerMaxed ) {
            miningViewer();
        }
        else maxingViewer();
    }

    render () {
        //////////////JSX/////////////////
        return (
        <div className={ this.getClass() } id='viewer'>
            <header className='win-header'>
                <i className="fas fa-scroll win-header-logo"></i>
                PREVIEWER
                <i tabIndex='1' className="fas fa-times viewer-btn" id='viewer-close-btn'></i>
                <i tabIndex='1' className={this.getIconClass() } id='viewer-maxmin-btn'></i>
            </header>
            <div className='view-div closeOpenTrans' id='preview' 
            dangerouslySetInnerHTML={ {__html: marked( this.props.editorText.replace(/\n\n/g, "\n\n<br>\n\n"), { breaks: true } ) } }>
            </div>
        </div>
        );
        ///////////////JSX///////////////
    }
}


Viewer.propTypes = {
    isViewerApplyClass: PropTypes.bool.isRequired,
    isViewerApplyMaxClass: PropTypes.bool.isRequired,
    isViewerClosed: PropTypes.bool.isRequired,
    isViewerMaxed: PropTypes.bool.isRequired,

    editorText: PropTypes.string.isRequired,

    isEditorMaxed: PropTypes.bool.isRequired,

    transitionTimer: PropTypes.number.isRequired,

    openingViewer: PropTypes.func.isRequired,
    closingViewer: PropTypes.func.isRequired,
    maxingViewer: PropTypes.func.isRequired,
    miningViewer: PropTypes.func.isRequired
}

function mapStateToProps( store ) {
    return {
        isViewerApplyClass: store.isViewerApplyClass,
        isViewerApplyMaxClass: store.isViewerApplyMaxClass,
        isViewerClosed: store.isViewerClosed,
        isViewerMaxed: store.isViewerMaxed,

        editorText: store.editorText,

        isEditorMaxed: store.isEditorMaxed,

        transitionTimer: store.transitionTimer
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        openingViewer: () => dispatch( ViewerAction.openingViewer() ),
        closingViewer: () => dispatch( ViewerAction.closingViewer() ),
        maxingViewer: () => dispatch( ViewerAction.maxingViewer() ),
        miningViewer: () => dispatch( ViewerAction.miningViewer() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
