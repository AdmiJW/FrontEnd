import ActionType from '../Actions/ActionType';


const initialState = {
    editorText: '',

    isEditorApplyClass: false,
    isEditorApplyMaxClass: false,
    isEditorClosed: false,
    isEditorMaxed: false,

    isViewerApplyClass: !(window.innerWidth >= 800),
    isViewerApplyMaxClass: false,
    isViewerClosed: !(window.innerWidth >= 800),
    isViewerMaxed: false,

    transitioning: false,
    transitionTimer: 1000
}

function winReducer(state = initialState, action) {
    switch (action.type) {
        case ActionType.EDITOR_CLOSING:
            return {...state, isEditorApplyClass: true, transitioning: true };
        case ActionType.EDITOR_CLOSED:
            return {...state, isEditorClosed: true, transitioning: false};
        case ActionType.EDITOR_OPENING:
            return {...state, isEditorApplyClass: false, isEditorClosed: false, transitioning: true}
        case ActionType.EDITOR_OPENED:
            return {...state, transitioning: false };

        case ActionType.EDITOR_MAXIMIZING:
            return {...state, isEditorApplyMaxClass: true, transitioning: true };
        case ActionType.EDITOR_MAXED:
            return {...state, isEditorMaxed: true, transitioning: false};
        case ActionType.EDITOR_MINIMIZING:
            return {...state, isEditorApplyMaxClass: false, transitioning: true };
        case ActionType.EDITOR_MINED:
            return {...state, isEditorMaxed: false, transitioning: false};

        case ActionType.EDITOR_TEXT_CHANGED:
            return {...state, editorText: action.payload.text };

        //==============================================================//
        case ActionType.VIEWER_CLOSING:
            return {...state, isViewerApplyClass: true, transitioning: true };
        case ActionType.VIEWER_CLOSED:
            return {...state, isViewerClosed: true, transitioning: false };
        case ActionType.VIEWER_OPENING:
            return {...state, isViewerApplyClass: false, isViewerClosed: false, transitioning: true };
        case ActionType.VIEWER_OPENED:
            return {...state, transitioning: false };

        case ActionType.VIEWER_MAXIMIZING:
            return {...state, isViewerApplyMaxClass: true, transitioning: true };
        case ActionType.VIEWER_MAXED:
            return {...state, isViewerMaxed: true, transitioning: false};
        case ActionType.VIEWER_MINIMIZING:
            return {...state, isViewerApplyMaxClass: false, transitioning: true };
        case ActionType.VIEWER_MINED:
            return {...state, isViewerMaxed: false, transitioning: false};

        default: return state;
    }
}

export default winReducer;