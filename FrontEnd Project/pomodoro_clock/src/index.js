import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import Store from './Redux/Store/Store';
import Main from './Components/Main';

import './Style/Style.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store} >
    <Main />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

