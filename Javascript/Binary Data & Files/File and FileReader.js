document.addEventListener("DOMContentLoaded", ()=> {
setTimeout(() => {
    


/*
    In Javascript, Files are inherited from Blob object. That means all of the properties that Blob has,
    File object has it too

    The two main ways to obtain a File object are:
        >   Constructor, with the syntax:
            
                new File( fileParts, fileName, [options] );
            - fileParts are also an array of Blobs, string, or BufferSource (ArrayBuffer or TypedArray)
            - options
                >   lastModified (Timestamp indicating the time when file was last modified)
        
        >   Through input type='file' or drag and drop from broswer           
*/ 

const myFile = new File( ['Hello', " ", "World!"], 'Helloworld.txt', {type: 'text/plain'} );
console.log("My sample file: ", myFile);

const inputElem = document.getElementById('fileinput');

inputElem.addEventListener('change', (e)=> {
    console.log("Input element's file: ", e.target.files[0] );
});



/*
    FileReader's purpose is to read binary data from Blob objects, and so File objects can be read by it too.
    Creating a FileReader is straightforward

        let fr = new FileReader();

    We have several options of reading for FileReader:
    
        >   readAsArrayBuffer(blob)                         (Reads the file, and make it into ArrayBuffer (binary data) )
        >   readAsText(blob, [encoding] )                   (Reads the file and decode it into string. Default is UTF-8) )
        >   readAsDataURL(blob)                             (Reads the file and encode it into base 64 data URL, whcih
                                                            can be used in src or href attribute of some tags)
        >   abort()                                         (Abort ongoing reading operation)
    
    Reading datas are asynchronous events, and so it uses event to deliver data:
        >   loadstart
        >   progress        (Loading inProgress)
        >   load            (Loading completed)
        >   abort           (abort() called)
        >   error           (Error occurred)
        >   loadend         (Either load finished or aborted or error)

    To access the data, we have to access it from callback function, with following:
            
        >   reader.result
        >   reader.error
    
*/

const audioInput = document.getElementById('audioinput');
audioInput.addEventListener('change', (e)=> {
    const audioFile = e.target.files[0];        //Obtain the audio file selected by user
    if ( !audioFile ) return;                   //If there is no audio file, do nothing
    const fr = new FileReader();

    fr.onload = () => {
        document.getElementById('audiocontrol').src = fr.result;    //Upon parsed, set src attribute of audio element
    }
    fr.readAsDataURL( audioFile );
})




}, 100);
});