import React from 'react';
import '../../style/header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <header className='header'>
                <h1>To Do List</h1>
                <div className='header-func'>
                    <input type='text' className='search-field' id='search-field' placeholder='Search Tasks...'></input>
                    <div className='header-button-div'>
                        <button type='button' id='filter-complete'>Completed</button>
                        <button type='button' id='filter-incomplete'>Incomplete</button>
                    </div>
                </div>
            </header>
        );
    }

}

export default Header;