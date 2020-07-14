document.addEventListener('DOMContentLoaded', function() {

    const tooglerWrapper = (function(func) {
        let toogle = true;
        return function() {
            func(toogle);
            toogle = !toogle;
        }
    });

    const target = document.getElementById('targetC-1');

    document.getElementById('btnC-1').addEventListener('click', function() {
        window.alert("The .innerText returns: \n" + target.innerText);
    });

    document.getElementById('btnC-2').addEventListener('click', function() {
        window.alert("The .textContent returns: \n" + target.textContent);
    });

    document.getElementById('btnC-3').addEventListener('click', function() {
        window.alert("The .innerHTML returns: \n" + target.innerHTML);
    });

    document.getElementById('btnC-4').addEventListener('click', function() {
        let str = window.prompt('Enter some text here (maybe some tags aswell?):');
        if (!str) 
            window.alert('Operation cancelled');
        else
            target.innerText = str;
    });

    document.getElementById('btnC-5').addEventListener('click', function() {
        let str = window.prompt('Enter some text here (maybe some tags aswell?):');
        if (!str) 
            window.alert('Operation cancelled');
        else
            target.innerHTML = str;
    });


    const target2 = document.getElementById('targetC-2');

    document.getElementById('btnC-6').addEventListener('click', tooglerWrapper(
        function(toogle) {
            target2.disabled = toogle;
        }
    ) );

    document.getElementById('btnC-7').addEventListener('click', tooglerWrapper(
        function(toogle) {
            target2.style.background = (toogle)? 'linear-gradient(to left,violet, indigo, blue, green, yellow, orange, red)':'red';
        }
    ) );

});