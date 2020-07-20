import React from 'react';
import ToDoItem from './ToDoItem';
import '../style/todo.css';

class ToDo extends React.Component {
    constructor(props) {
        super(props);

        this.itemChange = this.itemChange.bind(this);


    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const len = prevState.todoItems.length;

        if (nextProps.newitem !== null ) {
            const newitem = nextProps.newitem;
            const newList = {
                id: prevState.nextid, 
                checked: false, 
                expiring: newitem.expiry, 
                task: newitem.task,
                hide: false
            };
            return { todoItems: [...prevState.todoItems, newList], nextid: prevState.nextid + 1 };
        }
        else if (nextProps.search !== null ) {
            const comp = nextProps.search.includeComplete;
            const incomp = nextProps.search.includeIncomplete;
            const keyword = nextProps.search.searchVal;

            return { todoItems: [...prevState.todoItems.map(e => {
                let match = ( RegExp( keyword, 'ig').test(e.task) ) && ( (e.checked)? comp: incomp);
                e.hide = !match;
                return e;
            })]}
        }
        return null;
    }

    state = {
        todoItems: [],
        nextid: 0
    }

    itemChange(item, event) {
        this.props.clearProps();
        if (event === 'checkbox') {
            this.setState( state => {
                const changed = state.todoItems.map(e => {
                    if (e.id == item.id)
                        e.checked = !e.checked;
                    return e;
                });
                return {todoItems: changed};
            });
        }
        else if (event === 'delete') {
            this.setState( state => {
                const changed = state.todoItems.filter(e => e.id != item.id);
                return {todoItems: changed};
            });
        }
    }

    render() {
        const items = this.state.todoItems.map(e => {
            return (
                <ToDoItem key={e.id} item={e} callback={this.itemChange} />
            );
        });
        return (
            <div className="toDo">
                <h2>What would you like to do today?</h2>
                <ul className='toDo-ul'>
                    { items }
                </ul>
            </div>
        );
    }
}

export default ToDo;