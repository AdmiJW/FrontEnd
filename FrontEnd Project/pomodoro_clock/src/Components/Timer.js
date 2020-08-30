import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import $ from 'jquery';

import Actions from '../Redux/Actions/Actions';
import padZeroes from '../PadZeroes';



function getTime(min, sec, isColonShown) {
    return `${padZeroes(min)}${isColonShown? ':': ' '}${padZeroes(sec)}`
}



class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.playPauseBtnClicked = this.playPauseBtnClicked.bind(this);
        this.resetBtnClicked = this.resetBtnClicked.bind(this);
    }

    componentDidMount() {
        $('#timer-settings').click( ()=> {
            $('#config').addClass('opened');
        });
    }

    playPauseBtnClicked() {
        this.props.playPauseClicked();
    }

    resetBtnClicked() {
        const selectHTML = $('#alarm-sound');
        const { alarmChanged } = this.props;

        //  Change the selected alarm sound to the first one, preloaded alarm sound
        alarmChanged(0);
        selectHTML[0].value = "0";
        this.props.resetClicked();
    }


    render() {
        
        const { timerState, timerMin, timerSec, isMiddleColonShown, isPaused } = this.props;

        //  If is paused, apply the play btn class, else pause btn class
        const playPauseBtnClass = isPaused? 'las la-play la-lg': 'las la-pause la-lg';

        return (
            //  JSX ===========================
            <div className='timer' id='timer'>
                <div className='timer-time' id='timer-time'>
                <div className='timer-label' id='timer-label'> { timerState } </div>
                    <div className='time-left' id='time-left'>{getTime(timerMin, timerSec, isMiddleColonShown)}</div>
                </div>

                <div className='timer-options' id='timer-options'>
                    <button type='button' className='start_stop' id='start_stop' onClick={ this.playPauseBtnClicked } >
                        <i className={ playPauseBtnClass } ></i>
                    </button>
                    <button type='button' className='reset' id='reset' onClick={this.resetBtnClicked } >
                        <i className="las la-redo-alt la-lg"></i>
                    </button>
                    <button type='button' className='timer-settings' id='timer-settings'>
                        <i className="las la-tools la-lg"></i>
                    </button>
                </div>
            </div>

            //  ===============================
        );
    }
}




//==========================================
//  PROPTYPES AND MAP TO PROPS
//==========================================

Timer.propTypes = {
    playPauseClicked: PropTypes.func.isRequired,
    resetClicked: PropTypes.func.isRequired,
    alarmChanged: PropTypes.func.isRequired,

    timerState: PropTypes.string.isRequired,
    timerMin: PropTypes.number.isRequired,
    timerSec: PropTypes.number.isRequired,
    isMiddleColonShown: PropTypes.bool.isRequired,
    isPaused: PropTypes.bool.isRequired
}


function mapStateToProps( store ) {
    return {
        timerState: store.timerState,
        timerMin: store.timerMin,
        timerSec: store.timerSec,
        isMiddleColonShown: store.isMiddleColonShown,
        isPaused: store.isPaused
    };
}

function mapDispatchToProps( dispatch ) {
    return {
        playPauseClicked: ()=> {
            dispatch( Actions.playPauseClick() );
        },
        resetClicked: ()=> {
            dispatch( Actions.resetClick() );
        },
        alarmChanged: (alarmID)=> {
            dispatch( Actions.alarmChanged(alarmID) );
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Timer);