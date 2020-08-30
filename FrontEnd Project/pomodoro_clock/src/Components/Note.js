import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import padZeroes from '../PadZeroes';

class Note extends React.Component {

    render() {
        const { breakLength, sessionLength, alarmName } = this.props;

        return (
        //  JSX ==========================
        <div className='note-div'>

            <div className='note' id='note'>

                <section className='note-section' id='note-section-break'>
                    <h3 className='note-label' id='note-break-label'>Break Length</h3>
                    <p className='note-break' id='note-break'> { `${padZeroes(breakLength)}:00` } </p>
                </section>

                <section className='note-section' id='note-section-session'>
                    <h3 className='note-label' id='note-session-label'>Session Length</h3>
                    <p className='note-break' id='note-break'>{ `${padZeroes(sessionLength)}:00`} </p>
                </section>

                <section className='note-section' id='note-section-alarm'>
                    <h3 className='note-label' id='note-alarm-label'>Alarm</h3>
                    <p className='note-alarm' id='note-alarm'> { alarmName } </p>
                </section>
            </div>
            
            <div className='note-bg' id='note-bg'></div>
        </div>
        //  ==============================
        );
    }
}



//==========================================
//  PROPTYPES AND MAP TO PROPS
//==========================================

Note.propTypes = {
    breakLength: PropTypes.number.isRequired,
    sessionLength: PropTypes.number.isRequired,
    alarmName: PropTypes.string.isRequired
}


function mapStateToProps( store ) {
    return {
        breakLength: store.break_length,
        sessionLength: store.session_length,
        alarmName: store.alarmName
    };
}

export default connect(mapStateToProps, null)(Note);