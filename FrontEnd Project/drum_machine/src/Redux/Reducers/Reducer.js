import ActionType from '../Actions/ActionType'

const initialState = {
    isPowerOn: true,
    volume: 50,
    currentBank: 0,     
    currentSfx: '',
    isOverlayShow: true,
    audio: null,
    audioName: '',
    isAudioPlaying: false
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