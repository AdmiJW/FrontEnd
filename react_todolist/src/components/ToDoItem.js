import React from 'react';

class ToDoItem extends React.Component {
    constructor(props) {
        super(props);

        this.checkboxClick = this.checkboxClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);

        //Set the initial CSS of the to-do to be invisible and offset to left, so it will slide in
        //The CSS is set via classes, and class is set via the state property 'shown' in this component
        this.state = { shown: false };
    }

    //After 10 ms, set the CSS of the to-do to be visible, so it slides in
    componentDidMount() {
        setTimeout( () => {
            this.setState( { shown: true } );
        }, 10);
    }

    //Fires when checkbox is clicked. Calls the callback function to the ToDo.js 
    checkboxClick() {
        this.props.callback(this.props.item, 'checkbox');
    }

    //Fires when delete button is clicked. Calls the callback function to the ToDo.js to remove the todo-item
    //from its state
    deleteClick() {
        this.setState( { shown: false } );
        setTimeout( () => {
            this.props.callback(this.props.item, 'delete');
        }, 500);
    }

    render() {
        const checked = this.props.item.checked;
        const hide = this.props.item.hide;
        return (

            <li className={`toDo-li ${this.state.shown? 'show': 'invis'}`} style={ {backgroundColor: (checked? '#1dd1a1': '#ff6b6b'),
                                             display: (hide)? 'none': 'flex'} } >
                <input type='checkbox' className='toDo-li-checkbox' 
                checked={checked} onChange={this.checkboxClick} ></input>
                <p className='toDo-li-task' style={checked? {textDecoration: 'line-through'}: {} }>{this.props.item.task}</p>
                <p className='toDo-li-expire'>{ getExpiryStr(this.props.item.expiring) }</p>
                <button type='button' className='toDo-li-delete' onClick={this.deleteClick} >X</button>
            </li>

        );
    }
}

export default ToDoItem;

function getExpiryStr(expiry) {
    const today = Date.parse( new Date() );
    expiry = Date.parse(expiry);


    let days = Math.round( (expiry - today) / 1000 / 60 / 60 / 24 );

    let str = `${Number.isNaN(days)? 0: days} day(s) left`;

    return str;
}
