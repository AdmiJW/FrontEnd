
/*
    When coding for web stuffs, which require sending requests to server and fetch the document and stuff back, it will have some time delay with
    it. Javascript as a single-threaded programming language, how was it supposed to know when the stuff comes back to execute some code?

    First, let's see how JS, which is single-threaded, handles those setTimeout and setInterval method, which requires waiting for some time before
    executing code?
    In JS, we have what's called a CALLSTACK, which is like a stack data structure storing the code to execute. As interpreter, when it detects
    a code to execute, it pushes it to callstack first, and the callstack will get popped and be executed.
    How does it achieve setTimeout and setInterval method then? Remember that apart from Javascript, it has a strong accompany - The browser itself.

    When the callstack finds out the code popped requires some time to be executed, like setTimeout, it will notify the browser to handle that
    code. The code is pushed to the browser's Web API and removed from callstack itself. That way the code can continue executing without waiting
    for the setTimeout or whatever time consuming code to complete!
    When the time finally comes for the setTimeout or time consuming code, the browser will basically put the code back into the callstack for it 
    to be executed. This way it achieves the effect of multithreading where the code waits until its execution time while other code just 
    continue running as usual.


    Therefore let's say we were to fetch some information from the server and display it on document. It won't work if we done it with
    Synchronous Programming (The way we program like normal, where execution runs from top to bottom). Like so:

*/
    // console.log('start');

    // function fetchinfo() {
    //     let result;
    //     //Here I use a setTimeout to simulate the fetching delay of information from the server, set to 3 seconds delay
    //     setTimeout(() => {
    //         console.log('fetching done!');
    //         result = {name: 'AdmiJW', gender: 'Male'};
    //     } , 3000);
    //     return result;
    // }
    // //You can see the console will log out undefined. This is because this log gets executed even before the result is returned from server!
    // console.log('fetched: ' + fetchinfo() );

    // console.log('finish');

//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------

/*
    Before 2015 (when the ES6 release), developers would use callback functions to wait for the fetch to complete and do something on that
    returning information. It would pass in the function (consisting codes to perform stuff on document) as argument into the request
    itself.

*/

    // console.log('----------------------------Callback Functions -------------------------------'); 

    // //Function to fetch the data from server, which delay is set at 1 second. A callback function is passed as argument to perform
    // //something on the data
    //
    // function fetchInfo(callback) {
    //     setTimeout(() => {
    //         let result = { name: 'AdmiJW', gender: 'Male' };
    //         callback(result);
    //     }, 1000 );
    // }

    // //A callback function passed which print in the name
    // function printCallback(info) {
    //     console.log(`Welcome ${info.gender == 'Male'? 'Mr.': 'Mrs.'}${info.name}`);
    // }

    // //Call upon the data fetching function with callback function passed as argument
    // fetchInfo(printCallback);

/*
    Callback functions now looks okay to use, but if more operations were to performed, then it would form a so-called
    'CALLBACK HELL'
*/

// console.log('---------------------------CALLBACK HELL---------------------------------------');

// function login(username, password, callback) {
//     console.log('Attempting to login with username ' + username + '....');
//     setTimeout( () => {
//         let user = { name: "AdmiJW", gender: 'Male'};
//         callback(user);
//     }, 3000 );
// }

// function fetchNews(user, callback) {
//     console.log('Fetching news for ' + user.name + '.....');
//     setTimeout( () => {
//         let news = ['China Press', 'Sin Chew', 'BBC'];
//         callback(news);
//     }, 3000);
// }

// function getNew(n, callback) {
//     setTimeout( () => {
//     if (n == 'China Press')
//         callback('China Press Lorem Ipsum');
//     else if (n == 'Sin Chew')
//         callback('Sin Chew Lorem Ipsum');
//     else
//         callback('BBC Lorem Ipsum');
//     }, 3000 );
// }

// //Notice if the process goes on, it will form a weird structure like a pyramid! That is not good for readibility. Therefore Promises was
// //introduced in ES6
// login('jw@email.com', 'ABCDEF', (user) => {
//     console.log(`Logged in as ${user.name}!` );
//     fetchNews(user, (news) => {
//         console.log(`Fetched ${news.length} news!`);
//         for (let n of news) {
//             console.log('Fetching news for ' + n + ' ...');
//             getNew(n, (s) => {
//                 console.log(s)
//             });
//         }
//     });
// });

/*
    Notice that server may be down sometimes and data fetching will end up failing. If that's the case, apart from passing in a callback
    function, we would also need to pass in a function that is run when the data fails to be fetched.
    The conventional naming for these 2 functions are onSuccess and onFailure. Like so:

    function getData(loginCredentials, onSuccess, onFailure) {
        code to fetch Data
        if (data fetched)
            onSuccess(data);
        if (something is wrong)
            onFailure(error Message);
    }

//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------

/*
    In the functions to fetch data and calling the callback functions upon getting the data, we can replace it with returning a
    new promise, where the syntax is as follows:
        new Promise( (resolve, reject) => {
            code to run to fetch data
            if data fetched {
                resolve(data);                 
            }
            if something goes wrong {
                reject(error);
            }
        })
    
    We could use the promise object returned and use .then to perform the next step. In the .then, we shall pass in a function which resembles
    the callback function, where the argument passed into the resolve() as the parameter.
    The same goes when something goes wrong. In this case, we would use .catch() where we need to pass in a function where the error object
    passed into the reject() should be the parameter.
    The resolve() and reject() will return a new Promise object, so that we can chain the .then and .catch methods 
*/

    // let pass = false;
    // const promise = new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         if (pass) {
    //             resolve('Successfully Login');
    //         } else {
    //             reject( new Error('Invalid Credentials') );
    //         } 
    //     }, 3000);
    // });

    // promise
    // .then( (m) => console.log(m) )
    // .catch( (e) => console.log(e) );

/*
    A more practical example
*/

    // function login (email, password) {
    //     const database = { 'jw@gmail.com': {password: 123, user: {name: 'AdmiJW', gender: 'Male'} } };
    //     return new Promise( (resolve, reject) => {
    //         setTimeout(() => {
    //             if ( database.hasOwnProperty(email) && database[email].password == password )
    //                 resolve( database[email].user );
    //             else
    //                 reject( new Error('Invalid Login Credentials!' ) );
    //         }, 3000);
    //     });
    // }

    // function getNewsList (username) {
    //     const database = { 'AdmiJW': ['Sin Chew', 'The Star', 'China Press'] };
    //     return new Promise( (resolve, reject) => {
    //         setTimeout(() => {
    //             if (database.hasOwnProperty(username) )
    //                 resolve( database[username] );
    //             else
    //                 reject( new Error(`No news found for ${username} on the database!`) );
    //         }, 3000);
    //     });
    // }

    // function getNewsFeed(news) {
    //     const database = { 'Sin Chew': 'Sin Chew Lorem Ipsum', 'The Star': 'The Star Lorem Ipsum', 'China Press': 'China Press Lorem Ipsum'};
    //     return new Promise( (resolve, reject) => {
    //         setTimeout(() =>{
    //             if (database.hasOwnProperty(news) )
    //                 resolve( database[news] );
    //             else
    //                 reject( new Error(`No Respective News ${news} on database!`) );
    //         }, 3000);
    //     });
    // }
    
    // let email = 'jw@gmail.com';
    // let pw = 123;

    // console.log(`Logging in for ${email}...`);
    // login( email, pw )
    // .then( (user) => {
    //     console.log(`Successfully logged in as ${user.name}!\n`);
    //     console.log(`Getting news feed for ${user.name}...`);
    //     return getNewsList(user.name);
    // })
    // .then( (news) => {
    //     console.log(`Successfully obtained ${news.length} news!\n`);
    //     news = news.map( e => getNewsFeed(e) );
    //     return Promise.resolve(news);
    // })
    // .then( (list) => {
    //     console.log('Fetching news....\n');
    //     Promise.all(list)
    //     .then( (feeds) => {
    //         for (feed of feeds)
    //             console.log(feed);
    //     }).catch( (e) => {
    //         console.log(e.message);
    //     });
    // })
    // .catch( (e) => console.log(e.message) );   

    // // It is good to leave the catch block until the last, unless immediate error handling is required, which is another case


/*
    An even elegant code solution is using async and await keywords. This way it enables us to store promises and run it into a variable.
    Async is used before the function keyword itself to mark this function as asynchronized function, and enables the 'await' keyword to be
        used inside the function
    Await is used on the function calls which return a promise, to tell the code interpreter to wait for the function to return before
        execution of next line of code in the function
*/

    function login (email, password) {
        const database = { 'jw@gmail.com': {password: 123, user: {name: 'AdmiJW', gender: 'Male'} } };
        return new Promise( (resolve, reject) => {
            setTimeout(() => {
                if ( database.hasOwnProperty(email) && database[email].password == password )
                    resolve( database[email].user );
                else
                    reject( new Error('Invalid Login Credentials!' ) );
            }, 3000);
        });
    }

    function getNewsList (username) {
        const database = { 'AdmiJW': ['Sin Chew', 'The Star', 'China Press'] };
        return new Promise( (resolve, reject) => {
            setTimeout(() => {
                if (database.hasOwnProperty(username) )
                    resolve( database[username] );
                else
                    reject( new Error(`No news found for ${username} on the database!`) );
            }, 3000);
        });
    }

    function getNewsFeed(news) {
        const database = { 'Sin Chew': 'Sin Chew Lorem Ipsum', 'The Star': 'The Star Lorem Ipsum', 'China Press': 'China Press Lorem Ipsum'};
        return new Promise( (resolve, reject) => {
            setTimeout(() =>{
                if (database.hasOwnProperty(news) )
                    resolve( database[news] );
                else
                    reject( new Error(`No Respective News ${news} on database!`) );
            }, 3000);
        });
    }

    let email = 'jw@gmail.com';
    let pw = 123;

    async function display() {
        try {
            console.log(`Logging in for ${email}...`);
            const user = await login(email, pw);
            console.log(`Successfully logged in as ${user.name}!\n`);

            console.log(`Getting news list for ${user.name}...`);
            const newsli = await getNewsList(user.name);
            console.log(`Successfully obtained ${newsli.length} items!\n`);

            for (news of newsli) {                                  //If want the news to fire at same time, use back the Promise.all instead
                console.log(`Obtaining news feed for ${news}...`);
                console.log( await getNewsFeed(news) + '\n');
            }
        } catch (err) {                 //Here we use the good ol try catch to catch errors
            console.log(err.message);
        }
    }
    display();
    console.log('-----I get ran when async functions are running!-----');
