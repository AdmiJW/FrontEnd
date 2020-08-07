import ActionType from './ActionType';
import store from '../Store/store';

import EditorAction from './EditorAction';

let delay = store.getState().transitionTimer;

const viewerAction = {

    //=========OPENING AND CLOSING============//
    closingViewer: () => (dispatch) => {
        dispatch({ type: ActionType.VIEWER_CLOSING } );
        setTimeout(() => {
            dispatch( viewerAction.closedViewer() );
        }, delay );
    },
    closedViewer: () => {
        return { type: ActionType.VIEWER_CLOSED };
    },
    openingViewer: () => (dispatch) => {
        dispatch({ type: ActionType.VIEWER_OPENING });
        setTimeout(() => {
            dispatch( viewerAction.openedViewer() );
        }, delay);
    },
    openedViewer: () => {
        return { type: ActionType.VIEWER_OPENED };
    },

    //=========MAXIMIZING AND MINIMIZING============//
    maxingViewer: () => (dispatch) => {
        dispatch( EditorAction.closingEditor() );
        setTimeout(() => {
            dispatch({ type: ActionType.VIEWER_MAXIMIZING } );
            setTimeout(() => {
                dispatch( viewerAction.maxedViewer() );
            }, delay);
        }, delay);
    },
    maxedViewer: () => {
        return { type: ActionType.VIEWER_MAXED };
    },
    miningViewer: () => (dispatch) => {
        dispatch({ type: ActionType.VIEWER_MINIMIZING } );
        setTimeout(() => {
            dispatch( EditorAction.openingEditor() );
            setTimeout(() => {
                dispatch( viewerAction.minedViewer() );
            }, delay);
        }, delay);
    },
    minedViewer: () => {
        return { type: ActionType.VIEWER_MINED };
    }
}

export default viewerAction;