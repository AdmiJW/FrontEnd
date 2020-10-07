
import * as Renderer from "./Renderer.js";
import * as Main from './script.js';
import * as Sounds from './Sounds.js';

//=================================================================
//=================== UTILITIES SECTION ===========================
//=================================================================



// ===================================================================================================
//  Bomb object. Used in the game state array - bombData
// ===================================================================================================
export class Bomb {
    static nextID = 0;      // Access by Bomb.nextID
    constructor(color) {
        this.color = color;
        this.id = Bomb.nextID ++; 
    }
}

/* ===================================================================================================
    Obtain the transform properties in the form of string

    index - The index of the bomb. Determines how much horizontal offset is required
    scale - The scale of the bomb
    isScaling - whether the bomb will be scaled. If true, since SVG element transform from the point (0,0),
                additional offset calculation is required so that transform origin is center
=================================================================================================== */
export function getTransform(index, scale, isScaling) {
    return `translate( ${ index * 50 + Main.rowMargin + (isScaling? 25: 0) }, ${isScaling? 50: 0}) 
            scale(${scale})`;
}


/* ===================================================================================================
    Custom random number generator

    startInclusive - The lower bound value for random number generation. Inclusive
    endExclusive - The upper bound value for random number generation. Exclusive
    isInteger - Optional. Determines whether value returned is integer or not. Default is false, which returns
                floating point number
=================================================================================================== */
export function getRandom( startInclusive, endExclusive, isInteger = false ) {
    let n = Math.random() * (endExclusive - startInclusive) + startInclusive;

    if (isInteger)
        n = Math.floor(n);
    return n;
}

// ===================================================================================================
//  Clear everything, and rerenders the bomb rows
//  Also will clear all interval events (Countdowns)
//  ===================================================================================================
export function clearGame( bombRows, bombDatas, intervalObjects, intervalTimes, scoreHTML, levelHTML ) {
    
    scoreHTML.text('0');
    levelHTML.text('1');

    for (let i = 0; i < 3; i++ ) {
        bombDatas[i] = [];
        Renderer.renderRow( bombRows[i], bombDatas[i] );

        window.clearInterval( intervalObjects[i] );
        intervalTimes[i] = 0;
    }
    
}


/* ===================================================================================================
    Add a bomb to the provided row and renders it. If no color specified, set to a random color of bomb
    If the bomb count exceeds the number of bombs available, will return false, which is to be handled

    rowNo - The row number affected
    bombRows - Game state object storing the D3 selected rows.
    bombDatas - Game state object storing the Bomb instances stored in all 3 rows
    color - Optional. The color of the bomb to be added. If omitted will add bomb of random color
=================================================================================================== */
const bombType = ['red', 'yellow', 'green'];

export function addBomb( rowNo, bombRows, bombDatas, color = bombType[ getRandom(0, 3, true) ] ) {
    if (bombDatas[rowNo].length >= 9) {
        return false;
    }
    bombDatas[rowNo].push( new Bomb(color) );

    Renderer.renderRow( bombRows[rowNo], bombDatas[rowNo] );
    return true;
}





/* ===================================================================================================
    Core game logic of eliminating bombs. It is a pure function which doesn't mutate original array.
    Returns a list:
        index 0: The score obtained after eliminating the bombs
        index 1: The new group after applied the logic
=================================================================================================== */
export function applyLogic( bombRow ) {
    
    const len = bombRow.length;
    if (len === 0) return [0, [] ];

    const newBombRow = [...bombRow];
    let streakColor = newBombRow[len - 1].color;
    let counter = 0;
    let score = 0;

    //  A function which elimiates the combo for the rowGroup
    const eliminateCombo = () => {
        if (counter >= 3) {
            while (counter-- > 0) {
                newBombRow.pop();
                score ++;
            }
            streakColor = '';
        }
    }

    for (let i = newBombRow.length - 1; i >= 0; i -- ) {
        const e = bombRow[i];
        if (e.color != streakColor) {
            break;
        } else {
            counter ++;
        }
    }
    eliminateCombo();
    return [score,newBombRow];
}