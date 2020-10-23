import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store from './Redux/Store/Store';

import './Styles/style.css';

import MainDiv from './Components/MainDiv.js';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
    <MainDiv />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);