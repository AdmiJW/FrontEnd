/*
    Blobs, or Binary Large OBjects, are groups of binary data objects with some additional information for us to
    use.
    It can consist of extra information 'type', which is a MIME string specifying the file type of this
    blob object

    To create our own blob object, we would just use the constructor

        new Blob( [blobParts], { options } )

    blobParts are the parts of the blob, which can be either
        >   Another blob
        >   String
        >   BufferSource (ArrayBuffer or TypedBuffer)
    options:
        >   type        (MIME type)
        >   endings

    We can slice part of the blob out (Based on bytes):
        blob.slice( [startingByte], [endingByte], [type] );

    Note that blobs, like string, are immutable
*/

const blob1 = new Blob( ["Hello", " ", "World!"], {type: 'text/plain'} );
console.log(blob1);

const blob2 = blob1.slice(0, 6, {type: 'text/plain'} );
console.log(blob2);



/*
    One such use of a Blob is to used as URL to show its contents in some tags like <a>, <img>, <audio>...
    Since it consists of MIME type information, we can easily perform download/ upload operation from blobs,
    the type property will become the Content-Type header in HTTP requests

    There are 2 ways to make it into usable URL:
        >   Create a URL which maps to the actual Blob itself
        >   Encode the content into a Base 64 string, which can be used as URL

    >   To create mapping URL, we use

            URL.createObjectURL(blob)
    
        Note that the mapping will cause the object to be never released from memory, even if the src attribute
        of elements has changed. This causes memory leak.
        When we did want to release the URL mapping, use

            URL.revokeObjectURL( URL )

    
    >   We can encode the entire content into a Base 64 string, and use it in src or href attributes
        This is done by using a FileReader object

            let fr = new FileReader();
            fr.onload = function() {
                ...Function to do, access using fr.result
            }

            fr.readAsDataURL(blob);

        Filereader will read through the blob object data, and parse it into a base 64 URL. Note that we have to
        set its callback function so it will call it when the parsing is done asynchronously.
*/

const partBlob = new Blob( ["World!"], {type: 'text/plain'} );
const myBlob = new Blob( ["Hello", " ", partBlob], {type: 'text/plain'} );

const fr = new FileReader();

//  Using URL.createObjectURL. REMEMBER To revoke to free up memory
const link1 = document.createElement('a');          // Upon clicking this link, will download
link1.innerHTML = 'Click me to download using URL.createObjectURL!';          
link1.href = URL.createObjectURL( myBlob );         // Make the href of the anchor tag to become the URL of Blob
link1.download = 'helloworld.txt';                  // Make sure it is downloaded, not opened in browser window
link1.addEventListener('click', e => {              // When the link is clicked, after 5 second the URL will be
    setTimeout(() => {                              // revoked and free up memory
        URL.revokeObjectURL( link1.href );
    }, 5000);
})

document.documentElement.appendChild(link1);


//  Using FileReader and converting to Base 64 string
const link2 = document.createElement('a');
link2.innerHTML = 'Click me to download using FileReaders Base 64 URL';
link2.download = 'helloworld.txt';
fr.onload = () => {
    link2.href = fr.result;                 // Upon parsed, it will set the href of anchor tag to the encoded URL
}
fr.readAsDataURL(myBlob);

document.documentElement.appendChild(link2);




/*
    Lastly, blobs can be converted back into ArrayBuffer itself, using FileReader also

        let fd = new FileReader();
        let buffer = fd.readAsArrayBuffer(fd);
*/

const fr2 = new FileReader();
fr2.onload = () => {
    console.log("Converted back into ArrayBuffer: ", fr2.result );
}

fr2.readAsArrayBuffer(myBlob)
