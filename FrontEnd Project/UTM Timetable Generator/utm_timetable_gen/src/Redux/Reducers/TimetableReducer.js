
import ActionTypes from '../Actions/ActionTypes';

/* ==================================================================================================================
The state basically looks like this:

courseItems - An object, which the key is the courseID, mapping to another object representing the course itself.
              The course object contains the following:
              {
                  courseID:                     the ID of itself
                  courseName:                   the name of the course
                  lecturerName:                 the name of the lecturer
                  courseCode:                   the code of the course
              }

courseTimeItems - Shall be in sync with the courseItems. It is also an object mapping from courseID to another object
                  representing the course times. The course times object maps from timeID to object of individual time
                  which contains the following:
                  {
                      timeID:                   the ID of this time in this course
                      dayOfWeek:                the day of week of this course
                      session:                  the session in which the course is held
                  }
================================================================================================================= */
const initialState = {
    courseItems: {
        0: {
        courseID: 0,
        courseName: 'Discrete Structure',
        lecturerName: 'Dr.placeHolderText',
        courseCode: 'A123456'
        }
    },

    courseTimeItems: {
        0: {
            0: {
                timeID: 0,
                dayOfWeek: 'Sun',
                session: 2
            }
        }
    }

};


function timetableReducer(state = initialState, action ) {
    let { courseItems, courseTimeItems } = state;

    switch (action.type) {
        
        case ActionTypes.ADD_COURSE: {
            const newCourseItem = courseFactory();
            console.log(newCourseItem );
            courseItems = Object.assign({}, courseItems );
            courseItems[ newCourseItem.courseID ] = newCourseItem;
            courseTimeItems = Object.assign({}, courseTimeItems );
            courseTimeItems[ newCourseItem.courseID ] = {};

            return Object.assign({}, state, { courseItems, courseTimeItems } );
        }
        case ActionTypes.DELETE_COURSE: {
            const { courseIndexToDel }  = action.payload;
            console.log(courseIndexToDel)

            courseItems = Object.assign( {}, courseItems );
            delete courseItems[ courseIndexToDel ];

            courseTimeItems = Object.assign( {}, courseTimeItems );
            delete courseTimeItems[ courseIndexToDel ];

            return Object.assign({}, state, { courseItems, courseTimeItems } );
        }
        case ActionTypes.CHANGE_COURSE_INFO: {
            const { newInfoValues } = action.payload;
            const courseIndexToChange = newInfoValues.courseID;

            courseItems = Object.assign({}, courseItems);
            courseItems[ courseIndexToChange ] = newInfoValues;

            return Object.assign({}, state, { courseItems } );
        }


        case ActionTypes.ADD_TIME: {
            const { courseIndexToAdd } = action.payload;
            courseTimeItems = [ ...courseTimeItems ];   //Copied array of references. The references can be changed
            courseTimeItems[courseIndexToAdd] = [ ...courseTimeItems[courseIndexToAdd], timeFactory() ];
            
            return Object.assign({}, state, { courseTimeItems } );
        }
        case ActionTypes.DELETE_TIME: {
            const { courseIndexToDel, timeIndexToDel } = action.payload;

            courseTimeItems = [ ...courseTimeItems ];   //Copied array of references. The references can be changed
            courseTimeItems[courseIndexToDel] = 
                courseTimeItems[courseIndexToDel].filter( (val, idx) => idx !== timeIndexToDel );

            return Object.assign({}, state, { courseTimeItems } );
        }
        case ActionTypes.CHANGE_TIME_INFO: {
            const { courseIndexToChange, timeIndexToChange, newTimeValues } = action.payload;    
            const newCourseTimes = [ ...courseTimeItems[courseIndexToChange] ]; //Copied array of references to JSON object of times
                                                                        //of ONE said course. The references can be changed
            newCourseTimes[timeIndexToChange] = newTimeValues;

            courseTimeItems = [ ...courseTimeItems ];    //Copied array of references to courses. The references can be changed
            courseTimeItems[ courseIndexToChange ] = newCourseTimes;

            return Object.assign({}, state, { courseTimeItems } );
        }
        default:
            return state;
    }

}


const courseFactory = ( ()=> {
    let nextID = 1;
    return function() {
        return {
            courseID: nextID ++,
            courseName: '',
            lecturerName: '',
            courseCode: ''
        };
    };
})();

        
function timeFactory() {
    return {
        dayOfWeek: 'Sun',
        session: 2
    };
}

export default timetableReducer;
