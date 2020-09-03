import React from 'react';
import PropTypes from 'prop-types';


class Screen extends React.Component {
    constructor(props) {
        super(props);

        this.renderLastElem = this.renderLastElem.bind(this);
        this.renderFormula = this.renderFormula.bind(this);
    }

    //  Takes in the input Array. Concat the contents of the input array into one single string seperated by spaces
    renderFormula( inputArr ) {
        return inputArr.join(" ");
    }

    //  IF input array is empty, return 0
    //  else return the last element of input array as string
    renderLastElem( inputArr ) {
        const len = inputArr.length;
        if (!len) return '0';
        return inputArr[ len - 1];
    }


    render() {
        const inputArr = this.props.inputArray;
        return (
        //--------------------------JSX--------------------------------

        <div className='screen'>
            <div className='screen-formula'>
                { this.renderFormula( inputArr) }
            </div>
            <hr/>
            <div className='screen-last' id='display'>
                { this.renderLastElem( inputArr) }
            </div>
            
        </div>

        //-------------------------------------------------------------
        )
    }
}

Screen.propTypes = {
    inputArray: PropTypes.array.isRequired
}


export default Screen;