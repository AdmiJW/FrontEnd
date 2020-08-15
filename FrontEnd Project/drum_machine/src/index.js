import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Redux/Store/store';

import DrumMachine from './Components/DrumMachine';
import AudioSrc from './Components/AudioSrc';

import './StyleSheets/style.css';



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DrumMachine />
      <AudioSrc />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

