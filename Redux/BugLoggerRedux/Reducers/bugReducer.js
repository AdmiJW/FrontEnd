import ActionType from '../Actions/actionTypes';
import rootReducer from './rootReducer';


const initialState = [];
let nextId = 0;

function createNewBugObject(title, description) {
    return {
        id: nextId++,
        title: title,
        desc: description,
        resolved: false
    };
}

const bugReducer = (state = initialState, action) => {
    const payload = action.payload;

    switch (action.type) {
        case ActionType.ADD_BUG:
            return [...state, createNewBugObject(payload.title, payload.desc) ];

        case ActionType.REMOVE_BUG:
            return state.filter(e => e.id !== payload.id);

        case ActionType.RESOLVE_BUG:
            return state.map(e => {
                if (e.id == payload.id)
                    e.resolved = true;
                return e;
            });

        default: return state;
    }

}

export default bugReducer;