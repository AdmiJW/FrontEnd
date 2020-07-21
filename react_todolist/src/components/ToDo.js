import React from 'react';
import ToDoItem from './ToDoItem';
import '../style/todo.css';

class ToDo extends React.Component {
    constructor(props) {
        super(props);

        this.itemChange = this.itemChange.bind(this);
    }

    //The state stores the to-do items, and the next available id to be assigned to the to-dos.
    //Currently the id is based on simple incrementing
    state = {
        todoItems: [],
        nextid: 0
    }

    /*  Fires when the component receives a new prop, which could be a new to-do to append or request to filter
        the to-do items.
        If it was a new item, then construct the new to-do object, and update the state. Also implemented a sort
        function so that everytime a new item is added, it re-sorts the to-do to have the closest expiring tasks on
        top
        Else, filter the to-do items based on filtering condition, and update the state.
    */
    static getDerivedStateFromProps(nextProps, prevState) {
        const len = prevState.todoItems.length;

        //New item request
        if (nextProps.newitem !== null ) {
            const newitem = nextProps.newitem;
            const newList = {
                id: prevState.nextid, 
                checked: false, 
                expiring: newitem.expiry, 
                task: newitem.task,
                hide: false
            };
            return { todoItems: [...prevState.todoItems, newList]
                .sort( (a,b) => {
                    if ( Number.isNaN(a.expiring) ) return -1;
                    if ( Number.isNaN(b.expiring) ) return 1;
                    return Date.parse(a.expiring) - Date.parse(b.expiring);

                }), nextid: prevState.nextid + 1 };
        }
        //Filter to-do
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
        //None of the above, return null (State will not update)
        return null;
    }

    
    /*  A callback function passed into each of the to-do items. It fires when to-do items was interacted,
        like delete button or checkbox checked or uncheck. Identify the event type, and update the state
        based on that
    */
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