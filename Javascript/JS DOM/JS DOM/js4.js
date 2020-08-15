document.addEventListener('DOMContentLoaded', function() {

    const target = document.getElementById('target');

    const tooglerWrapper = (function(func) {
        let toogle = true;
        return function() {
            func(toogle);
            toogle = !toogle;
        }
    });

    document.getElementById('btnD-1').addEventListener('click', (function () {
        const color = target.parentElement.style.backgroundColor;
        return tooglerWrapper( function(toogle) {
            target.parentElement.style.backgroundColor = (toogle)? 'black': color;
            target.parentElement.style.color = (toogle)? 'white': 'initial';
        });
    })() );

    document.getElementById('btnD-2').addEventListener('click', (function () {
        const color = target.children[0].style.backgroundColor;
        return tooglerWrapper( function(toogle) {
            for (child of target.children) {
                child.style.backgroundColor = (toogle)? 'black': color;
                child.style.color = (toogle)? 'white': 'initial';
            }
        });
    })() );

    document.getElementById('btnD-3').addEventListener('click', (function () {
        const color = target.firstElementChild.style.backgroundColor;
        return tooglerWrapper( function(toogle) {
                target.firstElementChild.style.backgroundColor = (toogle)? 'black': color;
                target.firstElementChild.style.color = (toogle)? 'white': 'initial';
        });
    })() );

    document.getElementById('btnD-4').addEventListener('click', (function () {
        const color = target.lastElementChild.style.backgroundColor;
        return tooglerWrapper( function(toogle) {
                target.lastElementChild.style.backgroundColor = (toogle)? 'black': color;
                target.lastElementChild.style.color = (toogle)? 'white': 'initial';
        });
    })() );

    document.getElementById('btnD-5').addEventListener('click', (function () {
        const color = target.nextElementSibling.style.backgroundColor;
        return tooglerWrapper( function(toogle) {
                target.nextElementSibling.style.backgroundColor = (toogle)? 'black': color;
                target.nextElementSibling.style.color = (toogle)? 'white': 'initial';
        });
    })() );

    document.getElementById('btnD-6').addEventListener('click', (function () {
        const color = target.previousElementSibling.style.backgroundColor;
        return tooglerWrapper( function(toogle) {
                target.previousElementSibling.style.backgroundColor = (toogle)? 'black': color;
                target.previousElementSibling.style.color = (toogle)? 'white': 'initial';
        });
    })() );



});