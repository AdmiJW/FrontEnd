import React from 'react';
import { connect } from 'react-redux';

import ActionCreators from '../Redux/Actions/ActionCreators';


class AudioSrc extends React.Component {
    constructor(props) {
        super(props);

        this.audiofileChanged = this.audiofileChanged.bind(this);
        this.playPauseBtn = this.playPauseBtn.bind(this);
        this.resetBtn = this.resetBtn.bind(this);
    }

    //  TODO IMPLEMENT A VOLUME
    componentDidUpdate() {

    }

    audiofileChanged(e) {
        e.preventDefault();
        const { audio, volume, setAudio } = this.props;
        const elem = e.target;

        //  Request from Local file
        if (e.target.id === 'audiosrc-local-input') {
            
            const files = elem.files[0];
            //  Testing if it is a valid sound file
            if ( files && /audio\/.+/.test(files.type) ) {
                //  If there is a audio previously, stop it from playing (if it does)
                if (audio)
                    audio.pause();

                const audioElem = document.createElement('audio');
                audioElem.volume = 0.1;    //RESET THIS==============================================
                audioElem.onended = () => {     //  Once audio ends, it will reset
                    this.resetBtn();
                }
                const fileReader = new FileReader();
                fileReader.onload = () => {     //  Callback
                    audioElem.src = fileReader.result;
                    setAudio(audioElem, files.name );
                    this.resetBtn();
                }
                fileReader.readAsDataURL(files);
            }
            else {
                alert('You are not providing a valid audio file!')
            }
        }
        //  Request From URL
        else if (e.target.id === 'audiosrc') {
            const url = document.getElementById('audiosrc-online-input').value;

            fetch(url)
            .then(e => console.log(e) )

        }
    }

    playPauseBtn() {
        const { audio, isAudioPlaying, playPause } = this.props;
        if (!audio) return;

        if (isAudioPlaying) {
            audio.pause();
            playPause();
        }
        else {
            audio.play();
            playPause();
        }
    }

    resetBtn() {
        const { audio, resetAudio } = this.props;
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        resetAudio();
    }



    componentDidMount() {
        document.getElementById('audiosrc-close-btn').addEventListener('click', () => {
            this.props.toogleOverlay();
        });
    }

    render() {
        const {  isOverlayShow, audioName , isAudioPlaying } = this.props;

        //===================JSX=====================
        return (
            <div className={ `overlay ${isOverlayShow? '': 'closed-invis'}` } id='overlay' >
                <form className='audiosrc' id='audiosrc' onSubmit={this.audiofileChanged }>
                    <div className='audiosrc-close' id='audiosrc-close'>
                        <i className="fas fa-times" id='audiosrc-close-btn'></i>
                    </div>
                    <div className='audiosrc-local' id='audiosrc-local'>
                        <p>CD Insert Here <i className="fas fa-caret-down"></i></p>
                        <p><small>(Select Audio file from local machine) </small></p>
                        
                        <div className='cd-insert' id='cd-insert'>
                            <label htmlFor='audiosrc-local-input'>
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/DVD_logo.svg/1280px-DVD_logo.svg.png' alt='DVD logo'/>
                            </label>
                        </div>
                        <input type='file' className='audiosrc-local-input hidden' id='audiosrc-local-input' 
                            accept="audio/*" onChange={this.audiofileChanged} />
                    </div>
                    <div className='audiosrc-online' id='audiosrc-online'>
                        <label htmlFor='audiosrc-online-input'>Internet</label>
                        <p><small>(Only raw files allowed)</small></p>
                        <input className='audiosrc-online-input' id='audiosrc-online-input' 
                            type='url' placeholder='Put URL here... ' />
                        <input type='submit' className='audiosrc-online-submit' id='audiosrc-online-submit'
                             value='Go >'/>
                    </div>
                    <div className='audiosrc-control' id='audiosrc-control'>
                        <p>Currently Loaded Audio: </p>
                        <p className='audiosrc-selected' id='audiosrc-selected'>
                            { audioName? audioName: 'Null' }
                        </p>
                        <button type='button' className='audiosrc-startpause' id='audiosrc-startpause' onClick={ this.playPauseBtn }>
                            <i className={ `fas ${isAudioPlaying? 'fa-pause': 'fa-play'}` }></i>
                        </button>
                        <button type='button' className='audiosrc-reset' id='audiosrc-reset' onClick={this.resetBtn } >
                            <i className='fas fa-undo'></i>
                        </button>
                    </div>
                </form>
            </div>
        )
        //===================JSX=====================
    }
}


//====================================================
//  PropTypes, MapStateToProps, MapDispatchToProps
//====================================================


function mapStateToProps( store ) {
    return {
        volume: store.volume,
        isOverlayShow: store.isOverlayShow,
        audio: store.audio,
        audioName: store.audioName,
        isAudioPlaying: store.isAudioPlaying
    };
}

function mapDispatchToProps( dispatch ) {
    return {
        toogleOverlay: () => dispatch( ActionCreators.toogleOverlay() ),
    
        setAudio: (audioElem, audioName) => dispatch( ActionCreators.setAudio(audioElem, audioName) ),
    
        playPause: () => dispatch( ActionCreators.playPause() ),
    
        resetAudio: () => dispatch( ActionCreators.resetAudio() )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioSrc);