document.addEventListener('DOMContentLoaded', () => {

//  Note that the SVG Viewbox is set to 200x200. Remember that

//  Structure
//      FACE (g)
//          -BASE (g)
//              > outer round
//              > inner round
//          -FACIAL (g)
//              > left eye
//              > right eye
//              > nose
//              > straight line
//              > mouth
//          -WHISKER (g)
//              > lines of whisker x 6
//      COLLAR (g)
//          > bell
//          > tie

const svgHTML = d3.select('svg');   //  Selects the first SVG HTML element


//  Constructing the base structures
const face = svgHTML.append('g').attr('id', 'face');
const collar = svgHTML.append('g').attr('id', 'collar');

const base = face.append('g').attr('id', 'base');
const facial = face.append('g').attr('id', 'facial');
const whisker = face.append('g').attr('id', 'whisker');

//======================================================
//  Drawing of the Face Base.
//======================================================
//  Drawing of the BASE face. Outer face radius is 95px, will take up 190px total square. Rest 10px for collar
base.append('circle')
    .attr('id', 'outer_base')
    .attr('r', 95)
    .attr('cx', 100)
    .attr('cy', 95)
    .attr('fill', '#00a0e9')
    .attr('stroke', 'black')
    .attr('stroke-width', 1);

base.append('circle')  
    .attr('id', 'inner_base')
    .attr('r', 75)
    .attr('cx', 100)
    .attr('cy', 115)
    .attr('fill', 'white');


//======================================================
//  Drawing of the Facial Proeprties.
//======================================================

//============LEFT EYE=========================
const leftEye = facial.append('g').attr('id', 'left_eye');

leftEye.append('circle')
    .attr('class', 'pupil')
    .attr('r', 20)
    .attr('fill', 'white')
    .attr('stroke', 'black')
    .attr('stroke-width', 1);
leftEye.append('circle')
    .attr('class', 'iris')
    .attr('r', 10)
    .attr('cx', 8);

leftEye.style('transform', 'translate(80px,40px)');

//============RIGHT EYE=========================
const rightEye = facial.append('g').attr('id', 'right_eye');

rightEye.append('circle')
    .attr('class', 'pupil')
    .attr('r', 20)
    .attr('fill', 'white')
    .attr('stroke', 'black')
    .attr('stroke-width', 1);
rightEye.append('circle')
    .attr('class', 'iris')
    .attr('r', 10)
    .attr('cx', -8);

rightEye.style('transform', 'translate(120px, 40px');

//============ NOSE =========================
facial.append('circle')
    .attr('id', 'nose')
    .attr('r', 10)
    .attr('fill', '#e60012')
    .attr('stroke', 'black')
    .attr('stroke-width', 1)
    .style('transform', 'translate(100px, 63px)' );


//============MOUTH=========================
const mouthPath = d3.arc()( {
    innerRadius: 0,
    outerRadius: 55,
    startAngle: Math.PI / 2,
    endAngle: Math.PI * 3 / 2
});
const mouthCurve = d3.arc()( {
    innerRadius: 9,
    outerRadius: 10,
    startAngle: Math.PI,
    endAngle: Math.PI * 2
})

const mouth = facial.append('g').attr('id', 'mouth');

mouth.append('path')
    .attr('id', 'mouth_base')
    .attr('d', mouthPath )
    .attr('fill', '#e60012')
    .attr('stroke', 'black')
    .attr('stroke-width', 1)
mouth.append('path')
    .attr('id', 'mouth_curve')
    .attr('d', mouthCurve)
    .attr('fill', 'black')
    .style('transform', 'translate(-55px,-9.5px )')

mouth.style('transform', 'translate(100px, 120px)')



//============ STRAIGHT LINE =========================
facial.append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', 47)
    .attr('stroke', 'black')
    .attr('stroke-width', 1)
    .style('transform', 'translate(100px, 73px)');


//============ WHISKERS =========================
const leftWhisker = whisker.append('g').attr('id', 'left_whisker');

leftWhisker.append('line')
    .attr('class', 'mid-whisker')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', -80)
    .attr('y2', 0)
    .attr('stroke', 'black')
    .attr('stroke-width', 1);
leftWhisker.append('line')
    .attr('class', 'upper-whisker')
    .attr('x1', 0)
    .attr('y1', -10)
    .attr('x2', -75)
    .attr('y2', -30)
    .attr('stroke', 'black')
    .attr('stroke-width', 1);
leftWhisker.append('line')
    .attr('class', 'lower-whisker')
    .attr('x1', 0)
    .attr('y1', 10)
    .attr('x2', -75)
    .attr('y2', 30)
    .attr('stroke', 'black')
    .attr('stroke-width', 1);

leftWhisker.style('transform', 'translate(80px, 100px)');


const rightWhisker = whisker.append('g').attr('id', 'right_whisker');

rightWhisker.append('line')
    .attr('class', 'mid-whisker')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 80)
    .attr('y2', 0)
    .attr('stroke', 'black')
    .attr('stroke-width', 1);
rightWhisker.append('line')
    .attr('class', 'upper-whisker')
    .attr('x1', 0)
    .attr('y1', -10)
    .attr('x2', 75)
    .attr('y2', -30)
    .attr('stroke', 'black')
    .attr('stroke-width', 1);
rightWhisker.append('line')
    .attr('class', 'lower-whisker')
    .attr('x1', 0)
    .attr('y1', 10)
    .attr('x2', 75)
    .attr('y2', 30)
    .attr('stroke', 'black')
    .attr('stroke-width', 1);
    
rightWhisker.style('transform', 'translate(120px, 100px)');




//======================================================
//  Drawing of the Collar.
//======================================================

//  COLLAR ======================================
const collarPath = d3.arc()({
    innerRadius: 95,
    outerRadius: 105,
    startAngle: Math.PI * 3 / 4,
    endAngle: Math.PI * 5 / 4
});

collar.append('path')
    .attr('d', collarPath)
    .attr('fill', '#e60012')
    .attr('stroke', 'black')
    .attr('stroke-width', 1)
    .style('transform', 'translateY(-105px) ');

//  BELL ============================================
collar.append('circle')
    .attr('r', 10)
    .attr('fill', '#fdd300')
    .attr('stroke', 'black')
    .attr('stroke-width', 1);


collar.style('transform', 'translate(100px, 200px)' );




//  When the svg canvas is clicked, animate the doraemon
const svgHTMLElem = document.querySelector('svg');
const onClickSVG = () => {
    //  Prevent further event triggering until the animation is done
    svgHTMLElem.removeEventListener('click', onClickSVG);

    animateWhisker(leftWhisker);
    animateWhisker(rightWhisker);

    animateEye();

    //  Animation is done. Add the event listener back
    setTimeout(() => {
        svgHTMLElem.addEventListener('click', onClickSVG);
    }, 5000);
};
svgHTMLElem.addEventListener('click', onClickSVG);



});



//  Animates the whisker. Take in the <g> element of whole whisker as argument
function animateWhisker( group ) {
    const oriTrans = group.style('transform');
    group.style('transition', 'transform .5s linear');
    group.style('transform-origin', '0px 0px');
    setTimeout(() => {
        group.style('transform', `${oriTrans} rotate(-10deg)`);
    }, 10);
    setTimeout(() => {
        group.style('transition-duration', '1s');
        group.style('transform', `${oriTrans} rotate(10deg)`);
    }, 500);
    setTimeout(() => {
        group.style('transform', `${oriTrans} rotate(-10deg)`);
    }, 1500);
    setTimeout(() => {
        group.style('transform', `${oriTrans} rotate(10deg)`);
    }, 2500);
    setTimeout(() => {
        group.style('transform', `${oriTrans} rotate(-10deg)`);
    }, 3500);
    setTimeout(() => {
        group.style('transition-duration', '.5s');
        group.style('transform', `${oriTrans} rotate(0deg)`);
    }, 4500);
}



//  Animates the eye. 
function animateEye() {
    const leftIris = document.querySelector('#left_eye .iris');
    const rightIris = document.querySelector('#right_eye .iris');

    leftIris.style.transition = 'cx 1s linear, cy 1s linear';
    rightIris.style.transition = 'cx 1s linear, cy 1s linear';
    

    setTimeout(() => {
        leftIris.setAttributeNS(null, 'cx', -10);
        rightIris.setAttributeNS(null, 'cx', -10);
    }, 10);
    setTimeout(() => {
        leftIris.setAttributeNS(null, 'cx', 10);
        rightIris.setAttributeNS(null, 'cx', 10);
    }, 1000);
    setTimeout(() => {
        leftIris.setAttributeNS(null, 'cx', 0);
        leftIris.setAttributeNS(null, 'cy', -10);
        rightIris.setAttributeNS(null, 'cx', 0);
        rightIris.setAttributeNS(null, 'cy', -10);
    }, 2000);
    setTimeout(() => {
        leftIris.setAttributeNS(null, 'cy', 10);
        rightIris.setAttributeNS(null, 'cy', 10);
    }, 3000);
    setTimeout(() => {
        leftIris.setAttributeNS(null, 'cx', 8);
        leftIris.setAttributeNS(null, 'cy', 0);
        rightIris.setAttributeNS(null, 'cx', -8);
        rightIris.setAttributeNS(null, 'cy', 0);
    }, 4000);
    
}