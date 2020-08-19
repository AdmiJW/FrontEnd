import React from 'react';
import PropType from 'prop-types';




class DrumPad extends React.Component {
    constructor(props) {
        super(props);

        this.onDrumPadClick = this.onDrumPadClick.bind(this);
        this.generateAudioSrc = this.generateAudioSrc.bind(this);
    }


    //  When the drum pad is clicked, just call the callback function. It will be handled in the
    //  DrumPadContainer Component
    onDrumPadClick() {
        const { KbKey, drumPadPressed, audio } = this.props;
        drumPadPressed( KbKey, audio[0] );
    }

    //  A function to generate the audio HTML element for the drum pad Sfx
    generateAudioSrc(src, KbKey) {
        if (src) {
            return (
                <audio className='clip' src={src} id={KbKey} preload='auto' />
            );
        }
        //  If src is empty, then it will not generate the audio HTML element
        return;
    }


    render() {
        const { KbKey, audio } = this.props;
        
        //=================JSX====================
        return (
            <div className='drum-pad' id={ `${ KbKey}-btn` }
                 onClick={this.onDrumPadClick} >
                { KbKey }
                { this.generateAudioSrc(audio[1], KbKey) }
            </div>
        )
        //========================================
    }

}

//====================================================
//  PropTypes, MapStateToProps, MapDispatchToProps
//====================================================
DrumPad.propTypes = {
    KbKey: PropType.string.isRequired,
    drumPadPressed: PropType.func.isRequired,
    audio: PropType.array.isRequired
}

export default DrumPad;