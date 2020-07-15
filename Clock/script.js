document.addEventListener('DOMContentLoaded', function() {

// --------------------------
//  NUMBER PLACEMENT
// --------------------------

function placeNumber(e) {
    let H = (document.getElementById('clock').offsetWidth / 2 ) * 0.7;
    let offsetx = e.offsetWidth / 2;
    let offsety = e.offsetHeight / 2;
    let deg = e.innerText % 12 * 30;
    let radian = deg / 180 * Math.PI;

    let dispx = H * Math.sin(radian);
    let dispy = H * Math.cos(radian);

    e.style.top = `calc(50% - ${offsety}px)`;
    e.style.left = `calc(50% - ${offsetx}px)`;

    e.style.transform = `translate(${dispx}px, ${-dispy}px)`;
}
for (let i = 1; i <= 12; i ++ ) {
    placeNumber( document.getElementById(i) );
}
window.addEventListener('resize', function() {
    for (let i = 1; i <= 12; i ++ ) {
        placeNumber( document.getElementById(i) );
    }
});

// ----------------------------
//  CLOCK LOGIC
// --------------------------

//Since in the HTML the pointers are pointing down initially, we need to add a offset of 180deg to make it upright
const offset = 180;

const time = new Date();
let dHr = time.getHours();
let hr = dHr % 12;
let min = time.getMinutes();
let sec = time.getSeconds();

//------------------------------------------------------------------------------
//Functions to obtain the degree for each pointer using time passed in as argument
function getSecDeg(sec) {
    return ( sec * 6 + offset) % 360;
}
function getMinDeg(min, sec) {
    return ( min * 6 + (sec / 60 * 6) + offset ) % 360;
}
function getHrDeg(hr, min) {
    return ( hr * 30 + (min / 60 * 30) + offset ) % 360;
}
//----------------------------------------------------------------------------



//--------------------------------------------------------------------------------------------------
//Function to set the pointers to its respective degree, with degree of each pointer passed as arguments
function setPointers(hrDeg, minDeg, secDeg) {
    document.getElementById('hour').style.transform = `rotate(${hrDeg}deg)`;
    document.getElementById('minute').style.transform = `rotate(${minDeg}deg)`;
    document.getElementById('second').style.transform = `rotate(${secDeg}deg)`;
}
//----------------------------------------------------------------------------------------------------

let hrDeg = getHrDeg(hr, min);
let minDeg = getMinDeg(min, sec);
let secDeg = getSecDeg(sec);

setPointers( hrDeg, minDeg, secDeg );

//-----------------------------------------------------------------------------------------------------------
//You may change the loopmilis, which determine how long each interval shall be. Should not touch timeMultipler!
let loopmilis = 1000;
let timeMultipler = loopmilis / 1000;

const interval = setInterval( function() {
    secDeg = (secDeg + 6 * timeMultipler)  % 360;
    minDeg = (minDeg + 0.1 * timeMultipler ) % 360;
    hrDeg = (hrDeg + (1/120) * timeMultipler ) % 360;
    setPointers(hrDeg, minDeg, secDeg);
}, loopmilis);

//----------------------------------------------------------------------------------------------------------

function setDigital(hr, min, sec) {
    document.getElementById('d-hr').innerText = (hr / 10 < 1)? "0" + hr: hr;
    document.getElementById('d-min').innerText = (min / 10 < 1)? "0" + min: min;
    document.getElementById('d-sec').innerText = (sec / 10 < 1)? "0" + sec: sec;
}
setDigital(dHr, min, sec);

let toogler = false;
const colons = document.getElementsByClassName('colon');
let d_interval = setInterval( function() {
    if (toogler) {
        dHr = (min == 59 && sec == 59)? (dHr + 1) % 24: dHr;
        min = ( (sec + 1) / 60 >= 1)? (min + 1) % 60: min;
        sec = (sec + 1) % 60;
        setDigital(dHr, min, sec);
        for (e of colons) e.style.opacity = '1';
    }
    else {
        for (e of colons) e.style.opacity = '0';
    }
    toogler = !toogler;
}, 500);

});