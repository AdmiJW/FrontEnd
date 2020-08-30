import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import $ from 'jquery';

import Actions from '../Redux/Actions/Actions';

import padZeroes from '../PadZeroes';


//  This function creates a new Option HTML element, to be put in select HTML element, based on the audioName and newID
//  that shall be applied to the option element, passed in as argument

//  This function is called when the application first loads, when reading the user-defined alarm sounds from Local Storage,
//  and everytime user adds a new alarm sound
function createOptionHTML( audioName, newID ) {
    const newOptionHTML = $(`<option value=${newID}> ${audioName} </option>`);
    return newOptionHTML;
}



class ConfigWin extends React.Component {
    constructor( props ) {
        super(props);

        this.volumeChanged = this.volumeChanged.bind(this);
        this.breakLenChanged = this.breakLenChanged.bind(this);
        this.sessionLenChanged = this.sessionLenChanged.bind(this);
        this.alarmSoundChanged = this.alarmSoundChanged.bind(this);
        this.alarmUploaded = this.alarmUploaded.bind(this);
        this.alarmDelete = this.alarmDelete.bind(this);
        this.alarmPlay = this.alarmPlay.bind(this);
    }

    //  When the component did mount:
    //  >   Add event listener to close config window button
    //  >   Read from Local Storage if there is user-defined alarm sounds. If there is, add option HTML into select HTML
    componentDidMount() {
        $('#close-config-btn').on('click', ()=> {
            $('#config').removeClass('opened');
        });

        for (let i = 0; i < window.localStorage.length; i ++ ) {

            const key = window.localStorage.key(i);
            if (key <= 2 ) continue;

            let audioJSON;
            const entry = window.localStorage.getItem( key );
            try {
                audioJSON = JSON.parse( entry );
            } catch (err) {
                continue;
            }
            if (!audioJSON || !audioJSON.name) continue;

            const optionHTML = createOptionHTML( audioJSON.name, i );

            $('#alarm-sound').append(optionHTML);
        }

    }

    volumeChanged(e) {
        this.props.alarmVolChanged(e.target.value);
    }

    breakLenChanged(e) {
        const { break_length, breakLenChanged } = this.props;

        if (e.target.id === 'break-decrement' || e.target.id === 'break-decrement-logo') {
            if (break_length <= 1) return;
            breakLenChanged( break_length - 1 );
        } else if (e.target.id === 'break-increment' || e.target.id === 'break-increment-logo') {
            if (break_length >= 60) return;
            breakLenChanged( break_length + 1 );
        }
    }

    sessionLenChanged(e) {
        const { session_length, sessionLenChanged } = this.props;

        if (e.target.id === 'session-decrement' || e.target.id === 'session-decrement-logo') {
            if (session_length <= 1) return;
            sessionLenChanged( session_length - 1);
        } else if (e.target.id === 'session-increment' || e.target.id === 'session-increment-logo') {
            if (session_length >= 60) return;
            sessionLenChanged( session_length + 1);
        }
    }


    //  Called when the user uploads a file into the input file HTML element
    alarmUploaded(e) {
        const file = e.target.files[0];
        //  No file or the file isn't of type audio
        if (!file || !file.type.startsWith('audio') ) {
            window.alert('Invald file selected.');
            return;
        }
        //  The file uploaded is large. Reject it 
        if (file.size > 10485760) {
            window.alert('The audio file exceeds 10MB! Please use a smaller audio file! (.mp3 files are usually smaller)');
            return;
        }

        const fr = new FileReader();
        //  Callback function. When loaded, get the next ID available, and add the audio to Local Storage as well as
        //  add option to the Select HTML
        fr.onload = () => {
            const selectHTML = $('#alarm-sound');
            const newID = Number(selectHTML.children('option:last-child')[0].value) + 1;

            const audioJSONStr = JSON.stringify({ name: file.name, url: fr.result} );

            try {
                window.localStorage.setItem( newID , audioJSONStr);
            } catch (err) {
                //  The Local Storage has size limit of about 10MB. If this causes overload, then reject the file
                window.alert("Sorry, but adding this file would result in Local Storage Overload. Consider deleting some alarm sounds first?");
                return;
            }

            //  Appending the new Option HTML element to the select HTML
            const optionHTML = createOptionHTML( file.name, newID );
            optionHTML.appendTo(selectHTML);
        }

        fr.readAsDataURL(file);
    }

    //  User selected another alarm sound from Select HTML
    alarmSoundChanged(e) {
        this.props.alarmChanged(e.target.value);
    }

    alarmPlay(e) {
        this.props.alarmHTML.play();
    }

    //  User wants to delete the selected alarm sound
    alarmDelete(e) {
        const selectHTML = $('#alarm-sound');
        const ID = selectHTML[0].value;
        const { alarmChanged } = this.props;

        //  Default (Preloaded) alarm sounds shall not be deleted
        if (ID < 3) {
            window.alert('Please do not delete default alarm sounds!');
            return;
        }

        //  Change the selected alarm sound to the first one, preloaded alarm sound
        alarmChanged(0);
        selectHTML[0].value = "0";

        //  Remove the targeted Option HTML from Select HTML element
        selectHTML.children(`[value='${ID}']`)[0].remove();

        //  Remove the targeted alarm sound from Local Storage
        window.localStorage.removeItem(ID);
        
    }

    
    render() {
        const { alarmName, alarm_volume, break_length, session_length } = this.props;
        const alarmJSON1 = JSON.parse( window.localStorage.getItem(0) );
        const alarmJSON2 = JSON.parse( window.localStorage.getItem(1) );
        const alarmJSON3 = JSON.parse( window.localStorage.getItem(2) );

        return (
        //  JSX =============================
        <div className='config' id='config'>
            <header className='config-head' id='config-head'>
                <i className="las la-tools la-lg"></i>
                Settings
                <button className='config-btn' id='close-config-btn'>
                    <i className="las la-times la-lg"></i>
                </button>
            </header>

            <div className='config-body' id='config-body'>

                <fieldset className='config-set' id='alarm'>
                    <legend>ALARM</legend>

                    <div className='config-wrapper'>
                        <label htmlFor='alarm-loaded'>Current Loaded Alarm: </label>
                        <span className='config-val' id='alarm-val'>
                            { alarmName }
                            <button type='button' className='config-btn' id='config-play-alarm' 
                                onClick={ this.alarmPlay }>
                                <i className="las la-play la-lg"></i>
                            </button>
                            <button type='button' className='config-btn' id='config-delete-alarm' 
                                onClick={ this.alarmDelete }>
                                <i className="las la-trash-alt la-lg"></i>
                            </button>
                            
                        </span>

                        <label htmlFor='alarm-sound'>Alarm Sound: </label>
                        <select className='config-select' id='alarm-sound' defaultValue='0' onChange={ this.alarmSoundChanged }>
                            <option value='0'> { alarmJSON1? alarmJSON1.name: '1' }</option>
                            <option value='1' > { alarmJSON2? alarmJSON2.name: '2' } </option>
                            <option value='2' > { alarmJSON3? alarmJSON3.name: '3' } </option>
                        </select>

                        <label htmlFor='alarm-upload'>Upload Alarm: </label>
                        <input type='file' accept='audio/*' className='config-input-file' id='alarm-upload'
                             onChange={ this.alarmUploaded }></input>
                        <button type='button' className='config-btn' id='config-file-btn' 
                            onClick={ ()=> { $('#alarm-upload').trigger('click') } } >
                            <i className="las la-file-upload"></i> Upload...
                        </button>

                        <label htmlFor='alarm-volume'>Alarm Volume: 
                            <span className='config-val' id='alarm-volume-val'> { Math.round(alarm_volume * 100) } </span> 
                        </label>
                        <input type='range' className='config-range' id='alarm-volume' min='0' max='1' 
                            step='0.01' value={ alarm_volume } onChange={ this.volumeChanged } ></input>
                    </div>
                </fieldset>

                <fieldset className='config-set' id='time'>
                    <legend>TIME</legend>

                    <div className='config-wrapper'>

                        <label htmlFor='break-length' id='break-label'>Break Length (Minutes): </label>
                        <div className='btn-control'>
                            <button type='button' className='config-btn' id='break-decrement' onClick={ this.breakLenChanged } >
                                <i className="las la-chevron-left" id='break-decrement-logo'></i>
                            </button>
                            <span className='config-val' id='break-length'> { `${padZeroes(break_length)}:00` } </span>
                            <button type='button' className='config-btn' id='break-increment' onClick={ this.breakLenChanged }>
                                <i className="las la-chevron-right" id='break-increment-logo'></i>
                            </button>
                        </div>

                        <label htmlFor='session-length' id='session-label'>Session Length (Minutes): </label>
                        <div className='btn-control'>
                            <button type='button' className='config-btn' id='session-decrement' onClick={ this.sessionLenChanged } >
                                <i className="las la-chevron-left" id='session-decrement-logo'></i>
                            </button>
                            <span className='config-val' id='session-length'> { `${padZeroes(session_length)}:00` } </span>
                            <button type='button' className='config-btn' id='session-increment' onClick={ this.sessionLenChanged }>
                                <i className="las la-chevron-right" id='session-increment-logo'></i>
                            </button>
                        </div>

                    </div>

                </fieldset>
            </div>
        </div>
        //  ================================
        );
    }
}

//==========================================
//  PROPTYPES AND MAP TO PROPS
//==========================================

ConfigWin.propTypes = {
    alarmName: PropTypes.string.isRequired,
    alarmHTML: PropTypes.object.isRequired,
    alarm_volume: PropTypes.number.isRequired,
    break_length: PropTypes.number.isRequired,
    session_length: PropTypes.number.isRequired,

    alarmChanged: PropTypes.func.isRequired,
    alarmVolChanged: PropTypes.func.isRequired,
    breakLenChanged: PropTypes.func.isRequired,
    sessionLenChanged: PropTypes.func.isRequired
}

function mapStateToProps( store ) {
    return {
        alarmName: store.alarmName,
        alarmHTML: store.alarmHTML,
        alarm_volume: store.alarm_volume,

        break_length: store.break_length,
        session_length: store.session_length
    };
}

function mapDispatchToProps( dispatch ) {
    return {
        alarmChanged: (alarmID) => {
            dispatch( Actions.alarmChanged( alarmID ) );
        },
        alarmVolChanged: (alarmVol) => {
            dispatch( Actions.alarmVolChanged( alarmVol ) );
        },
        breakLenChanged: (newBreakLength) => {
            dispatch( Actions.breakLenChanged( newBreakLength ) );
        },
        sessionLenChanged: (newSessionLength) => {
            dispatch( Actions.sessionLenChanged( newSessionLength) );
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigWin);