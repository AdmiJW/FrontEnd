
const ul = document.querySelector('.list');
const checkAnswerButton = document.querySelector('.button');
const result = document.querySelector('.result');

const years = [
    '1957-1970',
    '1970-1976',
    '1976-1981',
    '1981-2003',
    '2003-2009',
    '2009-2018',
    '2018-2020',
    '2020-2021',
    '2021-Present'
];
const primeMinisters = [
    'Tunku Abdul Rahman',
    'Abdul Razak Hussein',
    'Hussein Onn',
    'Mahathir Mohamad (1st)',
    'Abdullah Ahmad Badawi',
    'Mohd Najib Abdul Razak',
    'Mahathir Mohamad (2nd)',
    'Muhyiddin Yassin',
    'Ismail Sabri Yaakob'
];
const listItems = [];


// Observation notes on Events:
// 
//  EVENTS FIRED ON DRAGGABLE ELEMENTS
//  1. drag - Fired every milliseconds interval.
//  2. dragend - Fired once when the dragging stops (Mouse release or Esc key)
//  3. dragstart - Fired once when the dragging starts
// 
//  EVENTS FIRED ON DROP TARGETS
//  1. dragenter - Fired once when the draggable enters the drop target.
//  2. dragleave - Fired once when the draggable leaves the drop target.
//  3. dragover - Fired every milliseconds interval. Fires whenever the draggable target is inside the drop target.
//  4. drop - Fired when the draggable is released on the drop target
//
//  NOTE:
//      When giving event listeners, if we use regular function instead of arrow function, we have access to 'this', which
//      is the draggable or drop target. Very convenient!
//
//      By default, HTML elements will not be droppable target, which if the target is dropped on it, will
//      be cancelled (You can also see when you drag over them, your mouse is a CANCEL sign).
//      To allow an element to be droppable, we must AT LEAST call e.preventDefault() on the dragover event.
//
//===========================================================
// Drag and Drop API - Handling Events
//===========================================================
let currentlyDragged = null;

function addEventsToDraggable(draggable) {
    draggable.addEventListener('dragstart', function() {
        currentlyDragged = this;
    });
}

function addEventsToDropTarget(dropTarget) {
    dropTarget.addEventListener('dragenter', function(e) {
        this.classList.add('hover');
    });
    dropTarget.addEventListener('dragleave', function() {
        this.classList.remove('hover');
    });
    dropTarget.addEventListener('dragover', (e)=> e.preventDefault() );
    dropTarget.addEventListener('drop', function() {
        this.classList.remove('hover');
        
        // Swap the DraggablePMElements.
        // closest() will take in a query selector and searches for closest matching ancestor
        const parent1 = currentlyDragged.closest('.list-item');
        const parent2 = this.closest('.list-item');
        parent1.appendChild(this);
        parent2.appendChild(currentlyDragged);
        currentlyDragged = null;
    });
}


//=============================================================================================
// Initializes the list with the years in same order as years array, but the names are shuffled
//=============================================================================================
function initializeList() {
    // Helper methods to obtain the list item node
    const getDraggablePMElement = (name)=> {
        const draggable = document.createElement('div');
        draggable.classList.add('draggable', 'list-draggable');
        draggable.setAttribute('draggable', 'true');
        draggable.innerText = name;
        return draggable;
    };
    const getYearSpanElement = (year)=> {
        const span = document.createElement('span');
        span.classList.add('list-label');
        span.innerText = year;
        return span;
    }
    const packListItem = (yearElement, nameElement)=> {
        const li = document.createElement('li');
        li.classList.add('list-item');
        li.appendChild(yearElement);
        li.appendChild(nameElement);
        return li;
    }

    // Construction of the list items
    const yearElements = years.map((y)=> getYearSpanElement(y));
    const draggablePMElements = primeMinisters.map((pm)=> getDraggablePMElement(pm));
    // Shuffle
    draggablePMElements.sort(()=> Math.random() - Math.random() );
    // Combine the year and PMName into one li element, append to ul and the listItems array
    // Also, remember to apply the drag and drop events to the draggableElements
    for (let i = 0; i < yearElements.length; ++i) {
        const listItem = packListItem( yearElements[i], draggablePMElements[i] );
        listItems.push( listItem );
        ul.appendChild( listItem );

        addEventsToDraggable(draggablePMElements[i]);
        addEventsToDropTarget(draggablePMElements[i]);
    }
}


function checkAnswers() {
    let score = 0;

    listItems.forEach((li, index)=> {
        const primeMinisterElement = li.querySelector('.list-draggable');
        const isCorrect = primeMinisterElement.innerText === primeMinisters[index];
        
        // Clear any stylings if present
        primeMinisterElement.classList.remove('correct', 'wrong', 'hover');
        primeMinisterElement.classList.add( isCorrect? 'correct': 'wrong');
        score += isCorrect? 1: 0;
    });

    result.innerText = `You get ${score}/${primeMinisters.length} correct!`;
}



initializeList();
checkAnswerButton.addEventListener('click', checkAnswers);




// Note that the Drag and Drop API so far only works on devices that has a pointer (Mouse).
// Therefore it is likely that the API don't work on mobile devices which rely on touch events
if (navigator.userAgentData.mobile) {
    alert("Note: Without external library, Drag and Drop API is incompatible on mobile devices which rely on touch events!");
}