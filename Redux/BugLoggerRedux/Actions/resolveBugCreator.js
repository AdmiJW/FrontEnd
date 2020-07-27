import ActionType from './actionTypes';


const resolveBugCreator = (id) => {
    return {
        type: ActionType.RESOLVE_BUG,
        payload: {
            id: id
        }
    };
};

export default resolveBugCreator;