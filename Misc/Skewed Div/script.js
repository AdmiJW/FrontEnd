//  The function of this script is just for intersection observer


//  Navbar
const navbar = document.querySelector('nav');
const jumbotron = document.querySelector('.jumbotron');

const navOptions = {
    threshold: 0.5
}

const navbarIntersectionObserver = new IntersectionObserver((entry, self)=> {
    const { isIntersecting } = entry[0];
    if (isIntersecting) navbar.classList.remove('outJumbotron');
    else navbar.classList.add('outJumbotron');
}, navOptions);

navbarIntersectionObserver.observe(jumbotron);



//  Testimonies
const imgs = document.querySelectorAll('.content2-img');
const quotes = document.querySelectorAll('.content2-quote');
const testimonyOptions = {
    threshold: 0.2
}

const testimonyObserver = new IntersectionObserver((entry, self)=> {
    const { isIntersecting } = entry[0];
    if (isIntersecting) {
        for (const e of entry) {
            e.target.classList.remove('hide');
            self.unobserve(e.target);
        }
    }
}, testimonyOptions);

for (const img of imgs) testimonyObserver.observe(img);
for (const quote of quotes) testimonyObserver.observe(quote);