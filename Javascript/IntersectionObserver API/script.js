/*
    Intersection Observer is an awesome API which helps us to detect whether an element is intersecting with
    the viewport (Browser window). Although the same can be achieved using document Scroll event listener,
    Intersection Observer is much more efficient as it is not fired every time the docuement scrolls. It is fired
    only when the element DOES intersect, or exited the viewport

    //======    INITIALIZATION  ============//
    Later, when initializing the Intersection Observer, we will need to pass in an Object of Options.
    We can set the following options:

    >   root            (The root element used for observation, the 'capturing frame' of our Intersection Observer.
                        by default, it is set to our viewport if not specified otherwise)
    >   rootMargin      (Will set a margin around out root element or 'capturing frame'. It will shrink or expand our
                        capturing frame (One way to think about it is the margin is part of the capturing frame) )
                        Eg:     150px 20px 20px 20px will EXPAND the capturing frame to 150px above our window,
                                and 20px on other sides
                        Eg:     -150px -20px -20px -20px will SHRINK the capturing frame by 150px from the top of
                                browser window, and 20px on other sides
                        Note:   Only px and % units are allowed
    >   threshold       (How many percent of the observed element shall be inside the capturing frame to consider
                        it as intersecting. Takes decimal between 0 to 1 as value.)
                        Eg:     0 - As long as any pixel intersect, it will fire
                        Eg:     0.5 - When 50% of observed element intersects, it will fire
                        Eg:     [0, 0.2, 0.5, 1] - Will fire once for each case

    //========  USING ======================//
    Now with the options set up, we can create an Intersection Observer by following:

    const myObserver = new IntersectionObserver( callback, options);

    where the options is the JSON object we just talked about.
    The callback is a function that takes in 2 parameters:
        entries -   A list of IntersectionObserverEntry objects which represent 1 individual element being observed
        SELF    -   We just pass in the myObserver (The Intersection Observer we created), so it can be called
                    when we want to perform unobserve()

    Each intersectionObserverEntry contains their own properties regarding the information of the observed element
    itself, especially the 3 rectangles:
    >   rootBounds              (The rectangle representing the root or capturing frame)
    >   boundingClientRect      (The rectangle representing the area of observed element)
    >   intersectionRect        (The rectangle representing the area of observed element which intersects the 
                                root or capturing frame)
    
    Then, we have several convenient properties which we can access to determine some actions:
    >   isIntersecting          (Boolean value which tells us whether the element is intersecting with root)
    >   intersectionRatio       (Returns the ratio of intersection with the root (0 - 1) )
    >   target                  (The original HTML element we are observing)
    >   disconnect()            (Disconnects the element from observer, like myObserver.unobserve(HTMLElem) )
                    
    
    Therefore, in the callback function (Remember of the parameters - entries, and SELF),
    we can access each individual IntersectionObserverEntry object using forEach loop, and access their properties like
    so:

    const observer = new IntersectionObserver( (entries, observer) => {
        entries.forEach( entry => {
            if (entry.isIntersecting) {
                console.log(entry.target);
            }
        });
    }, observerOptions);

    This will cause the observed elements to get logged into the console everytime it intersects with the root

    Lastly, don't remember to add elements into the observer by calling:

        observer.observe( HTMLELEMENTS );

*/





document.addEventListener('DOMContentLoaded', ()=> {

const nav = document.querySelector('#nav');
const header = document.querySelector('#header');
const toogleMenu = document.querySelector('#toogle-menu-btn');

toogleMenu.addEventListener('click', ()=> {
    nav.classList.toggle("open");
    toogleMenu.classList.toggle('fa-times');
});

//  Intersection Observer for the header ============================//
const navObserverOptions = {
    threshold: 0.3
}
const navObserver = new IntersectionObserver( function(entries, navObserver) {
    entries.forEach( entry => {
        if (entry.isIntersecting) {
            header.classList.remove('out-hero');
        } else {
            header.classList.add('out-hero');
        }
    });
}, navObserverOptions);
navObserver.observe( document.querySelector('#hero') );
//=========================================================================




//  Intersection Observer for the sections ==============================//
const sectionObserverOptions = {
    threshold: 0.6
}
const sectionObserver = new IntersectionObserver( (entries, sectionObserver) => {
    entries.forEach( entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('out-screen');
            
            sectionObserver.unobserve(entry.target);
        }
    });
}, sectionObserverOptions);

const sections = document.querySelectorAll('.section');
sections.forEach( section => {
    sectionObserver.observe(section);
});

//======================================================================//

});