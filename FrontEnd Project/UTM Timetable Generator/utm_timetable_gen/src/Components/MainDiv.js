import React from 'react';

import { connect } from 'react-redux';

// Other React Components
import CourseContainer from './CourseContainer.js'




class MainDiv extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        //=================================== JSX ==========================================
        return (
            <div className='container' id='container'>
                <header className='header' id='header'>
                    <img className='header__logo' id='header__logo' 
                        src='https://upload.wikimedia.org/wikipedia/commons/8/81/UTM-LOGO.png' alt='Logo of UTM'/>
                    <h1 className='header__title' id='header__title'>UTM Timetable Generator</h1>
                </header>

                <CourseContainer />

                <footer className='footer' id='footer'>
                    <h2 className='footer__text'> Lorem Ipsum Sit Dolor Amet Placeholder Text </h2>
                </footer>
            </div>
        );
        //=================================== JSX ==========================================
    }

}


export default MainDiv;