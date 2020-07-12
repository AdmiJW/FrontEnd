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
        removebutton.addEventListener('click', removeListItem );

        li.appendChild( document.createTextNode(innerText) );
        li.appendChild( removebutton);

        return li;
    }


    //Handler function to handle when the remove list item button is clicked. Creates a fading out animation then
    //Removes the element itself
    function removeListItem(e) {
        let parent = e.target.parentNode;
        let interval = setInterval(frame, 5);
        let px = 0;

        function frame() {
            if (parent.style.opacity < 0) {
                clearInterval(interval);
                parent.remove();
            }
            else {
                parent.style.transform = `translateX(${px}px)`;
                parent.style.opacity = 1 + px / 200;
                px -= 2;
            }
        }
    }


    //----------------------------------------------------------
    //ADDING EVENT LISTENERS
    //----------------------------------------------------------
    
    document.getElementById('add-item-button').addEventListener('click', appendList);
    document.getElementById('add-item-field').addEventListener('keyup', function(e) {
        if (e.keyCode == 13) appendList();
    });
    //Here is example of usage of self invoking function, where the search box is hidden from outside script
    //Actually not too practical and should've use the event argument with .target instead to select searchbox.
    document.getElementById('search-box').addEventListener('keyup', ( function(e) {
        let searchbox = document.getElementById('search-box');
        return function(e) {
            console.log(e);
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