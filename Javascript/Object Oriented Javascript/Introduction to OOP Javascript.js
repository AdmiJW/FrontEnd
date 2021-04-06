/*
    =====================================
    ☕ Introduction to OOP Javascript ☕
    =====================================

    *   Javascript's Objects, isn't really the usual object we see in C++, Java etc. 
        Javascript's object is kind of similar to HashMap, or Dictionary. Like so:
        
        {  
            prop1: val1,
            prop2: val2
            ...
        }

    *   Turns out, every objects in Javascript takes this form. Even more, Almost everything
        in javascript is an Object. Array, String, Numbers, Boolean... all of them are Objects!

    *   When you have a string value like "...", you can call its methods like slice, length....
        Even when you have a boolean like true, you can call valueOf() method from it!

    *   This proves to make the language use convenient. Useful methods come integrated with the
        value itself.

    *   When we want to create our object, always use the 'new' keyword
*/

//  Almost Everything is an Object!!!
console.log( "String".toLowerCase() );
console.log( true.valueOf() );
console.log( 12.3.toPrecision(5) );









/*
    =====================================
    🗃️ Javascript Object literal 🗃️
    =====================================

    * Javascript objects are very, very easy to create. Simply use a pair of curly brackets

        {
            prop1: val1,
            prop2: val2,
            ...
        }

    * We then access the properties and methods by 2 ways:
        >   Dot notation
                    obj1.prop1
        >   Square bracket notation
                    obj1['prop1']

        The square bracket notation is useful when the key itself is a variable, or is space separated string
                    obj1[var]
                    obj1["Space separated"]

    * Of course, updating the object's properties is easy. Unlike Java or C++, we can even replace object's methods!
                    obj1.method = ()=> { console.log("Replaced" ) }
*/


const obj = {
    message1: "Haven't replace",
    message2: "Replaced",
    print: function () { console.log(this.message1) }
}

obj.print();
obj.print = function() { console.log(this.message2) };
obj.print();








/*
    =======================================
    🍬 Syntatic Sugar: 'class' keyword 🍬
    =======================================

    * The 'class' keyword is definitely very familiar if you coming from Java, C++, Python or similar OOP languages.
      It serves as blueprint to create objects.

    * We'll talk about constructor functions later, as it is harder to understand. Now, the modern way to create objects
      is via the class keyword, along with 'constructor' and methods.

    * Since EMCAScript 5 (2009), Getters and Setters are implemented easily using 'get' and 'set'.
      When you try to access the property via dot notation or square bracket, the getter and setter are executed

      DO NOT USE GETTERS/SETTERS AS SAME NAME AS ITS PROPERTY! IT WILL CAUSE INFINITE RECURSION

    * There is a technique called as method chaining. This is achieved by returning the object itself in the methods

    * To create objects from class, use the 'new' keyword, essentially calling the constructor
*/


class User {
    constructor(name, id) {
        this.nickname = name;
        this.id = id;
    }

    //  Getters and Setters
    get name() { return this.nickname; }
    set name(name) { 
        console.log(`${this.nickname} changed to ${name}`);
        this.nickname = name;
    }

    //  Chainable methods
    login() {
        console.log(`${this.name} is logged in...`);
        return this;
    }

    logout() {
        console.log(`${this.name} is logged out...`);
        return this;
    }

    update() {
        console.log(`${this.name} updated his/her status...`);
        return this;
    }
}

const user1 = new User("Alex", 1);
user1.name = "Brendan";
user1.login().update().logout();








/*
    ============================================
    ⛓️ Inheritance and Prototype Chains ⛓️
    ============================================

    * One thing differs Javascript from other language, is the prototype chaining.

    * Every Object should have a '__proto__' property, which the parent class resides, or the base of all
      Objects: Object itself

      To be more precise:
        >   Classes have 'prototype' property, we can add things to it, and every object created will have
            that added thing (methods/property) in it.
        >   Instances/Objects have '__proto__' property, which is exactly referencing the class's prototype property.
            However, we shall never access it directly.
            If in case we want to access, DONT USE obj.__proto__. IT IS DEPRECATED. Use Object.getPrototypeOf(obj) instead.


    * If you do observe objects created from the 'class' keyword, all the properties should directly reside in the object
      itself. HOWEVER, methods reside in the __proto__ of the object!

      Eg:       class MyClass {
                    constructor() {
                        this.v = 1;
                    }

                    m() {}
                }

                Take a look at its object:

                {
                    v: 1,
                    __proto__: {
                        m: f()
                    }
                }

        This is ideal design: Each object doesn't need it's own copy of the function. Each object won't have different
        implementations of the method.

    * Therefore, remember: Properties reside in object itself. Method reside in the prototype of the class.

    * The way inheritance works using 'class' is very, very simple. Use 'extends' keyword and list down the class to extend.
      Inside the prototype of the inherited class, it will consists of another prototype which is the parent class's prototype!
      Note that properties of parent class, reside directly in object itself

    * When you call a method, the interpreter searches in the object directly. If it is not present, it then goes down the
      prototype chain to continue searching. Therefore you can see how inheritance works for methods.


    * If a constructor is not specified in inherited class, a default constructor is given, which look like this:
            constructor(...args) {
                super(...args);
            }

      Therefore if we were to overload the constructor, be sure to call the parent class's constructor using 'super'!
  }
*/


class Admin extends User {
    constructor(name, id, rank) {
        super(name, id);
        this.rank = rank;
    }

    ban(id) { console.log(`${id} is banned`); }
}

const adm = new Admin("Alex", 1, 1);

console.dir(adm);
console.log('-----------------');
console.dir( Object.getPrototypeOf(adm) );      //  See Admin's prototype, equivalent to Admin.prototype
console.log("-----------------");
console.dir( Object.getPrototypeOf(Object.getPrototypeOf(adm) ) );  //  See Admin's prototype's prototype. Should be User's prototype













/*
    =====================
    📖 Prerequisite 📖
    =====================

    * Before moving on, let's learn a bit or two to ease our learning curve later

    * Object.create( obj ) is going to create an new JS object, with prototype set as obj. Like:
                const newobj = {}
                newobj.__proto__ = obj
                return newobj

    * func.call(thisContext, ...args) and func.apply(thisContext, [...args] ) will call the function
      with the 'this' keyword binded to thisContext argument.
      The difference is call() uses variable length argument, apply() uses array of arguments

      
    * func.bind(thisContext) RETURNS a brand new function, which calls the original function but with
      'this' binded to thisContext argument


    * Arrow functions remember exactly the 'this' keyword the time it is used. Call(), apply() and bind()
      probably won't work for it.
      Normal functions on the other hand, do vary in the 'this' context, easily changed by call(), apply() and
      bind()

*/

const parent = {
    parentf: ()=> {}
}
console.dir( Object.create(parent) );



const o1 = { msg: "Hello!" };
const o2 = { msg: "Bye!" };
const o3 = { msg: ":)" };
const f = function() { console.log(this.msg) };

f();
f.call(o1);
f.apply(o2);
f.bind(o3)();







/*
    =============================================================
    🔎 Under the Sugar: Constructor functions and Inheritance 🔎
    =============================================================

    * Before 'class' are introduced, objects are created via constructor functions, which:
        >   Properties are set in the function via this keyword, like       this.key = value;
        >   Methods are set separately outside the constructor function, in the prototype of the function, like
                    User.prototype.login = function() {...};
        >   One thing don't change: Objects are instantiated via 'new' keyword.

    * Therefore, we are now using 'class' keyword. What's under the hood is like this:

                function User(name, id) {                                       <<- Constructor function
                    this.name = name;
                    this.id = id;
                }

                User.prototype.login = function() {...};                        <<- Methods


    * How about inheritance? The prototype shall consist of the parent's prototype, yet the parent's properties shall
      be directly set in the object!

      > Setting properties is easy. Since the parent constructor function sets properties thru 'this' keyword, we should
        run the parent constructor but with 'this' set to the instance referring to the inherited class thru apply or call,
        like:

                function Admin(name, id, rank) {
                    User.call(this, name, id);
                    this.rank = rank;
                }

      > As for functions, we want the prototype of Admin object to have User's prototype as its prototype:

                {
                    ban: f()...                                     <- Admin's method
                    __proto__: {
                        login: f()...                               <- User's method
                        logout: f()...
                        update: f()...
                    }
                }

        Therefore, use Object.create() to achieve our goal

                Admin.prototype = Object.create(User.prototype);
*/



function User2(name, id) {
    this.name = name;
    this.id = id;
}

User2.prototype.login = function() { console.log(`${this.name} logged in!`); };

function Admin2(name, id, rank) {
    User2.call(this, name, id);
    this.rank = rank;
}

Admin2.prototype = Object.create(User2.prototype);
Admin2.prototype.ban = function(id) { console.log(`${id} is now banned!`); };


const adm2 = new Admin2("Alex", 1, 1);
console.log(adm2);