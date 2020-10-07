import { bomb_red, bomb_yellow, bomb_green, bomb_panel, bomb_row_svg } from '../Script/svg.js';

import * as Renderer from './Renderer.js';
import * as Util from './Utilities.js';
import * as Sounds from './Sounds.js';


//  How the bomb draws from the row left and right side
export const rowMargin = 5;
//  Bomb dissapear, moving and appearing transition time
export const transitionTime = 200;
//  The initial interval for bombs to be appearing
export const initIntervalDuration = 5000;
//  Score required to obtain to level up
const initLevelUpScore = 10;

//  Game state indicating whether it is currently in game. Determines the behavior of the buttons (To add bomb or not)
let isPlaying = false;


//=================================================================
// Entry point of code execution here:
//=================================================================
document.addEventListener('DOMContentLoaded', ()=> {

//  Render the bomb rows and button panels. The basic element of the game
Renderer.renderBG();

//  Game state HTML
const scoreHTML = d3.select('#ui__score-value');
const levelHTML = d3.select('#ui__level-value');

let tillNextLvl = initLevelUpScore;

//  An array containing 3 arrays. Storing the state of each bomb row: What bomb is inside?
const bombDatas = [ 
    [], 
    [], 
    [] ];

//  The Three bomb rows, selected using D3
const bombRows = [ d3.select('#bomb-row-0'),
    d3.select('#bomb-row-1'),
    d3.select('#bomb-row-2') ];

//  The interval object for each of the rows
const intervalObjects = [null, null, null];
//  Row1, Row2, Row3, in milliseconds
const intervalTimes = [0,0,0];  


const renderTimeoutObjects = [null, null, null];





//  Bomb panel buttons
const buttons = [
    document.querySelector('#bomb-panel-0 .bomb__red'),
    document.querySelector('#bomb-panel-0 .bomb__yellow'),
    document.querySelector('#bomb-panel-0 .bomb__green'),
    document.querySelector('#bomb-panel-1 .bomb__red'),
    document.querySelector('#bomb-panel-1 .bomb__yellow'),
    document.querySelector('#bomb-panel-1 .bomb__green'),
    document.querySelector('#bomb-panel-2 .bomb__red'),
    document.querySelector('#bomb-panel-2 .bomb__yellow'),
    document.querySelector('#bomb-panel-2 .bomb__green'),
];


// Apply onClick Event listener for the buttons, so that when click, it show a clicked effect
// Also, it will add a new 'bomb' to the bombData, and rerenders the bomb row using D3 General Update Pattern
buttons.forEach( btn => {
    btn.addEventListener('click', (e)=> {

        //  PLay the button click SFX
        Sounds.bombButtonClickSFX.currentTime = 0;
        Sounds.bombButtonClickSFX.play();      
        
        //==Logic-Add bomb======
        if (isPlaying) {
            const color = e.currentTarget.classList[0].slice(6);  // Class format: bomb__color. Slice the 'bomb__' part
            const row = e.currentTarget.parentElement.dataset['row_no'];
        
            if ( !Util.addBomb( row, bombRows, bombDatas, color ) ) {
                transitionGameState('game-over');
                return;
            }

            window.clearTimeout( renderTimeoutObjects[row] );

            //  After the bomb is seen 'popped' out from screen, only then we apply game logic of eliminating bombs
            renderTimeoutObjects[row] = setTimeout( () => {
                const [ score, newList ] = Util.applyLogic( bombDatas[row] );
                bombDatas[row] = newList;

                let prevScore = Number( scoreHTML.text() );
                let prevLevel = Number( levelHTML.text() );
                scoreHTML.text( prevScore + score);

                //  If score is not zero, then some bomb is destructed. Play audio
                if (score !== 0)
                    Sounds.bombDestructSFX.play();

                tillNextLvl -= score;
                levelUpLogic( prevLevel + 1, levelHTML );

                Renderer.renderRow( bombRows[row], bombDatas[row] );

            }, transitionTime);
        }

        //===BUTTON DOWN EFFECT=====
        btn.classList.add('pressed');

        setTimeout( ()=> {
            btn.classList.remove('pressed');
        }, 200);
    });
});

//  Add event listeners to keyboard. When QWE, ASD, ZXC are pressed, trigger the bomb button
document.addEventListener('keydown', (e)=> {
    const mapKeyToIndex = {
        'Q': 0, 'W': 1, 'E': 2,
        'A': 3, 'S': 4, 'D': 5,
        'Z': 6, 'X': 7, 'C': 8
    }
    const idx = mapKeyToIndex[ e.code.slice(3) ];

    if ( idx !== undefined) {
        buttons[idx].dispatchEvent( new Event('click') );
    }
});

transitionGameState('tutorial');







//===============================================================
//  STATE MANIPULATING FUNCTIONS
//===============================================================
function transitionGameState( mode ) {
    const windowHTML = document.getElementById('play-gameover');

    if (mode == 'in-game') {
        isPlaying = true;
        windowHTML.classList.add('hidden');
        for (let i = 0; i < 3; i ++ ) {
            setUpInterval(i, bombRows, bombDatas, intervalObjects, intervalTimes, initIntervalDuration);
        }
        return;
    }

    const buttonHTML = windowHTML.children[6];  //  Button is the 6th child of the document
    isPlaying = false;

    if (mode == 'tutorial') {
        Renderer.showWindow('tutorial');
        buttonHTML.onclick = ()=> {
            Sounds.menuButtonClickSFX.play();
            transitionGameState( 'in-game' );
        }
    } else if ( mode == 'game-over') {
        Sounds.gameOverSFX.play();
        Renderer.showWindow('game-over');
        Util.clearGame( bombRows, bombDatas, intervalObjects, intervalTimes, scoreHTML, levelHTML );
        tillNextLvl = initLevelUpScore;
        buttonHTML.onclick = ()=> {
            windowHTML.classList.add('hidden');
            Sounds.menuButtonClickSFX.play();
            setTimeout(() => {
                transitionGameState( 'tutorial' );
            }, 300);
        }
    }
}


/* ===================================================================================================
    Set up to create a new interval to automatically add bombs to rows. The interval time shall be
    shorter than the previous duration

    rowNo - The row number affected
    bombRows - Game state object storing the D3 selected rows.
    bombDatas - Game state object storing the Bomb instances stored in all 3 rows
    intervalObjects - An array storing the interval returned by the setInterval function. Used to clearInterval
    intervalTimes - An array storing the interval duration.
    defaultIntervalDuration - The default interval duration set during start of game 
=================================================================================================== */
function setUpInterval( rowNo, bombRows, bombDatas, intervalObjects, intervalTimes, defaultIntervalDuration ) {
    window.clearInterval( intervalObjects[rowNo] );

    // If the time is below or equal 0 (Like initialization time), set to defaultIntervalDuration
    const newTime = intervalTimes[rowNo] <= 0? 
        defaultIntervalDuration: 
        intervalTimes[rowNo] - Util.getRandom(200, 700, true);

    
    intervalObjects[rowNo] = window.setInterval( ()=> {
        if (!Util.addBomb( rowNo, bombRows, bombDatas ) ) {     // At intervals, add a bomb of random color to the row
            transitionGameState( 'game-over' );         // If the bomb added exceeds the limit, then game-over
            return;
        } else {    
            Sounds.bombSpawnSFX.play();       //  Bomb added so play sfx
        }
    }, newTime);
    intervalTimes[rowNo] = newTime;
}


/* ===================================================================================================
    Level Up Logic

=================================================================================================== */
function levelUpLogic( newLevel, levelHTML ) {
    if (tillNextLvl <= 0) {
        Sounds.levelUpSFX.play();      //  Play level up SFX

        tillNextLvl = initLevelUpScore + ( newLevel - 2) * 10; //   Update the till next level exp points

        levelHTML.text( newLevel );    //  Render the level text

        //  A random row spawn bombs faster now
        const fasterRow = Util.getRandom(0, 3, true);
        setUpInterval( fasterRow, bombRows, 
            bombDatas, intervalObjects, intervalTimes, initIntervalDuration );

        //  Show the level up message on screen. Pass in the row that gets faster as argument
        Renderer.showLevelUp( fasterRow + 1 );
    }
}

});






