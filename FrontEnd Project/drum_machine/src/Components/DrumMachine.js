import React from 'react';

import Screen from './Screen';
import Controls from './Controls';
import DrumPad from './DrumPadContainer';

class DrumMachine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //========== JSX =============
        return (
            <main className='drum-machine' id='drum-machine'>
                <Screen />
                <Controls />
                <DrumPad />
            </main>
        );
        //============================
    }
}

export default DrumMachine;