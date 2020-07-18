import React, { Component } from 'react';
import TodoItem from './TodoItem.js';
import PropTypes from 'prop-types';

class Todo extends Component {
    render() {
        return this.props.todo.map( (todo) => (
            <TodoItem todo={todo}/>
        ) );
    }
}

Todo.propTypes = {
    todo: PropTypes.array.isRequired
}

export default Todo;