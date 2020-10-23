import ActionTypes from './ActionTypes';


const TimeActions = {

    addTime: function( courseIndexToAdd ) {
        return {
            type: ActionTypes.ADD_TIME,
            payload: {
                courseIndexToAdd
            }
        };
    },

    deleteTime: function( courseIndexToDel, timeIndexToDel ) {
        return {
            type: ActionTypes.DELETE_TIME,
            payload: {
                courseIndexToDel, timeIndexToDel
            }
        };
    },

    changeTimeInfo: function ( courseIndexToChange, timeIndexToChange, newTimeValues ) {
        return {
            type: ActionTypes.CHANGE_TIME_INFO,
            payload: {
                courseIndexToChange, timeIndexToChange, newTimeValues 
            }
        };
    }

};

export default TimeActions;