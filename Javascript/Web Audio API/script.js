document.addEventListener('DOMContentLoaded', ()=> {

//  Initialization ==========================================================

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

//  The HTML audio element we will mainly use to play audio files uploaded by user
//  When not used, we will just delete its src attribute
const audioHTMLElem = document.createElement('audio');
//  The Node based on HTML audio element above. Will be used to connect to intermediate nodes
const audioHTMLNode = audioCtx.createMediaElementSource( audioHTMLElem );   

//  Currently selected Oscillator nodes
let currOscNode = null;
let currLFONode = null;

//  A function which takes in parameter type like 'square', and create the oscillator. It will be started already
//  so we'll just use connect and disconnect to play or pause the oscillator
const createOsc = (type) => {
    const osc = audioCtx.createOscillator();
    osc.type = type;
    osc.start();
    return osc;
};
const oscNodes = {              //  Object which stores the oscillator nodes to use in Oscillator mode
    'sine': createOsc('sine'),
    'square': createOsc('square'),
    'triangle': createOsc('triangle'),
    'sawtooth': createOsc('sawtooth')
};


const LFOOscNodes = {           //  Object which stores the oscillator nodes to use in LFO effect
    'sine': createOsc('sine'),
    'square': createOsc('square'),
    'triangle': createOsc('triangle'),
    'sawtooth': createOsc('sawtooth')
};


const lfoGainNode = audioCtx.createGain();          //Gain node specifically for LFO only
const gainNode = audioCtx.createGain();             //Gain node for volume control
const panNode = audioCtx.createStereoPanner();      //Stereo Panner node for panning
const filterNode = audioCtx.createBiquadFilter();   //Biquad Filter node for filtering

audioHTMLNode.connect(filterNode).connect(panNode).connect(lfoGainNode).connect(gainNode).connect(audioCtx.destination);

//  When audio HTML element is ended, set the time pointer back to 0 and set the playing state to false
audioHTMLElem.onended = () => {
    audioHTMLElem.currentTime = 0;
    setPlayingState('false');
}

//  Disconnect all audio sources from output (HTML audio element is not disconnected, but src is deleted, if
//  parameter clearFile is true)
function disconnectSrc(clearFile = true) {
    setPlayingState('false');
    if (currOscNode) {
        currOscNode.disconnect();
        currOscNode = null;
    }
    audioHTMLElem.pause();
    audioHTMLElem.removeAttribute('src');
    
    if (clearFile)
        fileInputElem.value = '';
}

//  Disconnect the LFO oscillator from the LFO Gain node
function disconnectLFO() {
    if (currLFONode) {
        currLFONode.disconnect();
        currLFONode = null;
    }
}


//  Sets the audio Playing state to either 'true' or 'false', and set the icon on play pause button
function setPlayingState( state ) {
    const playPauseBtn = document.getElementById('playpause');

    playPauseBtn.dataset.isplaying = state;
    
    if (state === 'false') 
        playPauseBtn.children[0].className = 'fas fa-play';
    else 
        playPauseBtn.children[0].className = 'fas fa-pause';
}


//  Audio File Handling ======================================================
const fileInputElem = document.getElementById('file-input');

fileInputElem.addEventListener('change', e => {
    const audioFile = fileInputElem.files[0];

    //  If file exists, and it is a valid audio file
    if (audioFile && audioFile.type.startsWith('audio') ) {        
        disconnectSrc(false);
        const fileReader = new FileReader();
        
        fileReader.onload = () => {
            document.getElementById('select-osc').value = '';       // Set the oscillator selector to null
            audioHTMLElem.src = fileReader.result;                  
        }
        fileReader.readAsDataURL(audioFile);
    }
    //  Else the file provided is not valid, or null
    else {
        alert('You are not selecting a valid audio file!');
        fileInputElem.value = '';
    }
})



//  Oscillator Handling ======================================================
const oscInput = document.getElementById('select-osc');

oscInput.addEventListener('change', ()=> {
    disconnectSrc();
    currOscNode = oscNodes[oscInput.value];         // Obtain the respective oscillator from the oscNodes Object
})

//  Volume Control ==========================================
const volumeInput = document.getElementById("volume-input");
const volumeDisplay = document.getElementById('volume-num');
gainNode.gain.value = volumeInput.value;       // Initialize the volume

volumeInput.addEventListener('input', () => {
    gainNode.gain.value = volumeInput.value;
    volumeDisplay.innerText = Math.round(volumeInput.value * 100);
});


//  Panning Control ==========================================
const panInput = document.getElementById("panning-input");
const panDisplay = document.getElementById('pan-num');
panNode.pan.value = panInput.value;     // Initialize the pan value

panInput.addEventListener('input', () => {
    panNode.pan.value = panInput.value;
    panDisplay.innerText = panInput.value;
});

//  Oscillator Frequency Control ======================================================
const oscFreqInput = document.getElementById('frequency-input');
const oscFreqDisplay = document.getElementById('frequency-num');

oscFreqInput.addEventListener('input', ()=> {
    //  CHange all the frequency of the oscillators in the oscNodes Object. We are not changing only currentOscillator!
    for (let x in oscNodes) {
        oscNodes[x].frequency.value = oscFreqInput.value;       
    }
    oscFreqDisplay.innerText = `${oscFreqInput.value} Hz`;
});


//  Oscillator Detune Control ======================================================
const oscDetuneInput = document.getElementById('detune-input');
const oscDetuneDisplay = document.getElementById('detune-num');

oscDetuneInput.addEventListener('input', ()=> {
    //  CHange all the detune of the oscillators in the oscNodes Object. We are not changing only currentOscillator!
    for (let x in oscNodes) {
        oscNodes[x].detune.value = oscDetuneInput.value;
    }
    oscDetuneDisplay.innerText = oscDetuneInput.value;
});


//  LFO Control ==========================================
const lfoTypeInput = document.getElementById('select-lfo');

lfoTypeInput.addEventListener('change', ()=> {
    disconnectLFO();
    currLFONode = LFOOscNodes[lfoTypeInput.value];  // Obtain the respective LFO oscillator from the LFOOscNodes Object
    currLFONode.connect(lfoGainNode.gain);          // Connect it immediately to LFO Gain Node
});

//  LFO Freq Control ==========================================
const lfoFreqInput = document.getElementById('lfo-freq-input');
const lfoFreqDisplay = document.getElementById('lfo-freq-num');

lfoFreqInput.addEventListener('input', ()=> {
     //  CHange all the frequency of the oscillators in the LFOOscNodes Object. We are not changing only current LFO Oscillator!
    for (let x in LFOOscNodes) {
        LFOOscNodes[x].frequency.value = lfoFreqInput.value;
    }
    lfoFreqDisplay.innerText = `${lfoFreqInput.value} Hz `;
});



//  Biquad Filter Control ==========================================
const filterTypeInput = document.getElementById('filter-type-input');
const filterFreqInput = document.getElementById('filter-freq-input');
const filterFreqDisplay = document.getElementById('filter-freq-num');
filterNode.frequency.value = filterFreqInput.value;

filterTypeInput.addEventListener('change', ()=> {
    filterNode.type = filterTypeInput.value;
});

filterFreqInput.addEventListener('input', ()=> {
    filterNode.frequency.value = filterFreqInput.value;
    filterFreqDisplay.innerText = `${filterFreqInput.value} Hz`
})


//  Play and Pause Button ==========================================
const playPauseBtn = document.getElementById('playpause');

playPauseBtn.addEventListener('click', ()=> {
    //  Remember that without user gesture, the Audio Context will default be suspended state!s
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    //  If the src is not deleted (Meaning we loaded a audio file)
    if (audioHTMLElem.src) {
        
        if (playPauseBtn.dataset.isplaying === 'false') {
            audioHTMLElem.play();
            setPlayingState('true');
        }
        else if (playPauseBtn.dataset.isplaying === 'true') {
            audioHTMLElem.pause();
            setPlayingState('false');
        }
    }
    //  Else, if the current Oscillator selected is not null (Meaning we selected an oscillator node)
    else if (currOscNode) {
        if (playPauseBtn.dataset.isplaying === 'false') {
            //  To play the oscillator nodes, we just do connect() to the intermediate nodes
            currOscNode.connect(filterNode);
            setPlayingState('true');
        }
        else if (playPauseBtn.dataset.isplaying === 'true') {
            //  To stop the oscillator nodes, we just do disconnect(). Calling stop() will cause it to never be
            //  able to play again!
            currOscNode.disconnect();
            setPlayingState('false');
        }
    }
});

//  Stop Button ==========================================
const stopBtn = document.getElementById('stop')

stopBtn.addEventListener('click' , () => {
    audioHTMLElem.pause();
    audioHTMLElem.currentTime = 0;
    setPlayingState('false');

    currOscNode.disconnect();
})

});