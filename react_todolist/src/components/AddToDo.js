import React from 'react';
import '../style/addtodo.css';

class AddToDo extends React.Component {
    constructor(props) {
        super(props);

        this.fieldChange = this.fieldChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    state = {
        addValue: '',
        date: '',
    };

    fieldChange(e) {
        this.setState( {addValue: e.target.value} );
    }

    dateChange(e) {
        this.setState( {date: e.target.value} );
    }

    submit(e) {
        if (e.target.parentElement.checkValidity() ) {
            e.preventDefault();

            const setExpiry = Date.parse(this.state.date) + 86400000;
            
            if ( new Date().getTime() >= setExpiry )
                alert('You are trying to set an earlier date!');
            else {
                this.props.addItem( {task: this.state.addValue, expiry: this.state.date} );
                this.setState( {addValue: '', date: '' } );
            }
        }
    }

    render() {
        return (
            <form className='add-todo-div'>
                <input type='text' className='addtodo-field' value={this.state.addValue} 
                    placeholder='Add To Do...' onChange={this.fieldChange} required ></input>
                <input type='date' className='addtodo-date' value={this.state.date}
                    onChange={this.dateChange} ></input>
                <input type='submit' className='addtodo-submit' value='Submit' onClick={ this.submit } ></input>
            </form>
        );
    }
}

export default AddToDo;