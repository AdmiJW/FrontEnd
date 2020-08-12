import React from 'react';

import DrumPad from './DrumPad';

class DrumPadContainer extends React.Component {


    render() {
        //========== JSX =============
        return (
            <div className='drum-pad-container'>
                <DrumPad />
                <DrumPad />
                <DrumPad />
                <DrumPad />
                <DrumPad />
                <DrumPad />
                <DrumPad />
                <DrumPad />
                <DrumPad />
            </div>
        );
        //==========================
    }
}

export default DrumPadContainer;