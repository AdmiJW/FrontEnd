/*
    Modules allow us to split our JS code into parts and place them at different places, allowing for better
    organization. In the end, we will assemble those JS modules together and it will work as if they are
    together.

    In the HTML when importing script, we need to be careful and specify the type attribute to "module"
    for import and exports to work! See this:

        <script type='module' src='main.js' ></script>

        Note: If directly open html file, the script won't run because of security reasons. Open a live server
              instead

*/

/*
    To import stuff, we can just use keyword 'import', followed by the curly braces, specifying the thing we want to
    import

    Note: In JS, we cannot just specify the file name even if we are in the same folder like in HTML. We have to
          start with a dot slash, like ./exportFuncAndVar.js
*/

import { square, PI } from './exportFuncAndVar.js';

console.log( square(4) );
console.log( PI );


/*
    We can redefine the names of the imported stuff, using the 'as' keyword
*/

import { squareRoot as sqrt, E as e } from './exportFuncAndVar.js';

console.log(sqrt(16) );
console.log( e);

/*
    Instead of importing stuff one by one, we can import all at once and give it a namespace to avoid collisions
    with functions of same name!
    Syntax:     import * as <nameHere> from '...';
*/

//Here I import all other unimported stuff from the file, and give nameSapce of 'ImportAll'.
//Now to access those imported stuff, use ImportAll.identifier
import * as ImportAll from './exportFuncAndVar.js';

console.log( ImportAll.max(1,2,3,4,9) );





/*
    Now we have default exports. For notes visit the exportDefault.js
    Here will explain ways to import default stuffs
*/

//Here we can just import the default stuff just like usual. However, we couldn't just call the imported stuff
//by reversed word default! Therefore we need to give it a name using 'as'
import { default as htmlTransformer } from './exportDefault.js';

console.log( htmlTransformer('div', 'Hello World') );

//Instead of using {default as <NAME> }, since 'default' must have a name, you can just specify the name itself
//without even mentioning the 'default'. It is equivalent to {default as htmlTransform2}
import htmlTransform2 from './exportDefault.js';

console.log( htmlTransform2('span', 'Bye Bye World') );



/*
    Now talk about Aggregate modules. It act as a central, or bridge between codes, so that we can export stuff
    imported from other modules
*/

//See that I am exporting both the stuffs from the two outer modules?
export * as Exp1 from './exportFuncAndVar.js';
export * as Exp2 from './exportDefault.js';