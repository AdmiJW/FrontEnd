import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {

    //  Function called when button is pressed
    const btnClicked = (e) => {
        const btnId = e.currentTarget.id;
        const btn = document.getElementById(btnId);
        props.btnClicked( btnId );

        //  Add .pressed class to the button to create visual effect of button press
        btn.classList.add('pressed');
        setTimeout( () => {
            btn.classList.remove('pressed');
        }, 200);
    }


    //  This function takes in the button array, and returns the respective JSX for it
    //  This function exists because some buttons use FontAwesome, and some just pure text inside button
    const mapToDiv = (btnProp) => {
        const [ content , id, isFontAwesome ] = btnProp;

        if (isFontAwesome) {
            return (
                <button type='button' className='button' id={ id } onClick={ btnClicked } >
                    <i className={ content } />
                </button>
            );
        } else {
            return (
                <button type='button' className='button' id={ id } onClick={ btnClicked } >{content}</button>
            );
        }
    }


    //  Returned JSX is here
    return mapToDiv(props.buttonProp);

}

Button.propTypes = {
    btnClicked: PropTypes.func.isRequired,
    buttonProp: PropTypes.array.isRequired
}

export default Button;