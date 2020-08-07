import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import sounds from './sound';

import EditorAction from '../Redux/Actions/EditorAction'
import EditorToolBar from './EditorToolbar';

/*
    Editor Window
    This is the window where the user will input markdown text, and being parsed to the previewer
    The editor also contains a toolbar to insert markdown easily
*/

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.getClass = this.getClass.bind(this);
        this.getIconClass = this.getIconClass.bind(this);
        this.closeEditor = this.closeEditor.bind(this);
        this.maxOrMinimize = this.maxOrMinimize.bind(this);
        this.editorTextChange = this.editorTextChange.bind(this);
        this.insertAtCaret = this.insertAtCaret.bind(this);
    }

    //  Adding Event Listeners to buttons.
    componentDidMount() {
        document.getElementById('editor-close-btn').addEventListener('click', this.closeEditor );
        document.getElementById('editor-maxmin-btn').addEventListener('click', this.maxOrMinimize );

        //  When the window is resized to wide screen, determine if editor should be forced to open
        //  based on if previewer is maximized and editor is closed or not
        window.addEventListener('resize', ()=> {
            if (window.innerWidth >= 800 && !this.props.isViewerMaxed && this.props.isEditorClosed ) {
                this.props.openingEditor();
            }
        });

        //  Fetch the default text from online source (My cheat sheet)
        fetch('https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/markdown.md')
        .then(file => file.text() )
        .then(text => this.props.editorTextChange(text)); 
    }

    //  Apply appropriate class names based on the state (Transitioning, or closed)
    getClass() {
        const { isEditorApplyClass, isEditorClosed, isEditorApplyMaxClass, isEditorMaxed } = this.props;
        let cls = 'editor';
        if ( isEditorApplyClass ) cls += ' scale0';
        if ( isEditorClosed ) cls += ' closed';
        if ( isEditorApplyMaxClass ) cls += ' maxClass';
        if ( isEditorMaxed ) cls += ' maxed';

        return cls;
    }

    //  Apply class names to the Maximize or minimize button. Changes when maximized or minimized
    getIconClass() {
        let cls = 'fas editor-maxmin-btn'
        if (this.props.isEditorMaxed) cls += ' fa-compress-arrows-alt';
        else cls += ' fa-expand-arrows-alt';
        return cls
    }

    //  Close button is clicked, so apply closing transition, then close it
    closeEditor() {
        const { closingEditor } = this.props;
        sounds.playBeep();
        closingEditor();
    }

    //  Max or min button is clicked, so apply maximizing transition, then change the button type
    maxOrMinimize() {
        const { isEditorMaxed, maxingEditor, miningEditor, transitioning } = this.props;
        if (transitioning) return;

        sounds.playBeep();
        if (isEditorMaxed ) {
            miningEditor();
        }
        else maxingEditor();
    }

    //  Called when the text in editor is changed (by user or triggered by code). Dispatch action
    editorTextChange(e) {
        this.props.editorTextChange( document.getElementById('editor').value );
    }

    //  Appends some text into the cursor in text area (Triggered by toolbar click)
    insertAtCaret(e, toIns='') {
        let textarea = document.getElementById('editor');
        const posStart = textarea.selectionStart;
        const posEnd = textarea.selectionEnd;
        const text = textarea.value;
    
        textarea.focus();
        //If the previous same length substring is the same as the text to insert, then remove it
        if ( text.substring( posEnd - toIns.length , posEnd) === toIns ) {
            textarea.value = text.substring(0, posEnd - toIns.length) + text.substring(posEnd);
            textarea.setSelectionRange(posStart, posStart);
        }
        //Else insert the string
        else {
            
            textarea.value = `${text.substring(0, posEnd)}${toIns}${text.substring(posEnd)}`;
            
            textarea.setSelectionRange(posEnd, posEnd + toIns.length );
        }
        //Trigger the redux action dispatch
        this.editorTextChange();
    }

    render() {
        ////////////////JSX///////////////////
        return (
        <div className={ this.getClass() } >
        <header className='win-header'>
            <i className="fas fa-scroll win-header-logo"></i>
            EDITOR
            <i tabIndex='1' className="fas fa-times editor-btn" id='editor-close-btn'></i>
            <i tabIndex='1' className={this.getIconClass() } id='editor-maxmin-btn'></i>
        </header>
        <EditorToolBar toolClick={ this.insertAtCaret } />
        <textarea className='text-area closeOpenTrans' id='editor' onChange={this.editorTextChange}
             value={this.props.editorText}></textarea>
        </div>
        );
        /////////////////JSX//////////////////
    }

}


Editor.propTypes = {
    isEditorApplyClass: PropTypes.bool.isRequired,
    isEditorApplyMaxClass: PropTypes.bool.isRequired,
    isEditorClosed: PropTypes.bool.isRequired,
    isEditorMaxed: PropTypes.bool.isRequired,

    isViewerMaxed: PropTypes.bool.isRequired,

    editorText: PropTypes.string.isRequired,

    transitionTimer: PropTypes.number.isRequired,
    transitioning: PropTypes.bool.isRequired,

    openingEditor: PropTypes.func.isRequired,
    closingEditor: PropTypes.func.isRequired,
    maxingEditor: PropTypes.func.isRequired,
    miningEditor: PropTypes.func.isRequired,

    editorTextChange: PropTypes.func.isRequired
}

function mapStateToProps( store ) {
    return {
        isEditorApplyClass: store.isEditorApplyClass,
        isEditorApplyMaxClass: store.isEditorApplyMaxClass,
        isEditorClosed: store.isEditorClosed,
        isEditorMaxed: store.isEditorMaxed,

        isViewerMaxed: store.isViewerMaxed,

        editorText: store.editorText,

        transitionTimer: store.transitionTimer,
        transitioning: store.transitioning
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        openingEditor: () => dispatch( EditorAction.openingEditor() ),
        closingEditor: () => dispatch( EditorAction.closingEditor() ),
        maxingEditor: () => dispatch( EditorAction.maxingEditor() ),
        miningEditor: () => dispatch( EditorAction.miningEditor() ),

        editorTextChange: (text, position) => dispatch( EditorAction.editorTextChange(text, position) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);