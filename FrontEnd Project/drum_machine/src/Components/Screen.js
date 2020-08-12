import React from 'react';

class Screen extends React.Component {


    render() {
        //========== JSX =============
        return (
            <div className='machine-screen' id='machine-screen'>
                <div className='screen-bank'>
                    <span className='bank-name' id='bank-name'>BANK: </span>
                    <span className='bank-content' id='bank-content'></span>
                </div>
                <div className='screen-volume'>
                    <span className='volumne-name' id='volume-name'>VOLUME: </span>
                    <span className='volume-content' id='volume-content'></span>
                </div>
                <div className='screen-sfx'>
                    <span className='sfx-name' id='sfx-name'>SFX: </span>
                    <span className='sfx-content' id='display'></span>
                </div>
            </div>
        );
        //==========================
    }
}

export default Screen;