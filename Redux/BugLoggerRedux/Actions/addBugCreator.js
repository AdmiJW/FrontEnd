
import ActionType from './actionTypes';

const addBugCreator = (title, description) => {
    return {
        type: ActionType.ADD_BUG,
        payload: {
            title: title,
            desc: description
        }
    };
};

export default addBugCreator;