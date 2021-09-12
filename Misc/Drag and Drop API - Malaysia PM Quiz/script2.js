
// Like script.js, but difference in Drag n Drop implementation

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


//===========================================================
// Drag and Drop API - Handling Events
//===========================================================
// On drag, the draggable element will be removed from the list item.
// On entering a drop target, the draggable element inside will move to the empty one, thus creating a swapping effect
// even if the dragged element haven't been dropped
// On drop, only then the dragged element will be inserted to the empty one
let currentlyDragged = null;
let currentlyDraggedParent = null;

function addEventsToDraggable(draggable) {
    draggable.addEventListener('dragstart', function() {
        currentlyDraggedParent = this.closest('.list-item');
        currentlyDragged = this;
        this.classList.add('hover');
    });
    draggable.addEventListener('dragend', function() {
        this.classList.remove('hover');
    });
}

function addEventsToDropTarget(dropTarget) {
    dropTarget.addEventListener('dragenter', function(e) {
        const parent1 = this.closest('.list-item');
        const parent2 = currentlyDraggedParent;
        parent2.appendChild(this);
        parent1.appendChild(currentlyDragged);
        currentlyDraggedParent = parent1;
    });
    dropTarget.addEventListener('dragover', (e)=> e.preventDefault() );
    dropTarget.addEventListener('drop', function() {
        currentlyDragged = null;
        currentlyDraggedParent = null;
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