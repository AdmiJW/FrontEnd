// Text typer
const tt = new TextTyper( document.getElementById('jumbotron__h1') );
tt.settings({
    typeCPS: 10,
    deleteCPS: 20,
    cursorSettings: {
        cursorStyling: TextTyper.CURSOR_STYLE__
    }
})

tt.eventQueue()
    .typeText('Front End Development')
    .standby(8000)
    .deleteChar()
    .standby(500)
    .loop()
    .start();

//  Navbar
const nav = document.querySelector('nav');

document.querySelector('.nav-toggler').onclick = ()=> {
    nav.classList.toggle('shown');
}

//  Collapsibles
const collapsibles = [
    'bootstrap', 'd3', 'git',
    'url', 'md', 'misc'
];

collapsibles.forEach(e => {
    const collapsed = document.getElementById(`${e}-list`);
    document.getElementById(`${e}-expand`).onclick = ()=> {
        collapsed.classList.toggle('show');
    }
});


//  Handle link click by showing on iframe
const iframe = document.querySelector('iframe');
const link = document.getElementById('link-to-project');

function linkClicked(e) {
    const url = e.dataset.url;
    iframe.src = url;
    link.href = url;
}

