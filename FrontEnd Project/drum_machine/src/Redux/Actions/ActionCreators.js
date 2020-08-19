import ActionType from './ActionType';

const ActionCreator = {

    //  Called when the power button is clicked
    togglePower: function() {
        return {
            type: ActionType.TOOGLE_POWER
        };
    },

    //  Called when the user changes the volume of the drum machine
    volumeChange: (volume) => {
        return {
            type: ActionType.CHG_VOLUME,
            payload: volume
        }
    },

    //  Called when the user changes the bank. The payload consists of an integer indicating the id of bank
    //  0 is first, 1 is second, 2 is third
    changeBank: (newBank) => {
        return {
            type: ActionType.CHG_BANK,
            payload: newBank
        }
    },

    //  Called when one of the drum pad is pressed. The playing of sound effect is handled in the DrumPadCOntainer.
    //  The purpose of this action is just to change the name of sfx on the screen
    drumPadPress: (sfxName) => {
        return {
            type: ActionType.DRUMPAD_PRESS,
            payload: sfxName
        }
    },

    //========== AUDIO =============

    //  Called when the audio button or close button on the audio overlay is clicked. Opens or close
    //  the audio window
    toogleOverlay: () => {
        return {
            type: ActionType.TOGGLE_OVERLAY
        };
    },

    //  Called when the audio is changed in the audio overlay. Payload consists of the new audio HTML
    //  element with the src attribute set, and the audioName to set on the screen
    setAudio: (audioElem, audioName) => {
        return {
            type: ActionType.SET_AUDIO,
            payload: [audioElem, audioName]
        };
    },

    //  Called when the play or pause button is pressed. The function is just to set the button icon
    //  to either start or pause
    playPause: () => {
        return {
            type: ActionType.PLAY_PAUSE
        };
    },

    //  Called when the stop button is pressed. It just make the isPlaying state to false hence the button
    //  will show play icon instead of pause
    resetAudio: () => {
        return {
            type: ActionType.RESET_AUDIO
        };
    }  
}

export default ActionCreator;