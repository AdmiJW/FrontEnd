import React from 'react';

import QuoteWrapper from './QuoteWrapper';


//Function to return the JSX of the backgrounds.
function obtainBGJSX(visibleBGID) {
    const visibleVal = [];
    for (let i = 0; i < 5; i ++ ) {
        visibleVal.push( visibleBGID === i? 1: 0);
    }
    return (
        <React.Fragment>
            <div className='bg' id='bg-1' style={ {opacity: visibleVal[0] } } ></div>
            <div className='bg' id='bg-2' style={ {opacity: visibleVal[1] } } ></div>
            <div className='bg' id='bg-3' style={ {opacity: visibleVal[2] } } ></div>
            <div className='bg' id='bg-4' style={ {opacity: visibleVal[3] } } ></div>
            <div className='bg' id='bg-5' style={ {opacity: visibleVal[4] } } ></div>
        </React.Fragment>
    );
}

class MainDiv extends React.Component {
    constructor(props) {
        super(props);

        this.changeBg = this.changeBg.bind(this);
    }

    state = {
        currBg: 0
    };

    changeBg() {
        this.setState(state => {
            return { currBg: (state.currBg >= 4? 0: state.currBg + 1) };
        });
    }


    render() {
        return (
            <React.Fragment>
                { obtainBGJSX(this.state.currBg) }
                <QuoteWrapper changeBg={this.changeBg}/>
            </React.Fragment>
        );
    }

}

export default MainDiv;