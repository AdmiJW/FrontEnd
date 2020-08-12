import React from 'react';

class Controls extends React.Component {


    render() {
        //========== JSX =============
        return (
            <div className='control-panel'>
                <div className='control-volume' id='control-volume'>
                    {/* <label for='volume-spinner'>Volume: </label> */}
                    <div class='volume-spinner' id='volume-spinner' />
                </div>
                <div className='control-power' id='control-power'>
                    <button type='button' className='power-btn' id='power-btn'>
                        <i className="fas fa-power-off"></i>
                    </button>
                </div>
                <div className='control-bank' id='control-bank'>
                    <label for='bank-slider'>
                        <span className='bank-left'>Drum 1</span>
                        <span className='bank-mid'>Drum 2</span>
                        <span className='bank-right'>Drum 3</span>
                    </label>
                    <input type='range' step='50' className='bank-slider' id='bank-slider' />
                </div>
            </div>
        );
        //==========================
    }
}

export default Controls;