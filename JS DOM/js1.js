document.addEventListener('DOMContentLoaded', function() {

    const btnlist = document.getElementsByClassName('btnA');
    Array.prototype.forEach.call(btnlist, elem => {
        elem.addEventListener('click', e => {
            const code = e.target.parentElement.previousElementSibling.firstElementChild.innerText;
            let res = eval(code);
            console.log(res);
            let re;
            if (res instanceof HTMLElement || res instanceof HTMLCollection || res instanceof HTMLAllCollection) {
                re = '[' + Array.prototype.join.call(res, ', ') + ']';
                e.target.parentElement.innerHTML = re;
            }
            else
                e.target.parentElement.innerHTML = (!res)? "No Item to display": res;
        });
    });





});