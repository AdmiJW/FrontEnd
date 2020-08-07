const beep = document.createElement('audio');
beep.src = 'https://freesound.org/data/previews/131/131658_2398403-lq.mp3';

const selected = document.createElement('audio');
selected.src = 'https://freesound.org/data/previews/413/413310_1511977-lq.mp3';

const sounds = {
    playBeep: () => {
        beep.load();
        beep.play();
    },
    playSelect: () => {
        selected.load();
        selected.play();
    }
}

export default sounds;