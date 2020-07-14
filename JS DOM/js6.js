document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('textF-1').addEventListener('keyup', function(e) {
        let str = e.target.value;
        if (!str)
            str = 'Text goes here...';
        document.getElementById('targetF-1').innerText = str;

        document.getElementById('targetF-2').innerText = `You typed key ${e.key} of keycode ${e.keyCode}`;
    });


    const div = document.getElementById('divF-1');
    let enter = 1;
    let leave = 1;
    let over = 1;
    let out = 1;
    div.addEventListener('mouseenter', function() {
        document.getElementById('targetF-3').innerText = 'Mouse Enter triggered: ' + enter;
        enter ++;
    });
    div.addEventListener('mouseleave', function() {
        document.getElementById('targetF-4').innerText = 'Mouse Leave triggered: ' + leave;
        leave ++;
    });
    div.addEventListener('mouseover', function() {
        document.getElementById('targetF-5').innerText = 'Mouse Over triggered:' + over;
        over ++;
    });
    div.addEventListener('mouseout', function() {
        document.getElementById('targetF-6').innerText = 'Mouse Out triggered:' + out;
        out ++;
    });

});