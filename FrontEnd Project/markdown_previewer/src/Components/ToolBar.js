import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import sounds from './sound';

import EditorAction from '../Redux/Actions/EditorAction';
import ViewerAction from '../Redux/Actions/ViewerAction';


class ToolBar extends React.Component {
    constructor(props) {
        super(props);

        this.editorBtnClicked = this.editorBtnClicked.bind(this);
        this.vieworBtnClicked = this.vieworBtnClicked.bind(this);
    }

    //  Add Event Listeners
    componentDidMount() {
        document.getElementById('editor-btn').addEventListener('click', this.editorBtnClicked );
        document.getElementById('viewer-btn').addEventListener('click', this.vieworBtnClicked );
    }


    editorBtnClicked() {
        const { isEditorClosed, isViewerClosed, transitioning, 
            transitionTimer, closingEditor,openingEditor, closingViewer} = this.props;

        //  The state shows the app is in the middle of transition. So do nothing
        if (transitioning) return;

        sounds.playBeep();

        //  If the editor is not closed, then just trigger closing editor sequence
        if ( !isEditorClosed ) closingEditor();
        //  Otherwise we should open editor
        else {
            //  If viewer is not closed, we need to close viewer first. This takes some time, then only open editor
            if ( !isViewerClosed ) {
                closingViewer();
                setTimeout(()=> {
                    openingEditor();
                }, transitionTimer);
            }
            //  Else viewer is not open, just open editor
            else {
                openingEditor();
            }
        }
    }


    vieworBtnClicked() {
        const { isEditorClosed, isViewerClosed, transitioning, 
            transitionTimer, closingEditor, closingViewer, openingViewer} = this.props;

        //  The state shows the app is in the middle of transition. So do nothing
        if (transitioning) return;

        sounds.playBeep();

        //  If the viewer is open, then just trigger closing viewer sequence
        if ( !isViewerClosed ) closingViewer();
        //  Else viewer is closed, we need to open it
        else {
            //  If editor is open, then we need to close editor first which take some time, then open viewer
            if ( !isEditorClosed ) {
                closingEditor();
                setTimeout(() => {
                    openingViewer();
                }, transitionTimer);
            }
            //  Else editor is close. Just open viewer
            else {
                openingViewer();
            }
        }
    }

    render() {
        ///////////////JSX/////////////////////
        return (
            <nav className='toolbar'>
                <i className="fas fa-pen fa-3x icon" id='editor-btn'></i>
                <i className="fas fa-eye fa-3x icon" id='viewer-btn'></i>
            </nav>
        );
        ///////////////JSX//////////////////
    }
}

ToolBar.propTypes = {
    isEditorClosed: PropTypes.bool.isRequired,
    isViewerClosed: PropTypes.bool.isRequired,
    transitioning: PropTypes.bool.isRequired,
    transitionTimer: PropTypes.number.isRequired,

    closingEditor: PropTypes.func.isRequired,
    openingEditor: PropTypes.func.isRequired,
    
    closingViewer: PropTypes.func.isRequired,
    openingViewer: PropTypes.func.isRequired
}

function mapStateToProps( store ) {
    return {
        isEditorClosed: store.isEditorClosed,
        isViewerClosed: store.isViewerClosed,
        transitioning: store.transitioning,
        transitionTimer: store.transitionTimer
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        closingEditor: () => dispatch( EditorAction.closingEditor() ),
        openingEditor: () => dispatch( EditorAction.openingEditor() ),
        
        closingViewer: () => dispatch( ViewerAction.closingViewer() ),
        openingViewer: () => dispatch( ViewerAction.openingViewer() ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);