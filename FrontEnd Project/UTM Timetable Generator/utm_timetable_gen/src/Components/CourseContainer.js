import React from 'react';
import { connect } from 'react-redux';

import CourseActions from '../Redux/Actions/CourseActions';

// Other React Components
import CourseItem from './CourseItem.js';


class CourseContainer extends React.Component {
    constructor(props) {
        super(props);

        this.addCourse = this.addCourse.bind(this);
        this.courseItemRenderer = this.courseItemRenderer.bind(this);
    }

    componentDidMount() {
        this.courseContainer = document.getElementById('course-window__div');
    }

    addCourse() {
        this.props.addCourse();

        //  Only scroll to bottom after element is inserted, which takes a little bit of time
        setTimeout(() => {
            this.courseContainer.scrollTop = this.courseContainer.scrollHeight;
        }, 50);
    }

    //  Converts the array of courses into the JSX respective.
    courseItemRenderer() {
        // const courseHTML = this.props.courseItems.map( (val, idx) => {
        //     return ( <CourseItem key={idx} courseID={idx} courseInfo={val} courseTimes={this.props.courseTimeItems[idx] } /> );
        // });
        // return courseHTML;
        const { courseItems, courseTimeItems } = this.props;

        console.log( Object.keys(courseItems) );
        const courseHTML = Object.keys( courseItems ).map( (courseID) => {
            return ( <CourseItem key={courseID} courseInfo={courseItems[courseID]} 
                courseTimes={courseTimeItems[courseID] } /> );
        });
        return courseHTML;
    }

    render() {

        //=================================== JSX ==========================================
        return (
            <main className='course-window' id='course-window'>

                <div className='course-window__div' id='course-window__div'>
                    { this.courseItemRenderer() }
                </div>

                <button type='button' className='course-window__add-button' id='course-window__add-button'
                    onClick={ this.addCourse } >
                    +
                </button>
            </main>
        );
        //=================================== JSX ==========================================
    }
}





function mapStateToProps(store) {
    return {
        courseItems: store.courseItems,
        courseTimeItems: store.courseTimeItems
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addCourse: () => dispatch( CourseActions.addCourse() )
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer);