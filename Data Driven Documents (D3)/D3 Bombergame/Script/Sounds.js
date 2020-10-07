
//============================================================
//  Bomb Spawning SFX
//============================================================
export const bombSpawnSFX = document.createElement('audio');
bombSpawnSFX.volume = 0.3;
fetch('https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/Bombspawn.wav')
    .then(response => response.blob() )
    .then(blob => {
        const fr = new FileReader();
        fr.onload = ()=> bombSpawnSFX.src = fr.result;
        fr.readAsDataURL(blob);
    });

//============================================================
//  Bomb Destruction SFX
//============================================================
export const bombDestructSFX = document.createElement('audio');
bombDestructSFX.volume = 0.15;
fetch('https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/BombDestruct.wav')
    .then(response => response.blob() )
    .then(blob => {
        const fr = new FileReader();
        fr.onload = ()=> bombDestructSFX.src = fr.result;
        fr.readAsDataURL(blob);
    });

//============================================================
//  Level Up SFX
//============================================================   
export const levelUpSFX = document.createElement('audio');
levelUpSFX.volume = 0.2;
fetch('https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/Levelup.wav')
    .then(response => response.blob() )
    .then(blob => {
        const fr = new FileReader();
        fr.onload = ()=> levelUpSFX.src = fr.result;
        fr.readAsDataURL(blob);
    });


//============================================================
//  Bomb Button Click SFX
//============================================================   
export const bombButtonClickSFX = document.createElement('audio');
bombButtonClickSFX.volume = 0.2;
fetch('https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/ButtonPress.mp3')
    .then(response => response.blob() )
    .then(blob => {
        const fr = new FileReader();
        fr.onload = ()=> bombButtonClickSFX.src = fr.result;
        fr.readAsDataURL(blob);
    });


//============================================================
//  Menu Button Click SFX
//============================================================  
export const menuButtonClickSFX = document.createElement('audio');
menuButtonClickSFX.volume = 0.2;
fetch('https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/Notification.mp3')
    .then(response => response.blob() )
    .then(blob => {
        const fr = new FileReader();
        fr.onload = ()=> menuButtonClickSFX.src = fr.result;
        fr.readAsDataURL(blob);
    });


//============================================================
//  Game Over SFX
//============================================================  
export const gameOverSFX = document.createElement('audio');
gameOverSFX.volume = 0.2;
fetch('https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/Gameover.wav')
    .then(response => response.blob() )
    .then(blob => {
        const fr = new FileReader();
        fr.onload = ()=> gameOverSFX.src = fr.result;
        fr.readAsDataURL(blob);
    });