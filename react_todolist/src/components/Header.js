import React from 'react';
import '../style/header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.searchChange = this.searchChange.bind(this);
        this.filter = this.filter.bind(this);
    }

    //Here the state represents the condition to filter, based on the value in search box, and the two buttons
    //to include only completed to-dos or incomplete to-dos
    state = {
        searchVal: '',
        includeComplete: true,
        includeIncomplete: true
    };

    //Calls the callback function from props, filterItem(), which passes the filtering condition up to App.js
    filter() {
        this.props.filterItem(this.state);
    }

    /*The user has interacted with something with the search box or filter buttons. Determine the user's action
      and change the state respectively */
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