import ActionType from '../Actions/ActionType'

const initialState = {
    isPowerOn: true,    // if false, the audio element of drum pads will not have a src attribute, hence no sound
    volume: 50,             
    currentBank: 0,     // 0 means the first bank, 1 means the first and 2 is the second
    currentSfx: '',     // The name of the last played Sfx
    isOverlayShow: false,      //  is the audio selector window shown? Will set the class of window to hidden or not,
                                // as well as set drum pad to make sound on key press or not
    audio: null,           //  Current loaded audio
    audioName: '',          //  CUrrent loaded audio name
    isAudioPlaying: false     //    Is the audio currently playing?
}

function Reducer(state = initialState, action) {
    
    switch (action.type) {
        case ActionType.TOOGLE_POWER:
            return {...state, isPowerOn: !state.isPowerOn};
        case ActionType.CHG_VOLUME:
            return {...state, volume: action.payload };
        case ActionType.CHG_BANK:
            return {...state, currentBank: action.payload };
        case ActionType.DRUMPAD_PRESS:
            return {...state, currentSfx: action.payload };

        //=======AUDIO ================
        case ActionType.TOGGLE_OVERLAY:
            return {...state, isOverlayShow: !state.isOverlayShow };
        case ActionType.SET_AUDIO:
            return {...state, audio: action.payload[0] , audioName: action.payload[1] };
        case ActionType.PLAY_PAUSE:
            return {...state, isAudioPlaying: !state.isAudioPlaying };
        case ActionType.RESET_AUDIO:
            return {...state, isAudioPlaying: false };
        default:
            return state;
    }

}

export default Reducer;