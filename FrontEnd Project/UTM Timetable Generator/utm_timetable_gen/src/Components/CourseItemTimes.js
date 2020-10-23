import React from 'react';

class CourseItemTimes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //=================================== JSX ==========================================
        return (
            <div className='course-item__times'>

                
                <div className='course-item__times__entry'>

                    <button type='button' className='course-item__times__entry__delete-button'>
                        X
                    </button>


                    <select className='course-item__times__entry__dayOfWeek'>
                        <option value='Sun'>Sunday</option>
                        <option value='Mon'>Monday</option>
                        <option value='Tue'>Tuesday</option>
                        <option value='Wed'>Wednesday</option>
                        <option value='Thu'>Thursday</option>
                    </select>

                    <select className='course-item__times__entry__session'>
                        <option value='02'>02 (8:00am - 8:50am)</option>
                        <option value='03'>03 (9:00am - 9:50am)</option>
                        <option value='04'>04 (10:00am - 10:50am)</option>
                        <option value='05'>05 (11:00am - 11:50am)</option>
                        <option value='06'>06 (12:00pm - 12:50pm)</option>
                        <option value='07'>07 (1:00pm - 1:50pm)</option>
                        <option value='08'>08 (2:00pm - 2:50pm)</option>
                        <option value='09'>09 (3:00pm - 3:50pm)</option>
                        <option value='10'>10 (4:00pm - 4:50pm)</option>
                        <option value='11'>11 (5:00pm - 5:50pm)</option>
                        <option value='12'>12 (6:00pm - 6:50pm)</option>
                    </select>

                </div>
                
            </div>

                
        );
        //=================================== JSX ==========================================
    }
}


export default CourseItemTimes;