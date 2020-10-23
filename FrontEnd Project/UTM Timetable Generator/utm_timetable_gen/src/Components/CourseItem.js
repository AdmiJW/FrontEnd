import React from 'react';
import { connect } from 'react-redux';



import CourseActions from '../Redux/Actions/CourseActions';
import TimeActions from '../Redux/Actions/TimeActions';

//  Other React Components
import CourseItemTimes from './CourseItemTimes.js';



class CourseItem extends React.Component {
    constructor(props) {
        super(props);
        console.log( props.courseInfo );
    
        this.courseInfo = props.courseInfo;
        this.courseID = this.courseInfo.courseID;
        this.courseTimes = props.courseTimes;

        this.deleteCourse = this.deleteCourse.bind(this);
        this.changeCourseInfo = this.changeCourseInfo.bind(this);
    }

    componentDidMount() {
        this.courseItemHTML = document.getElementById( `course-item-${ this.courseID }`);
        this.courseItemInfoElements = this.courseItemHTML.children[0].children;
        
        this.courseNameHTML = this.courseItemInfoElements[0];
        this.lecturerNameHTML = this.courseItemInfoElements[1];
        this.courseCodeHTML = this.courseItemInfoElements[2];
    }


    deleteCourse() {
        this.courseItemHTML.classList.add('fade-out');

        setTimeout(() => {
            this.props.deleteCourse( this.courseID );
        }, 500);
    }

    changeCourseInfo() {
        this.props.changeCourseInfo(
            {
                courseID: this.courseID,
                courseName: this.courseNameHTML.textContent,
                lecturerName: this.lecturerNameHTML.textContent,
                courseCode: this.courseCodeHTML.textContent
            }
        );
    }



    render() {
        //=================================== JSX ==========================================
        return (
            <div className='course-item' id={`course-item-${ this.courseID }`}>

                <div className='course-item__info'>
                    <h3 className='course-item__info__courseName' id={`course-item__info__courseName-${ this.courseID }`}
                        contentEditable spellCheck='false' suppressContentEditableWarning={true} onInput={ this.changeCourseInfo }> 
                        { this.courseInfo.courseName }
                    </h3>
                    <h6 className='course-item__info__lecturerName' id={`course-item__info__lecturerName-${ this.courseID }`}
                        contentEditable spellCheck='false' suppressContentEditableWarning={true} onInput={ this.changeCourseInfo }>
                        { this.courseInfo.lecturerName }
                    </h6>
                    <p className='course-item__info__courseCode' id={`course-item__info__courseCode-${ this.courseID }`}
                        contentEditable spellCheck='false' suppressContentEditableWarning={true} onInput={ this.changeCourseInfo }>
                        { this.courseInfo.courseCode }
                    </p>

                    <div className='course-item__info__buttons'>
                        <button type='button' className='course-item__info__buttons__delete-btn'
                            onClick={ this.deleteCourse } >
                            <i className="fas fa-trash-alt"></i>
                        </button>
                        <button type='button' className='course-item__info__buttons__add-button'>
                            +
                        </button>
                    </div>
                </div>

                <div className='course-item__seperator'></div>

                <CourseItemTimes />
                
            </div>
        );
        //=================================== JSX ==========================================
    }
}



function mapDispatchToProps(dispatch) {
    return {
        deleteCourse: ( courseIndexToDel ) => dispatch( CourseActions.deleteCourse( courseIndexToDel ) ),
        changeCourseInfo: ( newInfoValues ) => dispatch( CourseActions.changeCourseInfo( newInfoValues ) )
    }
}







export default connect(null, mapDispatchToProps)(CourseItem);