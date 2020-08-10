import formFunc from 'http://127.0.0.1:5500/formFunctions.js';

/*
    Session storage unlike Local storage (which stores forever), it gets deleted as soon as the
    tab is closed

    SessionStorage has similar syntax to local Storage, just use sessionStorage instead of localStorage
*/


document.addEventListener('DOMContentLoaded', ()=> {

    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (e.submitter == document.getElementById('sv-ss') ) {
            const info = formFunc.obtainInfo();

            for (let key in info ) {
                sessionStorage.setItem(key, info[key] );
            }

            formFunc.clearForm();
            alert('Session Storage successfully set ' + JSON.stringify(info) );
        }
    });

    document.getElementById('ld-ss').addEventListener('click', () => {
        const keys = formFunc.obtainKeys();

        for (let i = 0; i < keys.length; i ++ ) {
            if (!sessionStorage.getItem(keys[i] ) ) {
                alert(`No key of ${ keys[i] } is found!!!`);
                return;
            }
            keys[i] = sessionStorage.getItem(keys[i]);
        }
        
        formFunc.setInfo( ...keys );
        alert('Successfully loaded from Session Storage');
    })

    document.getElementById('del-ss').addEventListener('click', () => {
        const keys = formFunc.obtainKeys();

        keys.forEach(e => sessionStorage.removeItem(e) );
        alert('Successfully cleared Session Storage');
    })


});