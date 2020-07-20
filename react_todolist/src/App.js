import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Header from './components/Header';
import AddToDo from './components/AddToDo';
import ToDo from './components/ToDo';
import './style/general.css';
import { render } from '@testing-library/react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.filterItem = this.filterItem.bind(this);
    this.clearAddSearchProps = this.clearAddSearchProps.bind(this);
  }

  state = {
    addItem: null,
    search: null
  };

  addItem(e) {
    this.setState( state => ({addItem: e, search: null }) );
  }

  filterItem(e) {
    this.setState( {addItem: null, search: e } );
  }

  clearAddSearchProps() {
    this.setState( {addItem: null, search: null} );
  }

  render() {
      return (
        <div className="App">
        <Header filterItem={ this.filterItem } />
        <AddToDo addItem={ this.addItem } />
        <ToDo newitem={this.state.addItem} search={this.state.search} clearProps={this.clearAddSearchProps} />
        </div>
      );
  }
}

export default App;
