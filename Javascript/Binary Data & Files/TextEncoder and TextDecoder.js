//https://javascript.info/binary

/*
    Let's say we have received a binary data that is supposedly representing a text file. How
    would we parse that?

    We have the TextDecoder and TextEncoder class that allows us to convert between binary data
    (ArrayBuffer) and actual string easily
*/

/*
    The syntax of creating a new TextDecoder object are

        new TextDecoder ([encoding], [options])

    where the encoding by default is UTF-8, other values can be accepted
    options : > fatal (boolean) - Determines if it throws error when unable to decode
              > ignoreBOM
*/

let toDecode = new Uint16Array([72, 101, 108, 108, 111] );

const decoder = new TextDecoder();

console.log("Decode result: ", decoder.decode(toDecode) );

toDecode = new Uint8Array([228, 189, 160, 229, 165, 189] );

console.log("Decode result: ", decoder.decode(toDecode) );


/*
    TextEncoder allows us to convert string into binary data (ArrayBuffer), but only in Uint8Array format
*/

let toEncode = 'Hello';

console.log("Encode result: ", new TextEncoder().encode(toEncode) );

toEncode = '你好';

console.log("Encode result: ", new TextEncoder().encode(toEncode) );








console.log('====== END OF TEXTENCODER AND TEXTDECODER =====');
console.log("");
console.log("");
console.log("");