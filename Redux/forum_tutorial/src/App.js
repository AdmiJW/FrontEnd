import React from 'react';
import logo from './logo.svg';
import './App.css';

import PostForm from './Components/PostForm';
import PostSection from './Components/PostSection';

import store from './Redux/Store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store} >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <PostForm />
      <PostSection />
    </Provider>
  );
}

export default App;
