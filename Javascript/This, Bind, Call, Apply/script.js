/*
    The 'this' keyword in Javascript can be pretty confusing. 

    This is mainly due to functions being first class citizens in Javascript language, where functions are just 
    treated like normal values and can be assigned to variables, passed around as arguments, returned as returned 
    values etc.

    See this:
*/

let dog = {
    sound: 'woof',
    talk: function() {
        console.log( this.sound );
    }
}

dog.talk();                             //  'woof' as expected

let talkFunction = dog.talk;
talkFunction();                         //  undefined

/*
    This problem is mainly due to the functional paradigm of JS clashed with the object oriented paradigm of JS

    The problem is just this:
    We can think of functions as just containing pure codes. What we type in the functions are exactly what they are.
    
    When we call
        dog.talk()
    the talk function is still bind to the dog object. Therefore this will return the dog object, and accessing
    the 'sound' is no problem

    However when we assign the dog.talk function to talkFunction, it is equivalent to:

    let talkFunction = function() {
        console.log(this.sound);
    }

    When it gets called, this is no longer bound to the dog. 'this' is determined only during the time it is being
    called. Where the function is being called determines what 'this' contains

    In this case, if we are using browser, 'this' shall points to the window BOM object, which does not has the
    key 'sound', therefore it just returns undefined

    Let's see a more real world example where we would encounter this situation
*/

let button = document.getElementById('btn');

button.addEventListener('click', dog.talk);         //When button is clicked, console logs 'undefined'

/*
    Remember. addEventListener just takes in the function as second argument. Passing dog.talk like this is just
    similar to

    button.addEventListener('click', function() {
        console.log(this.talk);
    })

*/












/*
    Now, how do we pass in the function into the addEventListener, or assign the object's function to another variable,
    but keeping the context then?

    First way is to wrap the call to the object's bark into another function:

*/

const wrap1 = function() { dog.bark() };
const wrap2 = () => { dog.bark() };

wrap1();            //  'bark'
wrap2();            //  'bark'

/*
    Or another, more user understandable way is to use the Javascript's bind() function

    Since functions are in fact, objects, bind() is defined in the function object's prototype. So we access like so:
            func.bind(...);

    bind() function takes in 1 required argument and the rest are optional arguments. 
    >   First argument is the object to be binded to 'this' keyword. In this case we would pass in dog
    >   The subsequent arguments are the arguments to be passed into the actual function. In this case since bark()
        takes no argument, we don't need to pass in anything

    bind() returns another function which is identical to dog.bark() function, except this time, the 'this'
    is actually binded to the dog object, therefore no matter where the function is called, it will always 
    console log 'bark'
*/

const binded = dog.bark.bind(dog);

binded();           //  'bark'


























/*
    What if we only want to call the function once, and not storing the function somewhere in a variable?
    JS function prototype also comes with call() and apply()

    These two functions are identical:
        >   They both take in the object to bind to 'this' keyword in the first argument
        >   The subsequent arguments are the actual arguments needed to pass into the actual function itself

    The only difference is:
        >   call() really takes in as many arguments as the actual function argument list.
            Say if the function has 3 arguments, when using call() we shall pass in 4 arguments
            (First one is the object binded to 'this', the rest is the actual argument)
        >   apply() only takes in 2 arguments. The first is the same as above, taking in an object,
            the second argument is an ARRAY OF ACTUAL ARGUMENTS.
            In the above example, then using apply() we will pass in an array of length 3 as second argument

    Notice if we want to use call() and apply() without binding 'this' keyword, just simply pass in null. It
    still work properly
*/


dog.bark.call(dog);         //  'bark'
dog.bark.apply(dog);        //  'bark'



const person = {
    greeting: "Hello! ",
    speak: function(name) {
        console.log(this.greeting + name);
    }
};

person.speak("Adam");           // 'Hello! Adam'

let func = person.speak;
func('Adam');               //  'undefined Adam'

person.speak.call(person, 'Adam');      // 'Hello! Adam'

person.speak.apply(person, ['Adam'] );  // 'Hello! Adam'
