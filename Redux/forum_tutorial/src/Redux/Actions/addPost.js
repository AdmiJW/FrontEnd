import ActionType from './actionType';

// const addPost = (title, desc) => (dispatch) => {
//     dispatch( {
//         type: ActionType.ADD_POST,
//         payload: {
//             title: title,
//             desc: desc
//         }
//     });
// }

const addPost = (title, desc) => {
    return {
        type: ActionType.ADD_POST,
        payload: {
            title: title,
            desc: desc
        }
    };
}

export default addPost;