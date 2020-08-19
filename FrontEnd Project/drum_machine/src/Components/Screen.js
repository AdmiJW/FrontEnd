import React from 'react';
import PropType from 'prop-types';

import { connect } from 'react-redux';

class Screen extends React.Component {
    constructor(props) {
        super(props);
        
        this.getBankName = this.getBankName.bind(this);
    }

    //  Since bank state is passed in as Number codes, we need to decode it
    getBankName(code) {
        switch(code) {
            case 0: return 'Acoustic';
            case 1: return 'Jihong';
            case 2: return '8-Bit';
            default: return 'Unknown Bank'
        }
    }

    render() {
        //========== JSX =============
        return (
            <div className='machine-screen' id='machine-screen'>
                <div className={ `screen-bank ${this.props.isPowerOn? '': 'hidden'}` } >
                    <span className='bank-name' id='bank-name'>BANK: </span>
                    <span className='bank-content' id='bank-content'> {this.getBankName(this.props.currentBank) } </span>
                </div>
                <div className={ `screen-volume ${this.props.isPowerOn? '': 'hidden'}` }>
                    <span className='volumne-name' id='volume-name'>VOLUME: </span>
                    <span className='volume-content' id='volume-content'> {`${this.props.volume}%`} </span>
                </div>
                <div className={ `screen-sfx ${this.props.isPowerOn? '': 'hidden'}` }>
                    <span className='sfx-name' id='sfx-name'>SFX: </span>
                    <span className='sfx-content' id='display'> {this.props.currentSfx} </span>
                </div>
            </div>
        );
        //==========================
    }
}


//====================================================
//  PropTypes, MapStateToProps, MapDispatchToProps
//====================================================
Screen.propTypes = {
    isPowerOn: PropType.bool.isRequired,
    volume: PropType.number.isRequired,
    currentBank: PropType.number.isRequired,
    currentSfx: PropType.string.isRequired
}


function mapStateToProps( store ) {
    return {
        isPowerOn: store.isPowerOn,
        volume: store.volume,
        currentBank: store.currentBank,
        currentSfx: store.currentSfx
    }
}

export default connect(mapStateToProps, null )(Screen);