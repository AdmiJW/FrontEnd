document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('fetchTxt').addEventListener('click',fetchText);

    document.getElementById('fetchJSON').addEventListener('click', fetchJSON);

    document.getElementById('fetchOnline').addEventListener('click', fetchOnline);

    document.getElementById('post').addEventListener('submit', postRequest);

});


/*
    Fetch API is relatively easy to use. We fetch the stuff at URL, and it returns a Promise object. From the promise
    object returned contains information about the request information like
        Status: 200 -OK, 404 - Not found, 400 - Bad request ..

        If checked the status is ok, then we can just return the text, else we might want to return Promise reject
        with the respond passed as arguments, and handle the error in the catch block
*/


//--------------------------------------------
//  FETCH PLAIN TEXT RESOURCE
//--------------------------------------------
function fetchText() {
    let toPrint = '';

    fetch('text.txt')
    .then( function(respond) {
        if (respond.status === 200) //Alternatively use if (respond.ok) which returns boolean
            return respond.text();
        else
            return Promise.reject(respond);
    })
    .then( text => {
        toPrint = text;
    })
    .catch( err => {
        toPrint = `Error: ${err.status} File ${err.statusText}`;
        console.log(err) 
    })
    .finally(() => {
        document.getElementById('contents').innerHTML = 
        `<h1 class='text-center m-4'>Text File</h1><div class='container p-4 text-justify'>${toPrint}</div>`;
    })
}


//--------------------------------------------
//  FETCH JSON RESOURCE
//--------------------------------------------
function fetchJSON() {
    let toPrint = '';

    fetch('./users.json')
    .then(response => {         //Check if the response is status 200: OK or not
        if (response.ok)
            return response.json();
        else
            return Promise.reject(response);
    })
    .then(json => {             //Map each json object into respective HTML format, and join them into one string
        json = json.map( user => {
            return (`
                <div class='card card-body m-3'>
                    <ul>
                        <li>Name: ${user.username} (${user.name})</li>
                        <li>Email: ${user.email}</li>
                        <li>Phone: ${user.phone}</li>
                        <li>Address: ${user.address.suite}, ${user.address.street},
                                    ${user.address.zipcode} ${user.address.city}</li>
                    </ul>
                </div>
            `);
        });
        toPrint = '<h1 class="text-center m-4">Users</h1>' + json.join(" ");
    })
    .catch( err => {
        console.log(err);
        toPrint = `Error! ${err.status} File ${err.statusText}`;
    })
    .finally(() => {
        document.getElementById('contents').innerHTML = toPrint;
    });
}

//--------------------------------------------
//  FETCH ONLINE RESOURCE
//--------------------------------------------
function fetchOnline() {

    let toPrint = '';

    document.getElementById('contents').innerHTML = '<div class="text-center"><i class="fas fa-spinner"></i></div>'; //For Async Operations, we can show a loading indicator

    //Use query ?_limit=100 so it fetch only 100 items instead of whole 5000!
    fetch('https://jsonplaceholder.typicode.com/photos/?_limit=100')
    .then( response => {
        return response.ok? response.json(): Promise.reject(response);
    })
    .then( photos => {
        photos = photos.map(p => (`
            <img src=${p.url} alt={p.title} style='width: 20%; height: auto'/>
        `));
        toPrint = `<div style='display: flex; flex-wrap: wrap;'> ${photos.join(' ')} </div>`
    })
    .catch( err => {
        console.log(err);
        toPrint = `Cannot Fetch File from ${err.url}, Status: ${err.status} ${err.statusText}`;
    })
    .finally( () => {
        document.getElementById('contents').innerHTML = toPrint;
    });
}



//--------------------------------------------
//  POST REQUEST
//--------------------------------------------
function postRequest(e) {
    e.preventDefault();

    const titleField = document.getElementById('title');
    const bodyField = document.getElementById('desc');
    const title = titleField.value;
    const body = bodyField.value;
    titleField.value = '';
    bodyField.value = '';
    let toPrint = '';

    document.getElementById('response').innerHTML = '<div class="text-center"><i class="fas fa-spinner"></i></div>';   //For Async Operations, we can show a loading indicator

    //  In a Post request, the fetch() take in extra optional argument which is an object that specifies the method (POST, GET...),
    //  the header (meta informations), and body (Actual information), which we shall stringify it before sent to server
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify( {title, body} )
    })
    .then( response => response.ok? response.json(): Promise.reject(response) )     //Using ternary operator to simplify the checking process
    .then( resPost => {                         //Make it a HTML response card
        toPrint = `<div class='card card-body'>
                        <ul>
                            <li>ID: ${resPost.id}</li>
                            <li>Title: ${resPost.title}</li>
                            <li>Body: ${resPost.body}</li>
                        </ul>
                    </div>`
    })
    .catch( err => {
        console.log(err);
        toPrint = `Error Occurred: ${err.status} ${err.statusText}`;
    })
    .finally( () => {
        document.getElementById('response').innerHTML = toPrint;
    });
}