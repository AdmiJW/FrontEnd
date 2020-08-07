const actionTypes = {
    
    //CLASS APPLIED WILL SCALE X AND Y TO 0
    
    EDITOR_CLOSING: 'EDITOR_CLOSING',   //  Will apply CLASS which scale Y to 0 and scale X to 0
    EDITOR_CLOSED: 'EDITOR_CLOSED',     //  Will display none, and updates the state value
    EDITOR_OPENING: 'EDITOR_OPENING',  //  Will immediately display flex, undo CLASS
    EDITOR_OPENED: 'EDITOR_OPENED',     //  After some time, Just updates the state value

    EDITOR_MAXIMIZING: 'EDITOR_MAXIMIZING',     //  Will apply CLASS which position fixed, makes transition of moving
    EDITOR_MAXED: 'EDITOR_MAXED',               //  Update the store (Change the button also)
    EDITOR_MINIMIZING: 'EDITOR_MINIMIZING',     //  Will remove CLASS
    EDITOR_MINED: 'EDITOR_MINED',               //  After some time, just updates the state value

    EDITOR_TEXT_CHANGED: 'EDITOR_TEXT_CHANGED',

    VIEWER_CLOSING: 'VIEWER_CLOSING',
    VIEWER_CLOSED: 'VIEWER_CLOSED',
    VIEWER_OPENING: 'VIEWER_OPENING',
    VIEWER_OPENED: 'VIEWER_OPENED',

    VIEWER_MAXIMIZING: 'VIEWER_MAXIMIZING',
    VIEWER_MAXED: 'VIEWER_MAXED',
    VIEWER_MINIMIZING: 'VIEWER_MINIMIZING',
    VIEWER_MINED: 'VIEWER_MINED'
}

export default actionTypes;


/*
    When want to close editor:

    Initially (Display: flex) 
    ACTION > Closing (Transition types come into act through a class)
    ACTION > Closed  (After a set amount of time, make the editor window display none and update state value)

    When want to open editor:

    Initially (Display: none)
    ACTION > OPENING  (Display: flex. Transition should come into act if nothing goes wrong)
    ACTION > OPENED   (After a set amount of time, Update state value )

*/