//https://javascript.info/binary


/*
    We have to deal with binary datas when we are dealing with files, or image processing
    
    Although the HTML's input type=file already had done a lot of us, we may want to process the file with client side machine before
    sending it to the server, to reduce server side load

    In JS, the most basic form of binary data is stored in the form of ArrayBuffer object.
    ArrayBuffer - A reference to a fixed-length, contiguous memory area, which stores the binary data
    (Note that although it has Array name in it, it is nothing like Array)

    We can create our own binary data through ArrayBuffer class, like so:
*/

let buffer = new ArrayBuffer(16);           //  Creates an binary data object, of length 16 bytes (16*8 bits), all initialized to 0
console.log("The ArrayBuffer Object: ", buffer);

/*
    We can't manipulate the data through the ArrayBuffer object itself. We would require a VIEW which allows us to
    manipulate and view the data. (Those views can be called TypedArray)

    >   Uint8Array          (Unsigned integer of 8 bits (1 byte). Ranges from 0 to 255)
    >   Uint16Array         (Unsigned integer of 16 bits (2 byte). Ranges from 0 to 65535)
    >   Uint32Array         (Unsigned integer of 32 bits (4 byte). Ranges from 0 too 4294967296)
    >   Float64Array        (Float number of 64 bits (8 byte) )
        ...and some more

    To create a TypeArray (view) object, we use following syntaxes:
    (TypedArray is placeholder for one of above names)

    >   new TypedArray (buffer, [byteoffset], [length] );           (Create a view object based on BufferArray passed in.
                                                                    byteOffset tells it position to start reading from (in bytes shifted) )
    >   new TypedArray (object);                                    (Here we can pass in an Array-like object, which the view will create
                                                                    the array back like in original array, but this time is in TypeArray)
    >   new TypedArray (typedArray);                                 (We can pass in another typedArray of different or similar type)
    >   new TypedArray (length);                                    (Creates a new TypedArray object with specified byte length. All initialize to 0)
    >   new TypedArray ();                                          (Empty TypedArray)

    Some properties we can access are:
        
    typedArray.buffer                   (Gets the original ArrayBuffer object)
    typedArray.byteLength               (Refers to the length of the ArrayBuffer in bytes)
*/

let arrayOfOnes = [255, 255, 256, 257];       //  255 is equal to 11111111 (8 bit of 1), so 256 is 100000000

const typed16Arr = new Uint16Array(arrayOfOnes);       //  Takes in an array which has the data we want

console.log("View of Uint16Array", typed16Arr);     // 255, 255, 256, 257

const typed8ArrOverflow = new Uint8Array(typed16Arr);     //  Takes in the Uint16Array object

console.log("View of Uint8Array", typed8ArrOverflow)     //Since 256, 257 requires 9 bit to represent, it simply overflowed and we obtain 0 and 1


/*
        When datas overflow, only rightmost bits are preserved. The rest are discarded. Thats why 256 (100000000) => (00000000)
*/


/*
    We have Dataview class, which let's us create an All-In-One view for an ArrayBuffer object exist

    we access the different views using methods like
    >   dataview.getUint8(idx)
    >   dataview.getUint16(idx)
    >   dataview.getUint32(idx)

    This above methods will not return us a new view object. It just retrieves the first chunk of binary data and returns it represented
    in the format specified
*/

arrayOfOnes = [255, 255, 256, 257];
const arrayBuffer = new Uint16Array(arrayOfOnes).buffer;       //   Obtain the buffer object for the arrayOfOnes

console.log("byteLength: ", arrayBuffer.byteLength);        //  The original binary data shall be 64 bits long, (16 bits * 4), each represents
                                                            // 255, 255, 256, 257

// 0000 0000 1111 1111 | 0000 0000 1111 1111 | 0000 0001 0000 0000 | 0000 0001 0000 0001 //
// Where the leading zeros are ignored!!!!!!!!!!

const dataview = new DataView(arrayBuffer);

console.log("First int8", dataview.getInt8(0) );        //Retrieves the first 8 bit (1111 1111), and returns it in 8 bit integer representation
console.log("First Uint8", dataview.getUint8(0));       //Retrieves the first 8 bit (1111 1111), and returns it in Unsigned 8 bit integer representation
console.log("First Uint16", dataview.getUint16(0));     //Retrieves the first 16 bit (1111 1111 0000 0000), and returns it in 8 bit 
                                                        //integer representation


// EXAMPLE OF CONCATENATION METHOD:

const toConcat = [
    new Uint8Array([0,1,2] ),
    new Uint8Array([3,4,5] ),
    new Uint8Array([6,7,8] )
];

let temp = [];
toConcat.forEach(e => {
    temp.push(...e);
})
const concatenated = new Uint8Array(temp);
console.log("Concatenated ArrayBuffer", concatenated);




console.log('====== END OF ARRAYBUFFER AND TYPEARRAY =========');
console.log("");
console.log("");
console.log("");
console.log("");

