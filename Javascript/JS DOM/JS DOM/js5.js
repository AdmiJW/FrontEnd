document.addEventListener('DOMContentLoaded', function() {

    const textfield = document.getElementById('textE-1');
    const target = document.getElementById('targetE-1');

    const tooglerWrapper = (function(func) {
        let toogle = true;
        return function() {
            func(toogle);
            toogle = !toogle;
        }
    });

    function addLiItem() {
        let str = textfield.value;
        if (!str) return;
        textfield.value = '';

        const txtnode = document.createTextNode(str);
        const liitem = document.createElement('li');
        liitem.appendChild(txtnode);

        target.appendChild(liitem);
    }

    document.getElementById('btnE-1').addEventListener('click', addLiItem);
    textfield.addEventListener('keyup', function(e) {
        if (e.keyCode == 13) addLiItem();
    });


    document.getElementById('btnE-2').addEventListener('click', function() {
        const lastli = target.lastElementChild;
        if (lastli != null) {
            target.lastElementChild.remove();
        }
    });

    
    document.getElementById('btnE-3').addEventListener('click', function() {
        const str = textfield.value;
        if (!str) return;
        textfield.value = '';

        for (child of target.children) {
            child.innerText = str;
        }
    });

    document.getElementById('btnE-4').addEventListener('click', tooglerWrapper(
        function(toogle) {
            for (child of target.children) {
                child.className = (toogle)? 'style-list': '';
            }
        }
    ) );

});