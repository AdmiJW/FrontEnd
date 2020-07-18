import React from 'react';
import Todo from './components/Todo';

import './App.css';

class App extends React.Component {

  state = {
    todo: [
      {
        id: 1,
        title: 'Taking out the trash',
        completed: true
      },
      {
        id: 2,
        title: 'Meeting with boss',
        completed: false
      },
      {
        id: 3,
        title: 'Dinner with gf',
        completed: false
      }
    ]
  }
  
  render() {
    return (
      <div className="App">
        APP
        <Todo todo={this.state.todo}/>
      </div>
    );
  }
}

export default App;
