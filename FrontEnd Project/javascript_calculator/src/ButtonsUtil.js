
//  Buttons array used for rendering the button elements. 
//  Format:
//  [ <the content, either is the class of FontAwesome or the text>, <id>, <is it Font Awesome?> ]
const buttons = [
    ['sin', 'sin', false],
    ['cos', 'cos', false],
    ['tan', 'tan', false],
    ['xⁿ', 'pow', false],
    ['fas fa-square-root-alt', 'sqrt', true],
    ['7', 'seven', false],
    ['8', 'eight', false],
    ['9', 'nine', false],
    ['DEL', 'del', false],
    ['AC', 'clear', false],
    ['4', 'four', false],
    ['5', 'five', false],
    ['6', 'six', false],
    ['fas fa-times', 'multiply', true],
    ['fas fa-divide', 'divide', true],
    ['1', 'one', false],
    ['2', 'two', false],
    ['3', 'three', false],
    ['fas fa-plus', 'add', true],
    ['fas fa-minus', 'subtract', true],
    ['fas fa-percentage', 'percent', true],
    ['0', 'zero', false],
    ['.', 'decimal', false],
    ['=', 'equals', false]
];

//  A mapping used when the user presses a key. Maps the key press to the key ID
const mapKeyToBtnId = {
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '+': 'add',
    '-': 'subtract',
    '*': 'multiply',
    '/': 'divide',
    '.': 'decimal',
    '%': 'percent',
    'Backspace': 'del',
    '^': 'pow',
    '=': 'equals'
}

//  Get the precedence of the operator
const getPrecedence = {
    '+': 0,
    '-': 0,
    '*': 1,
    '/': 1,
    '^': 2
}

//  Returns true if the associativity of the operator is Right to Left. If False, then is Left to Right (+ - * /)
function getAssociativityRtoL (symbol) {
    return symbol === '^';
}

//  A mapping from the button element's ID to the actual value that shall be appended into the input Array
const getAppendById = {
    zero: '0',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    decimal: '.',
    decimalNew: '0.',
    percent: '%',
    sin: 'sin',
    cos: 'cos',
    tan: 'tan',
    sqrt: '√',
    pow: '^',
    add: '+',
    subtract: '-',
    multiply: '*',
    divide: '/'
}

//  Stores the TimeOut Object when the user trigger a digit limit exceeded. 
let digitLimitExceedTimeOut = null;


//  Pushes a new element into the array, based on the Button Id passed in as argument.
//  It is a pure function, so it returns a new array 
function pushNewIntoArr( state, btnId ) {

    const content = getAppendById[btnId];   //Get the character to push

    return [...state.inputArray, content];
}

//  Appneds the value to be inserted into the last element of the original input Array. By append means append
//  into the string of the last element. Like ['1', '+', '2'], by appending 2 makes ['1', '+', '22']
//  It is a pure function, so it returns a new array 
function appendIntoArr( state, btnId ) {

    const len = state.inputArray.length;
    const content = getAppendById[btnId];   //Get the character to append

    //  If the current string to append is too long (Longer than 16 chars), display warning message
    //  Which dissapear after 500ms by setting TimeOut
    if ( state.inputArray[len - 1].length > 16) {
        if (digitLimitExceedTimeOut) {
             window.clearTimeout( digitLimitExceedTimeOut );
        }
        const elem = document.getElementById('display');
        elem.innerText = 'LIMIT EXCEEDED';
        digitLimitExceedTimeOut = setTimeout(() => {
            elem.innerText = state.inputArray[len - 1];
        }, 500);
        return state.inputArray;
    }

    return [ ...state.inputArray.slice(0, len - 1), state.inputArray[len - 1] + content ];
}


//  Given the button id, will overwrite the last element of the array. Primarily used when overwriting the operators
//  Say the array is ['1', '+'], If user presses -, will overwrite to ['1', '-']
//  It is a pure function, so it returns a new array 
function overWrite( state, btnId ) {
    const content = getAppendById[btnId];   //Get the character to use to overwrite

    const len = state.inputArray.length;
    return [ ...state.inputArray.slice(0, len - 1), content ];
}



//  Will get the last 'stuff' of the input Array.
//  If the last stuff is 'NaN' or 'ERROR', return a flag indicating it is an error, which key presses won't do anything
//  If it is sin,cos or tan, then return that
//  Otherwise return the last character of the last element in the input Array
function getLastStuff( state ) {
    const len = state.inputArray.length;
    const lastElem = state.inputArray[len - 1];

    //  If the element is Error, then return a sign indicating ERROR
    if (lastElem === 'NaN' || lastElem === 'ERROR')
        return "ERR";

    //  If the last element ends with trigo function (May be nested, like sincostan ), then return the trigo function
    //  which is the last 3 characters
    if (/.*(sin|cos|tan)$/g.test(lastElem) ) {
        return lastElem.slice( lastElem.length - 3 );
    } 
    return lastElem[ lastElem.length - 1 ];     //Else just return the last character
}


//  PreProcess the input array. Here are the operations preprocessed:
//  If it ends with %, multiply the value before it by 0.01
//  If it contains trigonometric functions (sin cos tan), then evaluate the trigo function on the value after it
//  If it contains sqrt, then evaluate the trigo function on the value after it
//  Otherwise return the string as it is 

//  Note that this function uses recursion for easier implementation. This makes dealing with nested function and cases
//  like sin( cos( tan( sqrt(x) ) ) ) easier to dealt with
function preProcessEvaluate( str ) {
    if (str.length === 0) return Number.NaN;

    if (str.endsWith('%') ) {
        const len = str.length;
        return `${preProcessEvaluate(str.slice(0, len - 1) ) * 0.01}`;
    }
    if ( str.startsWith('sin') ) {
        return `${Math.sin( preProcessEvaluate(str.slice(3) ) )}`; 
    } else if (str.startsWith('cos') ) {
        return `${Math.cos( preProcessEvaluate(str.slice(3) ) )}`;
    } else if (str.startsWith('tan') ) {
        return `${Math.tan( preProcessEvaluate(str.slice(3) ) )}`;
    } else if (str.startsWith('√') ) {
        return `${Math.sqrt( preProcessEvaluate(str.slice(1) ) )}`;
    }

    return `${str}`;
}



//  This takes in the original input Array, and checks for formatting of the whole array. The formatting done:
//  If the operator is +-, *-, /- or ^- (Meaning the number following shall be negative), then
//  will push the first operator, then set up a flag so that next number gets multiplied by -1
//  If the previous element is an operand (Not operator) and this one is not as well, then insert a multiplication
//  sign between them. See this:     ( 5 sin(3) ) => ( 5 * sin(3) )

//  This is a pure function, so it returns a new array
function checkFormatting( arr ) {
    const resArr = [];
    let negative = false;
    let isPrevOperator = true;

    for (let i = 0; i < arr.length; i ++ ) {
        const element = arr[i];

        //  If previous is an operator, then just push this one into the result Array. No need to check if it is 
        //  operator. Multiply by -1 if previous operator is negative one ( +- , *- , /-, or ^-)
        if (isPrevOperator) {
            resArr.push( `${element * (negative? -1: 1)}` );
            negative = false;
            isPrevOperator = false;
            continue;
        }
        
        //  If it is a negative operator, push the first operator into the result array, then set the negative flag
        //  to true, which will cause next operand to multiplied by -1
        if ( ['+-', '*-', '/-', '^-'].includes( element) ) {
            resArr.push( element.slice(0, 1) );
            negative = true;
            isPrevOperator = true;
            continue;
        }
        //  Else if it is not an operator, and previous element is not operator ( Like 5 sin 10), then put a 
        //  multiply operator in between them
        else if ( !['+', '-', '*', '/', '^'].includes( element) ) {
            resArr.push( '*' );
            resArr.push( element );
            continue;
        }

        //  All cases exhausted, this must be an operator. 
        isPrevOperator = true;
        resArr.push( element);
    }

    return resArr;
}



//  This function takes in the array of expression in Infix notation, and converts it into postFix notation for
//  easier computer evaluation.

//  This function is pure function, so it returns a new array 
function postFixConversion( arr ) {
    const resArr = [];
    const operatorStack = [];

    for (let i = 0; i < arr.length; i ++ ) {
        const elem = arr[i];

        //  It is a number. Push into the result array
        if ( !isNaN( elem ) ) {
            resArr.push( elem );
        } else {
            //  If the stack is empty, just push it
            if ( operatorStack.length === 0) {
                operatorStack.push(elem);
                continue;
            }

            //  Otherwise get the precedences
            const prevPrecedence = getPrecedence[ operatorStack[ operatorStack.length - 1] ];
            const currPrecedence = getPrecedence[ elem ];

            //  Current operator greater precedence. Push it
            if (currPrecedence > prevPrecedence) operatorStack.push( elem );
            //  Current operator lesser precedence. Pop it and repeat the process
            else if (currPrecedence < prevPrecedence) {
                resArr.push( operatorStack.pop() );
                i --;
            }
            //  Current operators same precedence. Use associativity to compare
            else {
                const RtoL = getAssociativityRtoL( elem );
                if (RtoL) {
                    operatorStack.push( elem );
                } else {
                    resArr.push( operatorStack.pop() );
                    i --;
                }
            }
        }
    }

    //  Push the remanining operators into the result Array
    while ( operatorStack.length > 0 ) {
        resArr.push( operatorStack.pop() );
    }

    return resArr;
}


//  This function takes in an array of expression in PostFix notation, and evaluates them into
//  an array of length one, consisting of final answer

//  This is a pure function, so it will return a new array
function postFixEvaluate( arr ) {
    const operandStack = [];

    for (let i of arr ) {
        //  It is a number, push into operand stack
        if ( !isNaN(i) ) operandStack.push(i);
        else {
            const operand2 = operandStack.pop();
            const operand1 = operandStack.pop();
            switch(i) {
                case '+':
                    operandStack.push( Number(operand1) + Number(operand2) );
                    break;
                case '-':
                    operandStack.push( Number(operand1) - Number(operand2) );
                    break;
                case '*':
                    operandStack.push( Number(operand1) * Number(operand2) );
                    break;
                case '/':
                    operandStack.push( Number(operand1) / Number(operand2) );
                    break;
                case '^':
                    operandStack.push( Number(operand1) ** Number(operand2) );
                    break;
                default: break;
            }         
        }
    }

    //  At the end, if what remains in the operand Stack is not the single answer, return ERROR array
    if (operandStack.length !== 1) return ['ERROR'];
    
    //  Format the answer to fixed precision
    operandStack[0] = String( parseFloat( Number(operandStack[0]).toFixed(10) ) );
    return operandStack;
}


//  This function is used when the user presses a key. Determines the key's function, and perform related operations
//  Returns the new, modified array after the action had been performed.

//  This is a pure function, so it returns a new array
function buttonLogics ( state, btnId ) {
    const inputArr = state.inputArray;
    const len = inputArr.length;

    switch (btnId) {
        case 'equals':
            let arr = state.inputArray.map( e => preProcessEvaluate(e) );
            arr = checkFormatting( arr );
            arr = postFixConversion( arr );
            return postFixEvaluate(arr);
        case 'clear':
            return [];
        case 'zero':
            // If empty array or it only consists of single zero, do nothing
            if (!len || inputArr[len - 1] === '0') return inputArr;
        case 'one':
        case 'two':
        case 'three':
        case 'four':
        case 'five':
        case 'six':
        case 'seven':
        case 'eight':
        case 'nine':
            //  Empty input array. Push directly
            if (!len) return pushNewIntoArr( state, btnId );
            //  Else if consist of single zero only, overwrite the zero
            else if ( inputArr[len - 1] === '0' ) return overWrite( state, btnId);
            else {
                const lastChar = getLastStuff( state );
                
                //  Error, do nothing
                if (lastChar === 'ERR') return inputArr;

                //  Last element is operator. Push new element
                if ( ['+', '-', '*', '/', '^', '%'].includes(lastChar) ) {
                    return pushNewIntoArr( state, btnId );
                }
                else {
                    return appendIntoArr( state, btnId );
                }
            }
        case 'decimal':
            //  Empty input array. Push directly
            if (!len) return pushNewIntoArr( state, 'decimalNew' );
            else {
                const lastChar = getLastStuff( state );

                //  Error, do nothing
                if (lastChar === 'ERR') return inputArr;
                //  Last one is trigo functions or sqrt. Append 0.
                if ( ['sin','cos','tan','√'].includes(lastChar) ) return appendIntoArr(state, 'decimalNew');
                //  Last one is operator. Push new element
                else if ( ['+', '-', '*', '/', '^', '%'].includes(lastChar) ) return pushNewIntoArr(state, 'decimalNew');
                else {
                    const lastElem = state.inputArray[ len - 1];
                    if (lastElem.indexOf('.') !== -1 ) return state.inputArray;
                }
            }
            return appendIntoArr(state, 'decimal');

        case 'percent':
            //  Empty input array. Do nothing
            if (!len) return state.inputArray;
            else {
                const lastChar = getLastStuff( state);

                //  Error, do nothing
                if (lastChar === 'ERR') return inputArr;
                //  Non numbers. Do nothing
                if ( ['sin', 'cos', 'tan', '√', '+' ,'-', '*', '/', '^', '%'].includes(lastChar) ) return state.inputArray;
                return appendIntoArr( state, btnId );
            }

        case 'del':
            //  Empty input array. Do nothing
            if (!len) return state.inputArray;
            else {
                const lastChar = getLastStuff( state );

                //  Error, do nothing
                if (lastChar === 'ERR') return inputArr;

                const lastElem = state.inputArray[ len - 1];
                const lastElemlen = lastElem.length;

                //  If the last element only consists of single character, just remove the element entirely
                if ( lastElemlen === 1) return [...state.inputArray.slice(0, len - 1) ];
                //  If the last element is sin cos or tan, we need to remove those 3 characters trigo function
                //  If it consists of just one trigo function (Not nested like sincostan), remove the element entirely
                else if ( ['sin','cos','tan'].includes(lastChar) ) {
                    if (lastElemlen === 3 ) return [...state.inputArray.slice(0, len - 1) ];
                    return [...state.inputArray.slice(0, len-1), lastElem.slice(0, lastElemlen - 3) ];
                }
                //  Remove single character only, not remove element
                return [...state.inputArray.slice(0, len - 1), lastElem.slice(0, lastElemlen - 1) ];
            }

        case 'sin':
        case 'cos':
        case 'tan':
        case 'sqrt':
            //  Empty input array. Push directly
            if (!len) return pushNewIntoArr(state, btnId);
            else {
                const lastChar = getLastStuff( state );

                //  Error, do nothing
                if (lastChar === 'ERR') return inputArr;

                const lastElem = state.inputArray[ len - 1];

                //  If it is same of a kind, append
                if ( ['sin', 'cos', 'tan', '√'].includes(lastChar) ) return appendIntoArr( state, btnId );
                //  If last element consists of single zero only, overwrite the single zero
                else if (lastElem === '0') return overWrite( state, btnId );
                //  Last element probably is operator or number. Push new element
                else return pushNewIntoArr( state, btnId );
            }

        case 'pow':
            //  Empty input array. Do nothing
            if (!len) return state.inputArray;
            else {
                const lastChar = getLastStuff(state);

                //  Error, do nothing
                if (lastChar === 'ERR') return inputArr;

                //  Operator. Overwrite it
                if ( ['+', '-', '*', '/', '^'].includes(lastChar) ) return overWrite( state, btnId );
                //  trigo functions or sqrt. Do nothing
                else if ( ['sin', 'cos', 'tan', '√'].includes(lastChar) ) return state.inputArray;
                else return pushNewIntoArr( state, btnId );
            }

        case 'subtract':
            //  Empty input array. Do nothing
            if (!len) return state.inputArray;

            //  Use sublastChar so it won't conflict with the fallthrough case of switch statements
            let sublastChar = getLastStuff(state);
            if (sublastChar === 'ERR') return inputArr;

            //  If it is + * or /, append it
            if ( ['+', '*', '/' ].includes(sublastChar) ) return appendIntoArr(state, btnId );
        case 'add':
        case 'multiply':
        case 'divide':
            //  Empty input array. Do nothing
            if (!len) return state.inputArray;
            else {
                const lastChar = getLastStuff(state);

                //  Error, do nothing
                if (lastChar === 'ERR') return inputArr;

                //  Operator. Just overwrite it
                if ( ['+', '-', '*', '/', '^'].includes(lastChar) ) return overWrite( state, btnId );
                //  trigo function or sqrt. Do nothing
                else if ( ['sin', 'cos', 'tan', '√'].includes(lastChar) ) return state.inputArray;
                return pushNewIntoArr( state, btnId );
            }
        
        default: return inputArr;
    }

}


export { buttons, buttonLogics, mapKeyToBtnId };