import React from 'react';
import { connect } from 'react-redux';

import PropType from 'prop-types';

import DrumPad from './DrumPad';
import ActionCreators from '../Redux/Actions/ActionCreators';

const soundLib = {
    EmptyBank: [['',''], ['',''], ['',''], ['',''], ['',''], ['',''], ['',''], ['',''], ['',''] ],
    Bank1: [
        ['Open Hi-hat',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/DrumSoundSelected/CYCdh_ElecK06-OpHat.wav'
        ],
        ['Cymbal',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/DrumSoundSelected/CYCdh_ElecK01-Cymbal.wav'
        ],
        ['Crash',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/DrumSoundSelected/CYCdh_Kurz03-Crash03.wav'
        ],
        ['Clap',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/DrumSoundSelected/CYCdh_ElecK05-Clap01.wav'
        ],
        ['Snare',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/DrumSoundSelected/CYCdh_ElecK05-Snr01.wav'
        ],
        ['Ride',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/DrumSoundSelected/CYCdh_Kurz04-Ride01.wav'
        ],
        ['Kick',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/DrumSoundSelected/CYCdh_ElecK05-Kick02.wav'
        ],
        ['Rim',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/DrumSoundSelected/CYCdh_K2room_Rim-02.wav'
        ],
        ['Closed Hi-hat',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/DrumSoundSelected/CYCdh_ElecK05-ClHat01.wav'
        ]
    ],
    Bank2: [
        ['Robot 1',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/edited/robot_edited.mp3'
        ],
        ['Robot 2',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/edited/robot_edited2.mp3'
        ],
        ['Solo',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/edited/solo_edited.mp3'
        ],
        ['Drop',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/edited/drop_edited.mp3'
        ],
        ['Snare',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/edited/tu_edited.mp3'
        ],
        ['Bubble',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/edited/bubble_edited.mp3'
        ],
        ['Kick',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/edited/kick_edited.mp3'
        ],
        ['Fart',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/edited/fart_edited.mp3'
        ],
        ['Closed hat',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/edited/hat_edited.mp3'
        ]
    ],
    Bank3: [
        ['Tom 1',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/FREE%208-BIT%20DRUM%20SAMPLES%20-%20LAVANDERIA%20EST%C3%9ADIO/TOM%201.wav'
        ],
        ['Tom 2',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/FREE%208-BIT%20DRUM%20SAMPLES%20-%20LAVANDERIA%20EST%C3%9ADIO/TOM%202.wav'
        ],
        ['Tom 3',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/FREE%208-BIT%20DRUM%20SAMPLES%20-%20LAVANDERIA%20EST%C3%9ADIO/TOM%203.wav'
        ],
        ['Snare 1',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/FREE%208-BIT%20DRUM%20SAMPLES%20-%20LAVANDERIA%20EST%C3%9ADIO/Snare%201.wav'
        ],
        ['Snare 2',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/FREE%208-BIT%20DRUM%20SAMPLES%20-%20LAVANDERIA%20EST%C3%9ADIO/Snare%202.wav'
        ],
        ['Snare 3',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/FREE%208-BIT%20DRUM%20SAMPLES%20-%20LAVANDERIA%20EST%C3%9ADIO/Snare%203.wav'
        ],
        ['Kick', 
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/FREE%208-BIT%20DRUM%20SAMPLES%20-%20LAVANDERIA%20EST%C3%9ADIO/KICK.wav'
        ],
        ['Hi-hat Open',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/FREE%208-BIT%20DRUM%20SAMPLES%20-%20LAVANDERIA%20EST%C3%9ADIO/Hat%20Open.wav'
        ],
        ['Hi-hat Closed',
        'https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/FREE%208-BIT%20DRUM%20SAMPLES%20-%20LAVANDERIA%20EST%C3%9ADIO/HH%20Closed.wav'
        ]
    ]
}

const mapKeyToIndex = {
    Q: 0,
    W: 1,
    E: 2,
    A: 3,
    S: 4,
    D: 5, 
    Z: 6,
    X: 7,
    C: 8
}



class DrumPadContainer extends React.Component {
    constructor(props) {
        super(props);

        this.drumPadPressed = this.drumPadPressed.bind(this);
    }

    state = {
        bank: soundLib.Bank1
    }

    static getDerivedStateFromProps( nextProps, prevState ) {
        const { isPowerOn, currentBank } = nextProps;
        return {
            bank:   isPowerOn?
                    currentBank === 0? soundLib.Bank1 :
                    currentBank === 1? soundLib.Bank2 :
                                      soundLib.Bank3 : soundLib.EmptyBank
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', e => {
            this.drumPadPressed( e.key.toUpperCase() );
        })
    }

    drumPadPressed(key) {
        if ( mapKeyToIndex[key] === undefined ) return;

        const { volume, drumPadPress } = this.props;

        const audio = document.getElementById(key);
        const btn = document.getElementById(key + '-btn');

        audio.volume = volume / 100;
        audio.currentTime = 0;
        audio.play();

        drumPadPress( this.state.bank[ mapKeyToIndex[key] ][0] );

        btn.className = 'drum-pad btn-press';
        setTimeout(() => {
            btn.className = 'drum-pad';
        }, 500);
    }


    render() {
        const bank = this.state.bank;

        //========== JSX =============
        return (
            <div className='drum-pad-container'>
                <DrumPad KbKey='Q' drumPadPressed={ this.drumPadPressed } audio={bank[0] } />
                <DrumPad KbKey='W' drumPadPressed={ this.drumPadPressed } audio={bank[1] }/>
                <DrumPad KbKey='E' drumPadPressed={ this.drumPadPressed } audio={bank[2] }/>
                <DrumPad KbKey='A' drumPadPressed={ this.drumPadPressed } audio={bank[3] }/>
                <DrumPad KbKey='S' drumPadPressed={ this.drumPadPressed } audio={bank[4] }/>
                <DrumPad KbKey='D' drumPadPressed={ this.drumPadPressed } audio={bank[5] }/>
                <DrumPad KbKey='Z' drumPadPressed={ this.drumPadPressed } audio={bank[6] }/>
                <DrumPad KbKey='X' drumPadPressed={ this.drumPadPressed } audio={bank[7] }/>
                <DrumPad KbKey='C' drumPadPressed={ this.drumPadPressed } audio={bank[8] }/>
            </div>
        );
        //==========================
    }
}

//====================================================
//  PropTypes, MapStateToProps, MapDispatchToProps
//====================================================

DrumPadContainer.propTypes = {
    isPowerOn: PropType.bool.isRequired,
    volume: PropType.number.isRequired,
    currentBank: PropType.number.isRequired,

    drumPadPress: PropType.func.isRequired
};


function mapStateToProps( store ) {
    return {
        isPowerOn: store.isPowerOn,
        volume: store.volume,
        currentBank: store.currentBank
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        drumPadPress: (sfxName) => dispatch( ActionCreators.drumPadPress(sfxName) )
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(DrumPadContainer);