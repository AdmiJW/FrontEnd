import React from 'react';

import MotivationQuote from './MotivationQuote';
import Note from './Note';
import Timer from './Timer';
import ConfigWin from './ConfigWin';

class Main extends React.Component {

    render() {
        return (
        //  JSX ==================
            <main className='main' id='main'>
                <ConfigWin />
                <MotivationQuote />

                <div className='timer-and-note' id='timer-and-note'>
                    <Note />
                    <Timer />
                </div>
            </main>
        // ========================
        );
    }
}

export default Main;