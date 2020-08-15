import React from 'react';
import PropType from 'prop-types';




class DrumPad extends React.Component {
    constructor(props) {
        super(props);

        this.onDrumPadClick = this.onDrumPadClick.bind(this);
    }


    onDrumPadClick() {
        const { KbKey, drumPadPressed, audio } = this.props;
        drumPadPressed( KbKey, audio[0] );
    }

    render() {
        const { KbKey, audio } = this.props;
        
        //=================JSX====================
        return (
            <div className='drum-pad' id={ `${ KbKey}-btn` }
                 onClick={this.onDrumPadClick} >
                { KbKey }
                <audio src={ audio[1] } id={ KbKey } preload='auto' />
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