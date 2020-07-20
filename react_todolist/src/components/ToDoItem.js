import React from 'react';

class ToDoItem extends React.Component {
    constructor(props) {
        super(props);

        this.checkboxClick = this.checkboxClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
    }

    checkboxClick() {
        this.props.callback(this.props.item, 'checkbox');
    }

    deleteClick() {
        this.props.callback(this.props.item, 'delete');
    }

    render() {
        const checked = this.props.item.checked;
        const hide = this.props.item.hide;
        return (

            <li className='toDo-li' style={ {backgroundColor: (checked? '#1dd1a1': '#ff6b6b'),
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
    const today = new Date();
    expiry = new Date(expiry);
    let years = expiry.getFullYear() - today.getFullYear();
    let months = expiry.getMonth() - today.getMonth();
    let days = expiry.getDate() - today.getDate();

    let str = `${years > 0? years+' year(s), ':''}
               ${months > 0? months+' month(s), ':''}
               ${days < 0 || Number.isNaN(days)? 0: days} day(s) left`;

    return str;
}
