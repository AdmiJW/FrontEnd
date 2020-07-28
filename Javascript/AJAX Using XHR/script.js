document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('fetchTxt').addEventListener('click', fetchText);

    document.getElementById('fetchJSON').addEventListener('click', fetchJSON);

    document.getElementById('fetchOnline').addEventListener('click', fetchOnline);

    document.getElementById('post').addEventListener('submit', postRequest);


});
/*
    XHR methods

    abort()                                 (Cancels the request)
    getAllResponseHeaders()                 (Returns the entire response header of XHR)
    getResponseHeader(Header)               (Returns the specific header information)
    open(method, url, async, username, pw)  (Method - HTTP methods like GET, POST...
                                             URL    - Request location
                                             Async  - boolean value. To indicate whether JS should continue executing
                                                      after sending request; Whether this request should be asynchronous
                                             Username, pw   - Optional. For authentication purposes)
    send()                                  (Sends the request)
    send(str)                               (Sends the request with information in string form. Usually used with POST)
    setRequestHeader()                      (Adds a label value pair to the Request Header)
*/

/*  XHR object
    {
        //Those on*** are event listeners. We can assign them some function to be executed when triggered
        
        onabort:        (Triggered when request aborted)                   
        onerror:        (Triggered when request result in error)
        onload:         (Triggered when request is loaded, more specifically, when ready state is 4 !!BUT NOT NECESSARY STATUS 200)
        onloadend:      (Triggered when request is finish loaded)
        onloadstart:    (Triggered when request is starting to get loaded)
        onprogress:     (Triggered when request is on being progressed, ready state of 3. This we can put a loading screen)
        onreadystatechange: (Triggered everytime when ready state is changed, from 1,2,3 until 4)
        ontimeout:          (Triggered when request timed out)

        --------------------------------------------------------------------------------------------

        readyState:     (0 - Not initialized, 1 - Server connection estabilished, 2 - Request received,
                         3 - Processing Request, 4 - Request Finish. Response ready)
        response:       (The response itself; The data sent back by server)
        responseText:   (The response itself; The data sent back by server in String)
        responseType:   (Response type)
        responseURL:    (The URL set from the response)
        responseXML:    (The data sent back by server in XML form)
        status:         (HTTP status code. 200 means OK, 403 means Forbidden, 404 means Not found, 400 means Bad Request...)
        statusText:     (HTTP status's code respective text form)
        timeout:        
        upload: XMLHttpRequestUpload {onloadstart: null, onprogress: null, onabort: null, onerror: null, onload: null, …}
        withCredentials: false
    }


*/

function fetchText() {
    //Right here, xhr has status of 0 and ready state of 0
    const xhr = new XMLHttpRequest();

    //After the open method, xhr has ready state of 1
    xhr.open('GET', './text.txt', true);

    //  An old way of executing something after the request is retrieved is to assign an event handler to onreadystatechange
    //  To check when the item is retrieved and no errors, we need to check the status is 200 and readyState of 4
    //  If we are using an arrow function, we won't be able to use 'this' keyword
    xhr.onreadystatechange = function() {
        if (this.status === 200 && this.readyState === 4) {
            document.getElementById("contents").innerHTML = `
                <h2 class='text-center m-4'>Text File</h1>
                <div class='container text-justify'>
                ${this.responseText}
                </div>
            `;
        }
    }


    //After sending, it will quickly transition from 2 to 3, then after request has come back (or error occurred),
    //then ready state will be 4
    //If the request is successful, then status code should be 200. Otherwise see other statuses
    xhr.send();
    
}

function fetchJSON() {

    const xhr = new XMLHttpRequest();
    xhr.open('GET','./user.json', true);

    //A quicker way now to perform stuff when response is available is to assign onload event handler.
    xhr.onload = function() {
        console.log(this.status);
        const response = JSON.parse(this.responseText );
        const toPrint = response.reduce( (acc, e) => {
            const {street, city, suite, zipcode} = e.address;
                return acc + (`<div class='card card-body m-4'>
                    <ul>
                        <li>Name: ${e.username} (${e.name})</li>
                        <li>Email: ${e.email}</li>
                        <li>Phone: ${e.phone}</li>
                        <li>Address: ${suite}, ${street}, ${zipcode} ${city}</li>
                    </ul>
                </div>
                `);
            console.log(acc);
        }, '');
        document.getElementById('contents').innerHTML = toPrint;
    }

    xhr.send();
}


function fetchOnline() {

    const xhr = new XMLHttpRequest();
    //Using query at the end, ?_limit=100 so that it returns only 100 of JS Objects, not originally 5000
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/photos?_limit=100',true);

    //WHen it is in progress and takes some time to respond, show a spinner icon
    xhr.onprogress = function() {
        document.getElementById('contents').innerHTML = '<div class="text-center"><i class="fas fa-spinner"></i></div>';
    }

    xhr.onload = function() {
        const response = JSON.parse(xhr.responseText);
        const toPrint = `
            <h1 class='text-center m-4'>Online Fetch</h1>
            <div class='d-flex' style='flex-wrap: wrap'>
                ${
                    response.reduce( (acc, e) => {
                        return acc + `<img src=${e.url} alt=${e.title} style='width: 20%'/>`;
                    }, '')
                }
            </div>
        `;
        document.getElementById('contents').innerHTML = toPrint;
    }

    xhr.send();
}



function postRequest(e) {
    e.preventDefault();

    document.getElementById('response').innerHTML = '<div class="text-center"><i class="fas fa-spinner"></i></div>';

    const textField = document.getElementById('title');
    const descField = document.getElementById('desc');
    const title = textField.value;
    const body = descField.value;
    textField.value = '';
    descField.value = '';

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);

    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');

    xhr.onload = function() {
        const response = JSON.parse(this.responseText);
    
        document.getElementById('response').innerHTML = `
            <div class='card card-body'>
                <ul>
                    <li>ID: ${response.id} </li>
                    <li>Title: ${response.title} </li>
                    <li>Body: ${response.body} </li>
                </ul>
            </div>
        `;
    }

    //If you are sending credentials information, set to true
    xhr.withCredentials = false;

    // Include the body data into the send() arguments
    xhr.send( JSON.stringify( {title, body} ) );
}