document.addEventListener('DOMContentLoaded', ()=> {

let currentslide = 0;   //  Current displaying slide
const MAXSLIDE = 2;     //  Total number of slides, 0 index based
const TIMER = 10000;    //  Slideshow timer

const slides = document.querySelectorAll('.slide');
const selectors = document.querySelectorAll('.selector-option');

let interval = window.setInterval( ()=> {       //The interval object that can be used on removeInterval
    document.getElementById('btn-right').click();
}, TIMER);     

applyLeftDisplacement(currentslide);

//  Object showing if any of the stuff is being focused, which stops the slideshow
const focusState = {
    isMouseInside: false,
    isSelectorFocus: false,
    isButtonFocus: false
}

//========================================================================
//      FUNCTIONS
//=========================================================================

//  Checks the focus state. If any thing is being focused, will remove the slideshow.
function checkFocus() {
    const { isMouseInside, isSelectorFocus, isButtonFocus } = focusState;

    //  If nothing is being focused, then resume the slideshow
    if ( !(isMouseInside || isSelectorFocus || isButtonFocus) ) {
        resumeSlideshow();
    }
    //  Something is being focused. If the interval is not empty, remove the slideshow
    else if ( interval ) {
        removeSlideshow();
    }
}


//  Removes the interval and set interval to null
function removeSlideshow() {
    if (interval) {
        window.clearInterval( interval);
        interval = null;
    }
}

//  Set up the interval
function resumeSlideshow() {
    if ( !interval) {
        interval = window.setInterval( ()=> {
            document.getElementById('btn-right').click();
        }, TIMER);
    }
}

//  Based on currentSlide number ( 0, 1, 2...), will apply the appropriate left property to each slides
//  Will also add the .selected class to the respective selector, so it will look darker
//  Also, the slides itself will also be applied the .selected class so the text will fade in and show
function applyLeftDisplacement(currentslide) {
    let percent = -100 * currentslide;
    slides.forEach( (slide, idx) => {
        const classList = slide.classList;

        if (idx == currentslide) classList.add('selected');
        else classList.remove('selected');

        slide.style.left = `${percent}%`;
        percent += 100;
    });

    selectors.forEach( (selector, idx) => {
        const classList = selector.classList;
        if (currentslide == idx)
            classList.add('selected');
        else
            classList.remove('selected');
    });
}


//========================================================================
//      DOM Manipulation
//=========================================================================


//  When the mouse is in the slides, stop the slideshow.
//  When the mouse exits, then resume the slideshow
slides.forEach( (slide) => {

    slide.addEventListener('mouseenter', ()=> {
        focusState.isMouseInside = true;
        checkFocus();
    });

    slide.addEventListener('touchstart', ()=> {
        focusState.isMouseInside = true;
        checkFocus();
    });

    slide.addEventListener('mouseleave', () => {
        focusState.isMouseInside = false;
        checkFocus();
    });

});


//  LEFT BUTTON. Will decrement the currentslide (unless is already 0, then skip to upper bound)
const leftBtn = document.getElementById('btn-left');
leftBtn.addEventListener('click', ()=> {
    if (currentslide == 0) currentslide = MAXSLIDE;
    else currentslide --;

    applyLeftDisplacement(currentslide);
});
leftBtn.addEventListener('focus', ()=> {
    focusState.isButtonFocus = true;
    checkFocus();
});
leftBtn.addEventListener('blur', ()=> {
    focusState.isButtonFocus = false;
    checkFocus();
});


//  RIGHT BUTTON. Will decrement the currentslide (unless is already 0, then skip to upper bound)
const rightBtn = document.getElementById('btn-right');
rightBtn.addEventListener('click', ()=> {
    if (currentslide == MAXSLIDE) currentslide = 0;
    else currentslide ++;
    
    applyLeftDisplacement(currentslide);
});
rightBtn.addEventListener('focus', ()=> {
    focusState.isButtonFocus = true;
    checkFocus();
});
rightBtn.addEventListener('blur', ()=> {
    focusState.isButtonFocus = false;
    checkFocus();
});


//  SELECTORS
selectors.forEach( (selector, idx) => {
    selector.addEventListener('focus', ()=> {
        currentslide = idx;
        applyLeftDisplacement(currentslide);

        focusState.isSelectorFocus = true;
        checkFocus();
    })

    //  When the selector is blurred, resume the slideshow
    selector.addEventListener('blur', ()=> {
        focusState.isSelectorFocus = false;
        checkFocus();
    });
});





});