import React from 'react';
import '../style/header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.searchChange = this.searchChange.bind(this);
        this.filter = this.filter.bind(this);
    }

    state = {
        searchVal: '',
        includeComplete: true,
        includeIncomplete: true
    };

    filter() {
        this.props.filterItem(this.state);
    }

    searchChange(e) {
        if (e.target.id == 'search-field') {
            this.setState( {searchVal: e.target.value}, this.filter );
        } else if (e.target.id == 'complete') {
            this.setState( state => ({ includeIncomplete: !state.includeIncomplete, includeComplete: true }),
                                    this.filter );
        } else {
            this.setState( state => ({ includeComplete: !state.includeComplete, includeIncomplete: true}),
                                    this.filter );
        }
    }


    render() {
        const state = this.state;
        return (
            <header className='header'>
                <h1>To Do List</h1>
                <div className='header-func'>
                    <input type='text' className='search-field' value={state.searchVal}
                    id='search-field' placeholder='Search Tasks...' onChange={this.searchChange}>
                    </input>
                    <div className='header-button-div'>
                        <button type='button' className={state.includeComplete && !state.includeIncomplete? 'hover':''} 
                            id='complete' onClick={this.searchChange} >Completed</button>
                        <button type='button' className={state.includeIncomplete && !state.includeComplete? 'hover':''} 
                            id='incomplete' onClick={this.searchChange}>Incomplete</button>
                    </div>
                </div>
            </header>
        );
    }

}

export default Header;