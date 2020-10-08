

//  How the bomb draws from the row left and right side
const rowMargin = 5;
//  Bomb dissapear, moving and appearing transition time
const transitionTime = 200;
//  The initial interval for bombs to be appearing
const initIntervalDuration = 5000;
//  Score required to obtain to level up
const initLevelUpScore = 10;

//  Game state indicating whether it is currently in game. Determines the behavior of the buttons (To add bomb or not)
let isPlaying = false;


//=================================================================
// Entry point of code execution here:
//=================================================================
document.addEventListener('DOMContentLoaded', ()=> {

//  Render the bomb rows and button panels. The basic element of the game
renderBG();

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
        bombButtonClickSFX.currentTime = 0;
        bombButtonClickSFX.play();      
        
        //==Logic-Add bomb======
        if (isPlaying) {
            const color = e.currentTarget.classList[0].slice(6);  // Class format: bomb__color. Slice the 'bomb__' part
            const row = e.currentTarget.parentElement.dataset['row_no'];
        
            if ( !addBomb( row, bombRows, bombDatas, color ) ) {
                transitionGameState('game-over');
                return;
            }

            window.clearTimeout( renderTimeoutObjects[row] );

            //  After the bomb is seen 'popped' out from screen, only then we apply game logic of eliminating bombs
            renderTimeoutObjects[row] = setTimeout( () => {
                const [ score, newList ] = applyLogic( bombDatas[row] );
                bombDatas[row] = newList;

                let prevScore = Number( scoreHTML.text() );
                let prevLevel = Number( levelHTML.text() );
                scoreHTML.text( prevScore + score);

                //  If score is not zero, then some bomb is destructed. Play audio
                if (score !== 0)
                    bombDestructSFX.play();

                tillNextLvl -= score;
                levelUpLogic( prevLevel + 1, levelHTML );

                renderRow( bombRows[row], bombDatas[row] );

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
        showWindow('tutorial');
        buttonHTML.onclick = ()=> {
            menuButtonClickSFX.play();
            transitionGameState( 'in-game' );
        }
    } else if ( mode == 'game-over') {
        gameOverSFX.play();
        showWindow('game-over');
        clearGame( bombRows, bombDatas, intervalObjects, intervalTimes, scoreHTML, levelHTML );
        tillNextLvl = initLevelUpScore;
        buttonHTML.onclick = ()=> {
            windowHTML.classList.add('hidden');
            menuButtonClickSFX.play();
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
        intervalTimes[rowNo] - getRandom(200, 700, true);

    
    intervalObjects[rowNo] = window.setInterval( ()=> {
        if (!addBomb( rowNo, bombRows, bombDatas ) ) {     // At intervals, add a bomb of random color to the row
            transitionGameState( 'game-over' );         // If the bomb added exceeds the limit, then game-over
            return;
        } else {    
            bombSpawnSFX.play();       //  Bomb added so play sfx
        }
    }, newTime);
    intervalTimes[rowNo] = newTime;
}


/* ===================================================================================================
    Level Up Logic

=================================================================================================== */
function levelUpLogic( newLevel, levelHTML ) {
    if (tillNextLvl <= 0) {
        levelUpSFX.play();      //  Play level up SFX

        tillNextLvl = initLevelUpScore + ( newLevel - 2) * 10; //   Update the till next level exp points

        levelHTML.text( newLevel );    //  Render the level text

        //  A random row spawn bombs faster now
        const fasterRow = getRandom(0, 3, true);
        setUpInterval( fasterRow, bombRows, 
            bombDatas, intervalObjects, intervalTimes, initIntervalDuration );

        //  Show the level up message on screen. Pass in the row that gets faster as argument
        showLevelUp( fasterRow + 1 );
    }
}

});












//============================================================
//  Bomb Spawning SFX
//============================================================
const bombSpawnSFX = document.createElement('audio');
bombSpawnSFX.volume = 0.3;
fetch('https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/Bombspawn.wav')
    .then(response => response.blob() )
    .then(blob => {
        const fr = new FileReader();
        fr.onload = ()=> bombSpawnSFX.src = fr.result;
        fr.readAsDataURL(blob);
    });

//============================================================
//  Bomb Destruction SFX
//============================================================
const bombDestructSFX = document.createElement('audio');
bombDestructSFX.volume = 0.15;
fetch('https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/BombDestruct.wav')
    .then(response => response.blob() )
    .then(blob => {
        const fr = new FileReader();
        fr.onload = ()=> bombDestructSFX.src = fr.result;
        fr.readAsDataURL(blob);
    });

//============================================================
//  Level Up SFX
//============================================================   
const levelUpSFX = document.createElement('audio');
levelUpSFX.volume = 0.2;
fetch('https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/Levelup.wav')
    .then(response => response.blob() )
    .then(blob => {
        const fr = new FileReader();
        fr.onload = ()=> levelUpSFX.src = fr.result;
        fr.readAsDataURL(blob);
    });


//============================================================
//  Bomb Button Click SFX
//============================================================   
const bombButtonClickSFX = document.createElement('audio');
bombButtonClickSFX.volume = 0.2;
fetch('https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/ButtonPress.mp3')
    .then(response => response.blob() )
    .then(blob => {
        const fr = new FileReader();
        fr.onload = ()=> bombButtonClickSFX.src = fr.result;
        fr.readAsDataURL(blob);
    });


//============================================================
//  Menu Button Click SFX
//============================================================  
const menuButtonClickSFX = document.createElement('audio');
menuButtonClickSFX.volume = 0.2;
fetch('https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/Notification.mp3')
    .then(response => response.blob() )
    .then(blob => {
        const fr = new FileReader();
        fr.onload = ()=> menuButtonClickSFX.src = fr.result;
        fr.readAsDataURL(blob);
    });


//============================================================
//  Game Over SFX
gameOverSFX = document.createElement('audio');
gameOverSFX.volume = 0.2;
fetch('https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/Gameover.wav')
    .then(response => response.blob() )
    .then(blob => {
        const fr = new FileReader();
        fr.onload = ()=> gameOverSFX.src = fr.result;
        fr.readAsDataURL(blob);
    });


















//===================================================================================================
//  Renders the basic components: Bomb row and bomb panels
//===================================================================================================
function renderBG() {
    const svg = d3.select('svg');

    const enterGroups = svg.selectAll('g')
        .data( [null,null,null] )
        .enter();
    
    //  The Three Bomb Rows
    const rowGroups = enterGroups
        .append('g')
        .attr('class', 'bomb-row')
        .attr('id', (d,i)=> `bomb-row-${i}`)
        .attr('transform', (d,i)=> `translate(0 ${i * 100})`);

    // Apply the SVG for the bomb rows (Background)
    rowGroups.html( bomb_row_svg );


    //  The Three Bomb button panels
    const panelGroups = enterGroups
        .append('g')
        .attr('class', 'bomb-panel')
        .attr('id', (d,i)=> `bomb-panel-${i}`)
        .attr('data-row_no', (d,i)=> i)
        .attr('transform', (d,i)=> `translate(450 ${i * 100})`);

    // Apply the SVG for the bomb panels (Background and buttons)
    panelGroups.html( bomb_panel );  
}


//===================================================================================================
//  Perform general update pattern of D3. enter(), update and exit() on one particular row
//  The argument is a particular bombRow and the bombData for that bombRow
//===================================================================================================
function renderRow( bombRow , bombData ) {
    bombRow = bombRow.selectAll('.bomb-obj')
            .data( bombData, data => data.id );

    //  General Update Pattern - Enter()
    bombRow.enter()
        .append('g')
        .attr('class', 'bomb-obj')
        .html( d => {
            return d.color == 'red'? bomb_red: d.color == 'yellow'? bomb_yellow: bomb_green;
        })
        .attr('transform', (d,i)=> {
            return getTransform(i, 0, true);
        })
        .transition().duration( transitionTime )
        .attr('transform', (d,i) => {
            return getTransform(i, 1, false);
        });
    
    //  General Update Pattern - Update
    //  Note: We cannot use merge() here because transition is asynchronous
    bombRow
        .transition().duration( transitionTime )
        .attr('transform', (d,i) => {
            return getTransform(i, 1, false);
        });

    bombRow.exit()
        .transition().duration( transitionTime )
        .attr('transform', (d,i)=> {
            return getTransform(i, 0, true);
        })
        .remove();
        
}

// ===================================================================================================
//  Shows the window for 'START GAME' or 'GAME OVER'
//===================================================================================================
function showWindow( mode ) {
    const play_gameover_div = document.getElementById('play-gameover');

    const [ title, text, score__title, score__value, level__title, level__value, button ] = play_gameover_div.children;


    //  First remove the hidden class
    //  This function does not add or change Event Listener for the button. 
    play_gameover_div.classList.remove('hidden');

    if (mode === 'tutorial') {
        title.textContent = 'HOW TO PLAY';
        text.innerHTML = String.raw`<li>Bombs will appear at intervals at each row</li>
        <li>Press the buttons to the right to add bombs into the row</li>
        <li>Once the bombs get aligned up in a row of 3, they get destroyed</li>
        <li>You may use <span class='play-gameover__text--color'>Q, W, E, A, S, D, Z, X, C</span> key to play!`;
        score__title.textContent = '';
        score__value.textContent = '';
        level__title.textContent = '';
        level__value.textContent = '';
        button.textContent = 'PLAY >';

    } else if (mode == 'game-over') {
        title.textContent = 'GAME OVER';
        text.innerHTML = '';
        score__title.textContent = 'Final Score:';
        score__value.textContent = document.getElementById('ui__score-value').innerText;
        level__title.textContent = 'Level:';
        level__value.textContent = document.getElementById('ui__level-value').innerText;
        button.textContent = 'CONTINUE >';

    }
}



function showLevelUp( fasterRow ) {
    const levelUpHTML = document.getElementById('level-up');

    const levelMsgHTML = levelUpHTML.children[1];
    levelMsgHTML.innerHTML = `Row <span class='level-up__msg--value'>${fasterRow}</span> is getting faster!`;

    levelUpHTML.classList.remove('hidden');
    
    setTimeout(() => {
        levelUpHTML.classList.remove('init');
        levelUpHTML.classList.add('final');
    }, 50);

    setTimeout( () => {
        levelUpHTML.classList.add('hidden', 'init');
        levelUpHTML.classList.remove('final');
    }, 2000);
}



















//=================================================================
//=================== UTILITIES SECTION ===========================
//=================================================================



// ===================================================================================================
//  Bomb object. Used in the game state array - bombData
// ===================================================================================================
class Bomb {
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
function getTransform(index, scale, isScaling) {
    return `translate( ${ index * 50 + rowMargin + (isScaling? 25: 0) }, ${isScaling? 50: 0}) 
            scale(${scale})`;
}


/* ===================================================================================================
    Custom random number generator

    startInclusive - The lower bound value for random number generation. Inclusive
    endExclusive - The upper bound value for random number generation. Exclusive
    isInteger - Optional. Determines whether value returned is integer or not. Default is false, which returns
                floating point number
=================================================================================================== */
function getRandom( startInclusive, endExclusive, isInteger = false ) {
    let n = Math.random() * (endExclusive - startInclusive) + startInclusive;

    if (isInteger)
        n = Math.floor(n);
    return n;
}

// ===================================================================================================
//  Clear everything, and rerenders the bomb rows
//  Also will clear all interval events (Countdowns)
//  ===================================================================================================
function clearGame( bombRows, bombDatas, intervalObjects, intervalTimes, scoreHTML, levelHTML ) {
    
    scoreHTML.text('0');
    levelHTML.text('1');

    for (let i = 0; i < 3; i++ ) {
        bombDatas[i] = [];
        renderRow( bombRows[i], bombDatas[i] );

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

function addBomb( rowNo, bombRows, bombDatas, color = bombType[ getRandom(0, 3, true) ] ) {
    if (bombDatas[rowNo].length >= 9) {
        return false;
    }
    bombDatas[rowNo].push( new Bomb(color) );

    renderRow( bombRows[rowNo], bombDatas[rowNo] );
    return true;
}





/* ===================================================================================================
    Core game logic of eliminating bombs. It is a pure function which doesn't mutate original array.
    Returns a list:
        index 0: The score obtained after eliminating the bombs
        index 1: The new group after applied the logic
=================================================================================================== */
function applyLogic( bombRow ) {
    
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





























const bomb_row_svg = String.raw`<rect class="bomb-row__wall" fill="#2980B9" width="450" height="100"/>
<rect class="bomb-row__floor" x="19" y="11" fill="#3498DB" width="416" height="80"/>
<g class="bomb-row__border">
	<line fill="none" stroke="#3498DB" stroke-linecap="round" stroke-miterlimit="10" x1="432.891" y1="12.5" x2="450" y2="0"/>
	<line fill="none" stroke="#3498DB" stroke-linecap="round" stroke-miterlimit="10" x1="434.666" y1="90.584" x2="450" y2="100"/>
	<line fill="none" stroke="#3498DB" stroke-linecap="round" stroke-miterlimit="10" x1="19.542" y1="11.458" x2="0" y2="0"/>
	<line fill="none" stroke="#3498DB" stroke-linecap="round" stroke-miterlimit="10" x1="19.5" y1="90.417" x2="0" y2="100"/>
</g>
<g class="bomb-row__arrow">
	<g>
		
			<line fill="none" stroke="#2980b9" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" x1="212.5" y1="77.5" x2="237.5" y2="52.5"/>
		
			<line fill="none" stroke="#2980b9" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" x1="237.5" y1="52.5" x2="212.5" y2="27.5"/>
	</g>
	<g>
		
			<line fill="none" stroke="#2980b9" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" x1="182.5" y1="77.5" x2="207.5" y2="52.5"/>
		
			<line fill="none" stroke="#2980b9" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" x1="207.5" y1="52.5" x2="182.5" y2="27.5"/>
	</g>
	<g>
		
			<line fill="none" stroke="#2980b9" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" x1="242.5" y1="77.5" x2="267.5" y2="52.5"/>
		
			<line fill="none" stroke="#2980b9" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" x1="267.5" y1="52.5" x2="242.5" y2="27.5"/>
	</g>
</g>`;




const bomb_panel = String.raw`<rect class="button__panel__bg" fill="#3498db" width="50" height="100"/>
<g class="bomb__red">
	<path class="button__red2" fill="#C0392B" d="M44,23.5c0,4.142-3.357,7.5-7.5,7.5h-23C9.357,31,6,27.642,6,23.5v-10
		C6,9.358,9.357,6,13.5,6h23c4.143,0,7.5,3.358,7.5,7.5V23.5z"/>
	<g class="button__red--surface">
		<path class="button__red" fill="#E74C3C" d="M44,21.5c0,4.142-3.357,7.5-7.5,7.5h-23C9.357,29,6,25.642,6,21.5v-10
			C6,7.358,9.357,4,13.5,4h23c4.143,0,7.5,3.358,7.5,7.5V21.5z"/>
		<g class="bomb__icon_2_">
			<circle fill="#FFFFFF" cx="24.924" cy="16.291" r="7.299"/>
			<path fill="#FFFFFF" d="M30.362,9.162l-1.031,1.031c0.671,0.442,1.263,0.994,1.755,1.628l0.967-0.968
				C31.585,10.2,31.015,9.629,30.362,9.162z"/>
			<path fill="#FFFFFF" d="M32.363,8.488l-1.085,1.084c0.202,0.174,0.391,0.361,0.571,0.556l1.062-1.061
				C32.731,8.871,32.549,8.677,32.363,8.488z"/>
		</g>
	</g>
</g>
<g class="bomb__yellow">
	<path class="button__orange2" fill="#E67E22" d="M44,56.5c0,4.143-3.357,7.5-7.5,7.5h-23C9.357,64,6,60.643,6,56.5v-10
		c0-4.143,3.357-7.5,7.5-7.5h23c4.143,0,7.5,3.357,7.5,7.5V56.5z"/>
	<g class="button__yellow--surface">
		<path class="button__orange" fill="#F39C12" d="M44,54.5c0,4.143-3.357,7.5-7.5,7.5h-23C9.357,62,6,58.643,6,54.5v-10
			c0-4.143,3.357-7.5,7.5-7.5h23c4.143,0,7.5,3.357,7.5,7.5V54.5z"/>
		<g class="bomb__icon_1_">
			<circle fill="#FFFFFF" cx="24.924" cy="49.291" r="7.299"/>
			<path fill="#FFFFFF" d="M30.362,42.162l-1.031,1.031c0.671,0.442,1.263,0.994,1.755,1.628l0.967-0.968
				C31.585,43.2,31.015,42.629,30.362,42.162z"/>
			<path fill="#FFFFFF" d="M32.363,41.488l-1.085,1.084c0.202,0.174,0.391,0.361,0.571,0.556l1.062-1.061
				C32.731,41.871,32.549,41.677,32.363,41.488z"/>
		</g>
	</g>
</g>
<g class="bomb__green">
	<path class="button__green2" fill="#27AE60" d="M44,90.5c0,4.143-3.357,7.5-7.5,7.5h-23C9.357,98,6,94.643,6,90.5v-10
		c0-4.143,3.357-7.5,7.5-7.5h23c4.143,0,7.5,3.357,7.5,7.5V90.5z"/>
	<g class="button__green--surface">
		<path class="button__green" fill="#2ECC71" d="M44,88.5c0,4.143-3.357,7.5-7.5,7.5h-23C9.357,96,6,92.643,6,88.5v-10
			c0-4.143,3.357-7.5,7.5-7.5h23c4.143,0,7.5,3.357,7.5,7.5V88.5z"/>
		<g class="bomb__icon">
			<circle fill="#FFFFFF" cx="24.924" cy="83.291" r="7.299"/>
			<path fill="#FFFFFF" d="M30.362,76.162l-1.031,1.031c0.671,0.441,1.263,0.994,1.755,1.627l0.967-0.967
				C31.585,77.2,31.015,76.629,30.362,76.162z"/>
			<path fill="#FFFFFF" d="M32.363,75.488l-1.085,1.084c0.202,0.174,0.391,0.36,0.571,0.555l1.062-1.061
				C32.731,75.871,32.549,75.678,32.363,75.488z"/>
		</g>
	</g>
</g>`;



const bomb_green = String.raw`<circle fill="#2ECC71" cx="24.13" cy="50.81" r="23.505"/>
<path fill="#2ECC71" d="M41.64,27.854l-3.32,3.32c2.163,1.425,4.066,3.202,5.65,5.242l3.116-3.116
	C45.58,31.199,43.741,29.36,41.64,27.854z"/>
<path fill="#2ECC71" d="M48.084,25.685l-3.492,3.491c0.647,0.561,1.257,1.162,1.84,1.789l3.417-3.417
	C49.267,26.919,48.682,26.294,48.084,25.685z"/>`;

const bomb_yellow = String.raw`<circle fill="#F1C40F" cx="24.13" cy="50.81" r="23.505"/>
<path fill="#F1C40F" d="M41.64,27.854l-3.32,3.32c2.163,1.425,4.066,3.202,5.65,5.242l3.116-3.116
	C45.58,31.199,43.741,29.36,41.64,27.854z"/>
<path fill="#F1C40F" d="M48.084,25.685l-3.492,3.491c0.647,0.561,1.257,1.162,1.84,1.789l3.417-3.417
	C49.267,26.919,48.682,26.294,48.084,25.685z"/>`;

const bomb_red = String.raw`<circle fill="#E74C3C" cx="24.13" cy="50.81" r="23.505"/>
<path fill="#E74C3C" d="M41.64,27.854l-3.32,3.32c2.163,1.425,4.066,3.202,5.65,5.242l3.116-3.116
	C45.58,31.199,43.741,29.36,41.64,27.854z"/>
<path fill="#E74C3C" d="M48.084,25.685l-3.492,3.491c0.647,0.561,1.257,1.162,1.84,1.789l3.417-3.417
	C49.267,26.919,48.682,26.294,48.084,25.685z"/>`;
