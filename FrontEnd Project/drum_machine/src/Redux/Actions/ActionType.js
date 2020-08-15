
/*
    TOOGLE_POWER:   Toggled when the power button is pressed. Toogles between power on and off
    CHG_VOLUME:     Toggled when the volume spinner is spinned. Changes the volume of the sounds
    DRUMPAD_PRESS:  Toggled when the user presses one of drum pads. This is required to Show the Sfx name in screen
*/

const ActionTypes = {
    TOOGLE_POWER: 'TOOGLE_POWER',
    CHG_VOLUME: 'CHANGE_VOLUME',
    CHG_BANK: 'CHANGE_BANK',
    DRUMPAD_PRESS: 'DRUMPAD_PRESS',
    TOGGLE_OVERLAY: 'TOOGLE_OVERLAY',
    SET_AUDIO: 'SET_AUDIO',
    PLAY_PAUSE: 'PLAY_PAUSE',
    RESET_AUDIO: 'RESET_AUDIO'
}

export default ActionTypes;