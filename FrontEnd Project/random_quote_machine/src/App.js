import React from 'react';
import MainDiv from './Components/MainDiv';

import './Styles/style.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
        <main>
          <MainDiv />
        </main>
    );
  }
}

export default App;
