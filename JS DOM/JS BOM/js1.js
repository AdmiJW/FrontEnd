document.addEventListener('DOMContentLoaded', function() {

    /* ALL SHOW CODE ONLY BUTTONS -------------------------- */

    const toogleOnce = (function(func) {
        let toogle = false;
        return function(e) {
            if (!toogle) {
                func(e);
                toogle = true;
            }
        }
    });

    const toogleWrapper = (function(func) {
        let toogler = true;
        return function() {
            func(toogler);
            toogler = !toogler;
        }
    });

    function showCodeOnly(e) {
        const code = e.target.parentElement.previousElementSibling.children[0].innerText;
        const text = document.createTextNode( eval(code) );
        e.target.parentElement.appendChild(text);
    }
    for (elem of document.getElementsByClassName('show-code-only') ) {
        elem.addEventListener('click', toogleOnce(showCodeOnly) );
    }

    //-------------------------------------------------------------------


    // SECTION 1 ---------------------------------------------------------

    let openedwindow;
    document.getElementById('btnA-3').addEventListener('click', function() {
        openedwindow = window.open();
    });
    document.getElementById('btnA-3.1').addEventListener('click', function() {
        openedwindow = window.open('https://www.google.com');
    });
    
    document.getElementById('btnA-4').addEventListener('click', function() {
        openedwindow.close();
    });


    let newWin;
    document.getElementById('btnA-5').addEventListener('click', function() {
        newWin = window.open('', 'Opened Window', 'top=200, left=100, width=500, height=500');
    });
    function moveTo(toogle) {
        if (toogle)
            newWin.moveTo(500,500);
        else   
            newWin.moveTo(0,0);
        newWin.focus();
    }
    document.getElementById('btnA-5.1').addEventListener('click', toogleWrapper(moveTo) );


    document.getElementById('btnA-6').addEventListener('click', function() {
        newWin = window.open('', 'Opened Window', 'top=200, left=100, width=500, height=500');
    });
    function resizeTo(toogle) {
        if (toogle)
            newWin.resizeTo(200,200);
        else
            newWin.resizeTo(500,500);
        newWin.focus();
    }
    document.getElementById('btnA-6.1').addEventListener('click', toogleWrapper(resizeTo) );


    document.getElementById('btnA-7').addEventListener('click', function() {
        const txt = document.getElementById('textA-1').value;
        if (txt)
            window.alert(txt);
        else
            window.alert('Please enter some text!');
    });


    document.getElementById('btnA-8').addEventListener('click', function() {
        if ( window.confirm('Will you marry me?') )
            document.getElementById('targetA-1').innerText = 'HE SAID YES!!!!!';
        else
            document.getElementById('targetA-1').innerText = 'NOOOO I AM FEELING DOWN';
    });

    document.getElementById('btnA-9').addEventListener('click', function() {
        let txt = window.prompt('Enter your name!');
        txt = txt? txt: 'Whoever you are';
        let now = new Date().getHours();
        let greet;
        if (now >= 19 || now <= 4) greet = 'Night';
        else if (now >= 17) greet = 'Evening';
        else if (now >= 12) greet = 'Afternoon';
        else greet = 'Morning';
        document.getElementById('targetA-2').innerText = `Hello and Good ${greet}! ${txt}!`
    });


    let timeoutObj;
    let countdown;
    const img = document.createElement('img');
    img.src = 'https://thumbs.gfycat.com/SoulfulShamelessIrishterrier-size_restricted.gif';
    img.style.position = 'absolute';
    img.style.width = '100%';
    img.style.height = 'auto';

    document.getElementById('btnA-10').addEventListener('click', function() {
        if (!timeoutObj) {
            const status = document.getElementById('statusA-1');
            let timeleft = 3000;

            timeoutObj = setTimeout(function() {
                clearInterval(countdown);
                timeoutObj = null;

                const body = document.documentElement.children[1];
                document.documentElement.replaceChild( img, body);
            }, 3000);
            countdown = setInterval(function() {
                timeleft -= 10;
                status.innerText = `Time Left till Detonate: ${timeleft / 1000}`;
            }, 10);
        }
    });

    document.getElementById('btnA-11').addEventListener('click', function() {
        if (timeoutObj) {
            clearTimeout(timeoutObj);
            timeoutObj = null;
            clearInterval(countdown);
            document.getElementById('statusA-1').innerText = 'The bomb has been defused';
        }
    });


    let intervalObj;
    document.getElementById('btnA-12').addEventListener('click', function() {
        if (!intervalObj) {
            const status = document.getElementById('statusA-2');
            let timeleft = 3000;
            intervalObj = setInterval(function() {
                timeleft -= 10;
                status.innerText = `Time left until next execution: ${timeleft / 1000}`;
                if (timeleft <= 0) {
                    timeleft = 3000;
                    alert("Would you like to buy my product?");
                }
            }, 10);
        }
    });
    document.getElementById('btnA-13').addEventListener('click', function() {
        if (intervalObj) {
            clearInterval(intervalObj);
            intervalObj = null;
            document.getElementById('statusA-2').innerText = 'Alright I will not sell you my product';
        }
    });


    // SECTION LOCATION -----------------------------------------------------------

    document.getElementById('btnC-6').addEventListener('click', function() {
        window.location.assign('https://www.google.com');
    });


    // HISTORY SECTION ---------------------------------------------------------------

    document.getElementById('btnD-1').addEventListener('click', function() {
        window.history.back();
    });
    document.getElementById('btnD-2').addEventListener('click', function() {
        window.history.forward();
    });

    // NAVIGATOR SECTION -------------------------------------------------------------

    function javaenable(e) {
        const txt = document.createTextNode( window.navigator.javaEnabled() );
        e.target.parentElement.appendChild(txt);
    }
    document.getElementById('btnE-10').addEventListener('click', toogleOnce(javaenable) );

});