import formFunc from 'http://127.0.0.1:5500/formFunctions.js';


document.addEventListener('DOMContentLoaded', () => {

    //  Write into cookies
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (e.submitter == document.getElementById('sv-cookie') ) {
            const info = formFunc.obtainInfo();

            // Sets the expiry to be 1 month from now
            // 1 Month * 31 Days * 24 Hr * 60 Min * 60 sec * 1000 ms
            let expiry = 1 * 31 * 24 * 60 * 60 * 1000;

            // Uses JSON stringify to store the user info into a JSON object
            let cookie = 'Userinfo=' + JSON.stringify(info) + ';';

            // Add the expires and path attribute. Note that Date.now() returns milliseconds since 1970,
            // and new Date() will be able to parse that back into proper Date Format. However, expires
            // only take in UTC format so use .toUTCString() method
            let fullcookie = cookie + 'expires=' + new Date(Date.now() + expiry ).toUTCString() + '; path=/';

            document.cookie = fullcookie;

            formFunc.clearForm();
            alert('Cookies successfully set as ' + fullcookie);
        }
    });

    document.getElementById('ld-cookie').addEventListener('click', (e) => {
        // When accessing cookie, they will be bunched in a single string seperated by semicolon (and a space)
        // Therefore split them into seperate parts
        let cookies = document.cookie.split(';');
        
        //  First, since cookies splitten may have spaces, trim them, then find the correct cookie
        let info = cookies.map(e => e.trim() ).filter(e => e.startsWith('Userinfo') );

        //  The cookie is not found
        if (info.length == 0) 
            alert('No such cookie in the storage! Have you click Save To Cookie already?');
        //  The cookie is found
        else {
            //  Extract info using destructuring expression. Remember info is still an array, and we need to split
            //  the key and the value
            const { firstName, lastName, gender, email, note } = JSON.parse( info[0].split('=')[1] );
            formFunc.setInfo( firstName, lastName, gender, email, note );
            alert('Successfully loaded from Cookies');
        }
    });

    //  Delete cookie by setting the expiry to very earlier date, and nothing in the cookie key value itself
    document.getElementById('del-cookie').addEventListener('click', () => {
        document.cookie = `Userinfo=; expires=${new Date(0).toUTCString()}, path=/`;
        alert('Cookies successfully deleted.')
    });

});



