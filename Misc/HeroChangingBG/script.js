document.addEventListener('DOMContentLoaded', () => {
    const colToBg = {
        'col-1': 'bg-1',
        'col-2': 'bg-2',
        'col-3': 'bg-3',
        'col-4': 'bg-4'
    };

    const cols = document.getElementsByClassName('column-contents');

    for (let e of cols) {
        const target = document.getElementById(colToBg[e.id] );

        e.addEventListener('mouseenter', () => {
            target.style.opacity = 1;
        });
        e.addEventListener('mouseleave', () => {
            target.style.opacity = 0;
        });
    }

});