document.addEventListener('DOMContentLoaded', ()=> {

const mountain = document.getElementById('mountain');
const herotxt = document.getElementById('hero-txt');

const img1 = document.getElementById('content-1-img');
const img2 = document.getElementById('content-2-img');
const img3 = document.getElementById('content-3-img');

window.addEventListener('scroll', (e)=> {

    mountain.style.objectPosition = `center ${300 - window.scrollY * 0.4}px`;

    herotxt.style.transform = `translateY(${window.scrollY * 0.3}px)`;

    const scrY = window.scrollY;
    const innerH = window.innerHeight;
    const img1Top = img1.offsetTop;
    const img2Top = img2.offsetTop;
    const img3Top = img3.offsetTop;

    img1.style.backgroundPositionY = Math.min(0, (scrY + innerH - img1Top) * -0.15) + 'px';
    img2.style.backgroundPositionY = Math.min(0, (scrY + innerH - img2Top) * -0.15) + 'px';
    img3.style.backgroundPositionY = Math.min(0, (scrY + innerH - img3Top) * -0.15) + 'px';
})







});