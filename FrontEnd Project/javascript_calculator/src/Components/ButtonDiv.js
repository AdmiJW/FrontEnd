import React from 'react';
import PropTypes from 'prop-types';

import { buttons } from '../ButtonsUtil';

import Button from './Button';


class ButtonDiv extends React.Component {


    render() {
        
        //  The function which when take in a button array, will convert into respective JSX button element
        const mapToDiv = (btn) => {
            return (
                <Button buttonProp={ btn } key={ btn[1] } btnClicked={ this.props.btnClicked } />
            );
        }
        

        return (
        //-----------------------JSX------------------------------
        <div className='buttons' id='buttons'>
            { 
                buttons.map( btn => mapToDiv(btn) )
            }
        </div>

        //--------------------------------------------------------
        )
    }

}


ButtonDiv.propTypes = {
    btnClicked: PropTypes.func.isRequired
}


export default ButtonDiv;