import ActionType from './ActionType';

const ActionCreator = {

    togglePower: function() {
        return {
            type: ActionType.TOOGLE_POWER
        };
    },
    volumeChange: (volume) => {
        return {
            type: ActionType.CHG_VOLUME,
            payload: volume
        }
    },
    changeBank: (newBank) => {
        return {
            type: ActionType.CHG_BANK,
            payload: newBank
        }
    },
    drumPadPress: (sfxName) => {
        return {
            type: ActionType.DRUMPAD_PRESS,
            payload: sfxName
        }
    },

    //========== AUDIO =============
    toogleOverlay: () => {
        return {
            type: ActionType.TOGGLE_OVERLAY
        };
    },

    setAudio: (audioElem, audioName) => {
        return {
            type: ActionType.SET_AUDIO,
            payload: [audioElem, audioName]
        };
    },

    playPause: () => {
        return {
            type: ActionType.PLAY_PAUSE
        };
    },

    resetAudio: () => {
        return {
            type: ActionType.RESET_AUDIO
        };
    }  
}

export default ActionCreator;