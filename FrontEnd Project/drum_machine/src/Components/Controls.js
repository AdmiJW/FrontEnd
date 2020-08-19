import React from 'react';
import PropType from 'prop-types';

import ActionCreator from '../Redux/Actions/ActionCreators';
import { connect } from 'react-redux';

class Controls extends React.Component {
    constructor(props) {
        super(props);

        this.powerBtnPress = this.powerBtnPress.bind(this);
        this.bankModeChanged = this.bankModeChanged.bind(this);
        this.volumeBtnPress = this.volumeBtnPress.bind(this);
        this.openAudioPanel = this.openAudioPanel.bind(this);

        this.maxVolDegree = 300;
    }

    //  Triggered when the power button is pressed: Show some animation and dispatch action
    powerBtnPress(e) {
        const powerBtn = document.getElementById('power-btn');
        powerBtn.className = 'power-btn btn-press';

        this.props.togglePower();

        setTimeout(() => {
            powerBtn.className = 'power-btn';
        }, 500);
    }

    //  Opens the audio overlay window
    openAudioPanel() {
        this.props.toogleOverlay();
    }

    //  Will return a CSS transform property which applies the rotation degree for window notch
    getRotationStyle() {
        const deg = this.props.volume * this.maxVolDegree / 100;
        return {transform: `rotate(${deg}deg)`};
    }
    //  Get the volume set based on the degree of the mouse from the center of the element
    getRotationVolume(deg) {
        return Math.round(100 * deg / this.maxVolDegree );
    }

    //  When the user mousedown (or touch hold) the volume notch, we need to apply the onmove event
    //  on the notch itself, and will keep track of the degree from the center of notch, which determines
    //  the volume
    volumeBtnPress(e) {
        const spinner = e.target;
        const [ height, width, x, y ] = [spinner.clientHeight, spinner.clientWidth, 
                                        spinner.offsetLeft, spinner.offsetTop];
        const center = [x + width / 2, y + height / 2];

        const move = (e) => {
            let [ mousex, mousey ] = [ e.clientX, e.clientY ];
            if (!mousex) {
                const touch = e.touches[0];
                mousex = touch.clientX;
                mousey = touch.clientY;
            }
            const atan = Math.atan( Math.abs(center[1] - mousey) / Math.abs(center[0] - mousex) )
            const deg = atan * 180 / Math.PI;
            
            //  First Quadrant
            if (mousex >= center[0] && mousey <= center[1] ) {
                this.props.volumeChange( this.getRotationVolume(90 - deg) );
            }
            //  Second Quadrant
            else if (mousex <= center[0] && mousey <= center[1] ) {
                if (deg > this.maxVolDegree - 270) return;
                this.props.volumeChange( this.getRotationVolume(270 + deg) );
            }
            //  Third Quadrant
            else if (mousex < center[0] ) {
                this.props.volumeChange( this.getRotationVolume(270 - deg) );
            }
            //  Fourth Quadrant
            else {
                this.props.volumeChange( this.getRotationVolume(90 + deg) );
            }
        }

        //  Applies the event listener when the user moves while holding down on the volume notch
        spinner.addEventListener('mousemove', move);
        spinner.addEventListener('touchmove', move);

        //  Applies event listener when the user releases the volume notch, to remove the move event listener
        spinner.addEventListener('mouseup', () => {
            spinner.removeEventListener('mousemove', move);
        });
        spinner.addEventListener('mouseleave', () => {
            spinner.removeEventListener('mousemove', move);
        });
        spinner.addEventListener('touchend', () => {
            spinner.removeEventListener('mousemove', move);
        });

    }

    //  Called when the bank selected is changed
    bankModeChanged(e) {
        const slider = e.target;
        this.props.changeBank( Math.round(slider.value / 50) );
    }


    render() {
        //========== JSX =============
        return (
            <div className='control-panel'>
                <div className='control-volume' id='control-volume'>
                    <label htmlFor='volume-spinner'>Volume: </label>
                    <div className='volume-spinner' id='volume-spinner' 
                        style={ this.getRotationStyle() } 
                        onMouseDown={this.volumeBtnPress }
                        onTouchMove={this.volumeBtnPress } />
                </div>
                <div className='control-audio'>
                    <label htmlFor='audio-panel'>Audio In</label>
                    <div className='audio-panel' id='audio-panel' onClick={ this.openAudioPanel }>
                    </div>
                </div>
                <div className='control-power' id='control-power'>
                    <button type='button' className='power-btn' id='power-btn' onClick={this.powerBtnPress } >
                        <i className="fas fa-power-off"></i>
                    </button>
                </div>
                <div className='control-bank' id='control-bank'>
                    <label htmlFor='bank-slider'>
                        <span className='bank-left'>Acoustic</span>
                        <span className='bank-mid'>DJ Jihong</span>
                        <span className='bank-right'>8 Bit</span>
                    </label>
                    <input type='range' step='50' className='bank-slider' id='bank-slider'
                        onChange={this.bankModeChanged} value={this.props.currentBank * 50} />
                </div>
            </div>
        );
        //==========================
    }
}


//====================================================
//  PropTypes, MapStateToProps, MapDispatchToProps
//====================================================
Controls.propTypes = {
    volume: PropType.number.isRequired,
    currentBank: PropType.number.isRequired,

    togglePower: PropType.func.isRequired,
    volumeChange: PropType.func.isRequired,
    changeBank: PropType.func.isRequired,
    toogleOverlay: PropType.func.isRequired
}

function mapStateToProps( store ) {
    return {
        volume: store.volume,
        currentBank: store.currentBank
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        togglePower: () => dispatch(ActionCreator.togglePower() ),
        volumeChange: (volume) => dispatch(ActionCreator.volumeChange(volume) ),
        changeBank: (code) => dispatch(ActionCreator.changeBank(code) ),
        toogleOverlay: () => dispatch(ActionCreator.toogleOverlay() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);