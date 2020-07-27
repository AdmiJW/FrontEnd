
import ActionType from './actionTypes';

const removeBugCreator = (id) => {
    return {
        type: ActionType.REMOVE_BUG,
        payload: {
            id: id
        }
    };
};


export default removeBugCreator;