import formFunc from 'http://127.0.0.1:5500/formFunctions.js';


document.addEventListener('DOMContentLoaded', ()=> {

    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (e.submitter == document.getElementById('sv-ls') ) {
            const info = formFunc.obtainInfo();

            //  Simply use localStorage.setItem(key, value) method to set the key and values
            for (let key in info ) {
                localStorage.setItem(key, info[key] );
            }

            formFunc.clearForm();
            alert('Local Storage successfully set ' + JSON.stringify(info) );
        }
    });

    document.getElementById('ld-ls').addEventListener('click', () => {
        const keys = formFunc.obtainKeys();

        //  We retrieve values from localStorage using localStorage.getItem(key);

        //  Check the keys one by one. If it is not found, then display error
        for (let i = 0; i < keys.length; i ++ ) {
            if (!localStorage.getItem(keys[i] ) ) {
                alert(`No key of ${ keys[i] } is found!!!`);
                return;
            }
            //  Value is found so overwrite (mutate) into same array of keys
            keys[i] = localStorage.getItem(keys[i]);
        }
        
        //  Use spread operator to pass in the values
        formFunc.setInfo( ...keys );
        alert('Successfully loaded from Local Storage');
    })

    document.getElementById('del-ls').addEventListener('click', () => {
        const keys = formFunc.obtainKeys();

        //  For each key value, call upon localStorage.removeItem(key
        keys.forEach(e => localStorage.removeItem(e) );
        alert('Successfully cleared Local Storage');
    })


});