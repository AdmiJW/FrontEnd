import ActionTypes from './ActionTypes';


const courseActions = {
    addCourse: function () {
        return {
            type: ActionTypes.ADD_COURSE
        };
    },
    
    deleteCourse: function( courseIndexToDel ) {
        return {
            type: ActionTypes.DELETE_COURSE,
            payload: {
                courseIndexToDel
            }
        };
    },

    //  Change Course Name, Lecturer Name, or Course Code
    changeCourseInfo: function( newInfoValues ) {
        return {
            type: ActionTypes.CHANGE_COURSE_INFO,
            payload: {
                newInfoValues
            }
        };
    }

}

export default courseActions;
