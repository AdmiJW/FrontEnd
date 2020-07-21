import React from 'react';
import '../style/addtodo.css';

class AddToDo extends React.Component {
    constructor(props) {
        super(props);

        this.fieldChange = this.fieldChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    //This component's state will store the user inputted task string, and the expiring date of the user's to-do
    //currently in the text-field and date-field of the form
    state = {
        addValue: '',
        date: '',
    };

    //Fires when the user typed something into the text field. Changes the state
    fieldChange(e) {
        this.setState( {addValue: e.target.value} );
    }

    //Fires when the user set a date in the date field. Changes the state
    dateChange(e) {
        this.setState( {date: e.target.value} );
    }

    /*Fires when the user presses enter, or click submit button. It firstly check the validity of the forms.
      If it is not valid, then we won't call preventDefault() and let HTML default validator to show that
      the form is not valid
      Otherwise, call preventDefault() to prevent submitting and refreshing behavior. Then check if the date
      is actually ahead of current time. If it does, then call the callback function from props to pass the
      new to-do back up to App.js, and reset the field values to blank */
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