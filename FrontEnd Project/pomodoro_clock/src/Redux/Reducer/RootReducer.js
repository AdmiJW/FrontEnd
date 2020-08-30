
import ActionType from '../Actions/ActionType';

import Actions from '../Actions/Actions';

import StatesOfTimer from '../../StatesOfTimer';
import store from '../Store/Store';

// import RingTone1 from '../../Resources/Alarm1.wav';
// import CuckooClock from '../../Resources/CuckooClock.wav';
// import ColdSynth from '../../Resources/ColdSynth.wav';

const alarm1URL = 'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/media/Alarm1.ae921f07.wav';
const alarm2URL = 'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/media/CuckooClock.c7335b18.wav';
const alarm3URL = 'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/media/ColdSynth.6d78e68a.wav';


//  Set up Default Sounds in Local Storage
//  The alarms are stored in stringified JSON object, in the form of { name: alarmName, url: alarmURL }
//  Every time to access the alarms, shall use JSON.parse() 
const sound01 = { name: 'Melody', url: alarm1URL };
const sound02 = { name: 'Cuckoo Clock', url: alarm2URL };
const sound03 = { name: 'Cold Synth', url: alarm3URL };

window.localStorage.setItem(0, JSON.stringify( sound01 ) );
window.localStorage.setItem(1, JSON.stringify( sound02 ) );
window.localStorage.setItem(2, JSON.stringify( sound03 ) );

//  The HTML Audio Element. Its source shall be loaded with alarm sound, which is played when timer counts to 0
const audioElem = document.createElement('audio');
audioElem.id = 'beep';      //  To met the requirements of FreeCodeCamp
document.getElementsByTagName('body')[0].appendChild(audioElem);

audioElem.volume = 0.5;

//  Audio HTML element is initialized with the first Default Alarm Sound
audioElem.src = JSON.parse(window.localStorage.getItem(0) ).url;



const initialState = {
    timerState: StatesOfTimer.INIT,        //   INIT, SESSION or BREAK
    timerMin: 25,                          //   The MINUTE that shall be shown on the timer
    timerSec: 0,                           //   The SECOND that shall be shown on the timer
    isMiddleColonShown: true,              //   Every 500ms, the colon will dissapear, then reappear, effect of digital clock
    intervalObject: null,                  //   The interval object. Use this to clearInterval
    isPaused: true,                        
    
    isFetchingQuote: false,                 //  True if the motivationDiv is fetching quote. Will show the spinner
    quote: null,                            //  Currently loaded quote. A JS object

    alarmHTML: audioElem,                   //  The audio HTML element. Use this to set src and play()
    alarmName: JSON.parse(window.localStorage.getItem(0) ).name,       //   The alarm name. Initialized to the default first Alarm Name
    alarm_volume: 0.5,                      //  Volume set to the audio HTML element

    break_length: 5,                    //  The length of Break in minutes
    session_length: 25                  //  The length of Session in minutes
}


//  A function which will set up the interval object which fires the DECREMENT_TIME action every 500ms
//  Will return the interval object itself to be set in state, which can be used in clearInterval later
function setUpInterval() {
    return window.setInterval(()=> {
        store.dispatch( Actions.decrementTime() );
    }, 500);
}



const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        //  Play Pause button is clicked.
        case ActionType.PLAY_PAUSE_CLICK:
            if ( state.timerState === StatesOfTimer.INIT )
                return {...state, isPaused: false, timerState: StatesOfTimer.SESSION, intervalObject: setUpInterval() };
            if (!state.isPaused) {
                window.clearInterval( state.intervalObject );
                return {...state, isPaused: !state.isPaused, intervalObject: null };
            }
            return {...state, isPaused: !state.isPaused, intervalObject: setUpInterval() };
        //  Reset button is clicked.
        case ActionType.RESET_CLICK:
            window.clearInterval( state.intervalObject );
            return {...initialState, quote: state.quote };
            
        //  Alarm Sound is changed from the select HTML. Set the audio HTML src to the alarm, then update state
        case ActionType.ALARM_CHANGED:
            const alarmID = action.payload;
            const alarmJSON = JSON.parse( window.localStorage.getItem(alarmID) );
            state.alarmHTML.src = alarmJSON.url;
            return Object.assign( {}, state, { alarmName: alarmJSON.name } );
        //  Alarm Volume is changed
        case ActionType.ALARM_VOL_CHANGED:
            state.alarmHTML.volume = action.payload;
            return Object.assign( {}, state, {alarm_volume: action.payload} );

        //  Break length is changed.
        case ActionType.BREAK_LEN_CHANGED:
            return Object.assign( {}, state, {break_length: action.payload} );
        //  Session length is changed.
        case ActionType.SESSION_LEN_CHANGED:
            if ( state.timerState === StatesOfTimer.INIT )
                return { ...state, session_length: action.payload, timerMin: action.payload };
            return Object.assign( {}, state, {session_length: action.payload} );

        //  The quote is currently being fetched. Show SPinner
        case ActionType.QUOTE_FETCHING:
            return {...state, isFetchingQuote: true, quote: null};
        //  The quote is fetched. Update the state's quote
        case ActionType.QUOTE_FETCHED:
            return {...state, isFetchingQuote: false, quote: action.payload};


        //  Every 500ms this is called.
        //  If the colon is shown, then just don't show the middle colon.
        //  Else if the colon is not shown, it's time to tick down one seconds
        case ActionType.DECREMENT_TIME:
            if (state.isMiddleColonShown )
                return {...state, isMiddleColonShown: false};
            else {
                //  Seconds is still larger than 0
                if (state.timerSec > 0)
                    return {...state, isMiddleColonShown: true, timerSec: state.timerSec - 1};
                //  Seconds is 0, Minutes is still larger than 0
                else if (state.timerMin > 0)
                    return {...state, isMiddleColonShown: true, timerMin: state.timerMin - 1, timerSec: 59};
                //  The time is 00:00. Change Session now
                else {
                    state.alarmHTML.play();
                    if (state.timerState === StatesOfTimer.SESSION)
                        return {...state, isMiddleColonShown: true, timerMin: state.break_length, timerSec: 0,
                            timerState: StatesOfTimer.BREAK };
                    else
                        return {...state, isMiddleColonShown: true, timerMin: state.session_length, timerSec: 0,
                            timerState: StatesOfTimer.SESSION };
                }
            }

        default: return state;
    }
}


export default rootReducer;