import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
    render() {
        const todoObj = this.props.todo;
        return (
            <div>
                <h1>#{todoObj.id} : {todoObj.title}</h1>
                <p>Status: {todoObj.completed? "Completed":"Not Completed"}</p>
            </div>
        );
    }
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
}

export default TodoItem;