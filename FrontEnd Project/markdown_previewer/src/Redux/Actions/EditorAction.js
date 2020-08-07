import ActionType from './ActionType';
import store from '../Store/store';

import ViewerAction from './ViewerAction';

let delay = store.getState().transitionTimer;

const editorAction = {
    
    //=========OPENING AND CLOSING============//
    closingEditor: () => (dispatch) => {
        dispatch({ type: ActionType.EDITOR_CLOSING } );
        setTimeout(() => {
            dispatch( editorAction.closedEditor() );
        }, delay );
    },
    closedEditor: () => {
        return { type: ActionType.EDITOR_CLOSED }
    },
    openingEditor: () => (dispatch) => {
        dispatch({ type: ActionType.EDITOR_OPENING });
        setTimeout(() => {
            dispatch( editorAction.openedEditor() );
        }, delay);
    },
    openedEditor: () => {
        return { type: ActionType.EDITOR_OPENED };
    },

    //=========MAXIMIZING AND MINIMIZING============//
    maxingEditor: () => (dispatch) => {
        dispatch( ViewerAction.closingViewer() );
        setTimeout(() => {
            dispatch({ type: ActionType.EDITOR_MAXIMIZING } );
            setTimeout(() => {
                dispatch( editorAction.maxedEditor() );
            }, delay);
        }, delay);
    },
    maxedEditor: () => {
        return { type: ActionType.EDITOR_MAXED };
    },
    miningEditor: () => (dispatch) => {
        dispatch({ type: ActionType.EDITOR_MINIMIZING } );
        setTimeout(() => {
            dispatch( ViewerAction.openingViewer() );
            setTimeout(() => {
                dispatch( editorAction.minedEditor() );
            }, delay);
        }, delay);
    },
    minedEditor: () => {
        return { type: ActionType.EDITOR_MINED };
    },

    //=========EDITOR TEXT CHANGED============//
    editorTextChange: (text, position) => {
        return { 
            type: ActionType.EDITOR_TEXT_CHANGED, 
            payload: {
                text: text
            } 
        };
    }

}

export default editorAction;