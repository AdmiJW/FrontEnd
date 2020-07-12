document.addEventListener('DOMContentLoaded', function() {  

    //Handler function called when Add! button is clicked to insert a new list item, also clears the text field
    function appendList() {
        let txtfield = document.getElementById('add-item-field');
        if (txtfield.value.trim() == '') return;

        let li = createListItem( txtfield.value );
        txtfield.value = "";

        document.getElementById('items-list').appendChild(li);
    }
    //Helper function to help appendList() create a new list item
    function createListItem(innerText) {
        let li = document.createElement('li');
        
        let removebutton = document.createElement('button');
        removebutton.className = 'remove-button';
        removebutton.appendChild( document.createTextNode('X') );
        removebutton.addEventListener('click', (e) => e.target.parentNode.remove() );

        li.appendChild( document.createTextNode(innerText) );
        li.appendChild( removebutton);

        return li;
    }

   
    document.getElementById('add-item-button').addEventListener('click', appendList);
    document.getElementById('add-item-field').addEventListener('keyup', function(e) {
        if (e.keyCode == 13) appendList();
    });
    document.getElementById('search-box').addEventListener('keyup', ( function() {
        let searchbox = document.getElementById('search-box');
        return function() {
            let liitems = document.getElementsByTagName('li');
            let regex = new RegExp( searchbox.value, 'ig' );

            for (li of liitems) {
                if (regex.test(li.childNodes[0].nodeValue) )
                    li.style.display = 'flex';
                else
                    li.style.display = 'none';
            }
        }
        } )() );


});