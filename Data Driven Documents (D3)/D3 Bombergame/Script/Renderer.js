
import { bomb_red, bomb_yellow, bomb_green, bomb_panel, bomb_row_svg } from './svg.js';
import * as Util from './Utilities.js';
import * as Main from './script.js';

//===================================================================================================
//  Renders the basic components: Bomb row and bomb panels
//===================================================================================================
export function renderBG() {
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
export function renderRow( bombRow , bombData ) {
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
            return Util.getTransform(i, 0, true);
        })
        .transition().duration( Main.transitionTime )
        .attr('transform', (d,i) => {
            return Util.getTransform(i, 1, false);
        });
    
    //  General Update Pattern - Update
    //  Note: We cannot use merge() here because transition is asynchronous
    bombRow
        .transition().duration( Main.transitionTime )
        .attr('transform', (d,i) => {
            return Util.getTransform(i, 1, false);
        });

    bombRow.exit()
        .transition().duration( Main.transitionTime )
        .attr('transform', (d,i)=> {
            return Util.getTransform(i, 0, true);
        })
        .remove();
        
}

// ===================================================================================================
//  Shows the window for 'START GAME' or 'GAME OVER'
//===================================================================================================
export function showWindow( mode ) {
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




export function showLevelUp( fasterRow ) {
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

