import ActionType from '../Actions/actionType';

const initialState = {
    postArray: [],
    newPost: {},
    loading: false
}

let nextId = 0;

function createPost(post) {
    return {
        userId: 1,
        id: nextId,
        title: post.title,
        body: post.desc 
    };
}

const postReducer = (state = initialState, action) => {
    switch(action.type) {
        
        case ActionType.FETCH_POST:
            return {...state, postArray: action.payload};
        case ActionType.ADD_POST:
            const post = createPost(action.payload);
            return Object.assign( {}, state, { postArray: [...state.postArray, post] } );
        default: return state;

    }
}

export default postReducer;












(44/7) + (8^2/5) - (99/3.9^2)