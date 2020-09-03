import React from 'react';

import ButtonDiv from './ButtonDiv';
import Screen from './Screen';

import { buttonLogics, mapKeyToBtnId } from '../ButtonsUtil';

class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.btnClicked = this.btnClicked.bind(this);

        this.audioElem = document.createElement('audio');
    }

    componentDidMount() {
        //  Event listener for user keyboard press
        document.addEventListener('keydown', (e) => {
            if ( e.key in mapKeyToBtnId ) {
                document.getElementById( mapKeyToBtnId[e.key] ).click();
            }
        });

        fetch('https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/office-calculator-single-button-press.mp3')
        .then(response => response.blob() )
        .then(data => {
            const fr = new FileReader();
            fr.onload = () => {
                this.audioElem.src = fr.result;
            }

            fr.readAsDataURL(data);
        })
        .catch(e => {
            console.log('Fetching failed. Setting sound file directly as URL')
            this.audioElem.src = 'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/office-calculator-single-button-press.mp3'
        });

    }
    
    state = {
        inputArray: []
    }


    //  Triggered when button is clicked. This function is passed down until the individual Button element as callback
    //  (Drilling). This is because to use setstate in this Component only
    btnClicked( btnId ) {
        this.audioElem.currentTime = 0;
        this.audioElem.play();

        this.setState( (prevState) => ({
            inputArray: buttonLogics( prevState, btnId )
        }) );
    }

    render() {
        return (
        // ---------------------------JSX--------------------------------
            
            <div className='calculator' id='calculator'>
                <Screen inputArray={ this.state.inputArray } />
                <ButtonDiv btnClicked={this.btnClicked} />
            </div>

        //--------------------------------------------------------------
        );
    }

}


export default Calculator;