import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import ActionCreators from '../Redux/Actions/ActionCreators';


class AudioSrc extends React.Component {
    constructor(props) {
        super(props);

        this.audiofileChanged = this.audiofileChanged.bind(this);
        this.playPauseBtn = this.playPauseBtn.bind(this);
        this.resetBtn = this.resetBtn.bind(this);
        this.volChanged = this.volChanged.bind(this);
    }

    //  Called when the user selects a local file or submitted a URL to external audio file
    audiofileChanged(e) {
        e.preventDefault();
        const { audio, volume, setAudio } = this.props;
        const elem = e.target;

        //  The new audio HTML element, which we will dispatch to store when we set the src attribute
        const audioElem = document.createElement('audio');
        audioElem.volume = document.getElementById('audiosrc-volume-input').value;
        audioElem.onended = () => {     //  Once audio ends, it will reset
            this.resetBtn();
        }
        const fileReader = new FileReader();

        //  Request from Local file
        if (e.target.id === 'audiosrc-local-input') {
            
            const files = elem.files[0];
            //  Testing if it is a valid sound file
            if ( files && files.type.startsWith('audio') ) {
                //  If there is a audio previously, stop it from playing (if it does)
                if (audio)
                    audio.pause();

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
            const proxy = 'https://cors-anywhere.herokuapp.com/';   //  Proxy to prevent CORS error

            fetch(url)
            .catch(e => fetch(proxy + url, {headers: {'Origin': ''} }) )        //Attempt proxy 1
            .then(e => e.blob() )
            .then(blob => {
                //  If the url file fetched back was a valid audio file
                if (blob.type.startsWith('audio') ) {
                    //Stop the audio playing, if it was
                    if (audio)
                        audio.pause();

                    fileReader.onload = () => {     //  Callback
                        audioElem.src = fileReader.result;
                        setAudio(audioElem, url );
                        this.resetBtn();
                    }
                    fileReader.readAsDataURL(blob);
                }
                else
                    return Promise.reject();
            })
            .catch(e => {
                alert('Unable to load Audio URL!');
            })
        }
    }

    //  Called when the play or pause button is clicked
    playPauseBtn() {
        const { audio, isAudioPlaying, playPause } = this.props;
        if (!audio) return;     //  There is no audio HTML element, therefore do nothing

        if (isAudioPlaying) {
            audio.pause();
            playPause();
        }
        else {
            audio.play();
            playPause();
        }
    }

    //  Called when the stop button is clicked
    resetBtn() {
        const { audio, resetAudio } = this.props;
        //  If there is HTML audio element, stop it and reset time to 0
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        resetAudio();
    }


    //  Called when the volume slider is changed.
    volChanged(e) {
        const { audio } = this.props;
        if (audio) {
            audio.volume = e.target.value;
        }
    }


    //  Just apply event listener to the close button so it closes the window on click
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
                            type='url' placeholder='Enter URL here...' defaultValue='https://www.ee.columbia.edu/~dpwe/sounds/music/mambo_no_5-lou_bega.wav' />
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
                    <div className='audiosrc-volume' id='audiosrc-volume'>
                        <label htmlFor='audiosrc-vol-input'>Volume: </label>
                        <input type='range' className='audiosrc-volume-input' id='audiosrc-volume-input'
                            min='0' max='1' step='0.01' onInput={ this.volChanged } />
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

AudioSrc.propTypes = {
    volume: PropTypes.number.isRequired,
    isOverlayShow: PropTypes.bool.isRequired,
    audio: PropTypes.object,
    audioName: PropTypes.string.isRequired,
    isAudioPlaying: PropTypes.bool.isRequired,

    toogleOverlay: PropTypes.func.isRequired,
    setAudio: PropTypes.func.isRequired,
    playPause: PropTypes.func.isRequired,
    resetAudio: PropTypes.func.isRequired
}

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