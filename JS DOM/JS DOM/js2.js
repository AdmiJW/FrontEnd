document.addEventListener('DOMContentLoaded', function() {

    //Take in a function which has boolean parameter representing toogle state. It will store private variable toogle and pass it into the passed
    //function every time button is clicked, and switches the toogle boolean.
    const tooglerWrapper = (function(func) {
        let toogle = true;
        return function() {
            func(toogle);
            toogle = !toogle;
        }
    });

    function btn1(toogle) {
        const btn = document.getElementById('btnB-1');
        btn.className = (toogle)? 'btn btn-lg btn-success btn-block btnB': 'btn btn-primary btnB';
        btn.innerText = (toogle)? 'Successfully selected and changed': 'Test';
    }
    document.getElementById('btnB-1').addEventListener('click', tooglerWrapper(btn1) );

    
    
    function btn2(toogle) {
        const btns = document.getElementsByClassName('btnB');
        for (btn of btns) {
            btn.className = (toogle)? 'btn btn-lg btn-success btn-block btnB': 'btn btn-primary btnB';
            btn.innerText = (toogle)? 'Successfully selected and changed': 'Test';
        }
    }
    document.getElementById('btnB-2').addEventListener('click', tooglerWrapper(btn2) );


    function btn3(toogle) {
        const h2s = document.getElementsByTagName('h2');
        for (h2 of h2s) {
            h2.style.fontSize = (toogle)? '4rem': '2rem';
            h2.style.background = (toogle)? 'linear-gradient(to left,violet, indigo, blue, green, yellow, orange, red)':'rgba(0,0,0,0)';
            h2.style.color = (toogle)? 'white': 'rgb(255, 144, 103)';
        }
    }
    document.getElementById('btnB-3').addEventListener('click', tooglerWrapper(btn3) );


    function btn4 (toogle) {
        const disList = document.querySelector('ul:nth-child(3)');
        for (child of disList.children) {
            child.style.backgroundColor = (toogle)? '#2c3e50': 'inherit';
            child.style.color = (toogle)? 'white': 'inherit';
        }
        toogle = !toogle;
    }
    document.getElementById('btnB-4').addEventListener('click', tooglerWrapper(btn4) );


    function btn5(toogle) {
        const liList = document.querySelectorAll('.spec-list li, .exp');
        for (child of liList) {
            child.style.backgroundColor = (toogle)? '#2c3e50': 'inherit';
            child.style.color = (toogle)? 'white': 'inherit';
        }
        toogle = !toogle;
    }
    document.getElementById('btnB-5').addEventListener('click', tooglerWrapper(btn5) );
});