import ActionType from './ActionType';



const Actions = {
    playPauseClick: () => ({
        type: ActionType.PLAY_PAUSE_CLICK
    }),
    resetClick: () => ({
        type: ActionType.RESET_CLICK
    }),


    //  0, 1, and 2 are default AlarmID, which ID is used to access them at LOCAL STORAGE
    alarmChanged: ( alarmID ) => ({
        type: ActionType.ALARM_CHANGED,
        payload: alarmID
    }),
    alarmVolChanged: (alarmVol) => ({
        type: ActionType.ALARM_VOL_CHANGED,
        payload: alarmVol
    }),

    breakLenChanged: (newBreakLength) => ({
        type: ActionType.BREAK_LEN_CHANGED,
        payload: newBreakLength
    }),
    sessionLenChanged: (newSessionLength) => ({
        type: ActionType.SESSION_LEN_CHANGED,
        payload: newSessionLength
    }),

    quoteFetching: () => ({
        type: ActionType.QUOTE_FETCHING
    }),
    quoteFetched: (quoteJSON) => ({
        type: ActionType.QUOTE_FETCHED,
        payload: quoteJSON
    }),


    changeSession: () => ({
        type: ActionType.CHANGE_SESSION
    }),
    decrementTime: () => ({
        type: ActionType.DECREMENT_TIME
    })
}

export default Actions;