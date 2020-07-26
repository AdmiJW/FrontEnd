
/*
    The most direct way to export stuff is to just export the stuff itself, inline.
    We could export anything from functions, variables, objects and arrays...

*/

export function square(e) {
    return e*e;
}

export const PI = 3.1415;


/*
    Now, we can export the stuffs with just one line of export statement, without having to type the export keyword
    in front of the stuffs we want to export
*/

function getSquareRoot(e) {
    return e**0.5;
}
const E = 2.7183;

//See how I exported multiple stuff in one export statement?
//Also, we could just rename the exports using keyword 'as', as well as rename imports!
//Once renamed, we shall import using the new name 'squareRoot', not the old 'getSquareRoot' name!
export { getSquareRoot as squareRoot, E };


/*
    Sadly, there is no export all function
*/

export function max(arg, ...args) {
    let max = arg;
    for (let i of args) max = max > i? max: i;
    return max;
}

