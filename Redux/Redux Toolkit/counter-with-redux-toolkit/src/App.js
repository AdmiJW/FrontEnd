import { Fragment } from 'react';

import DigitalCounter from './Components/DigitalCounter';
import DigitalCounterController from './Components/DigitalCounterController';
import AlphabeticCounter from './Components/AlphabeticCounter';
import AlphabeticCounterController from './Components/AlphabeticCounterController';
import AsyncCounter from './Components/AsyncCounter';
import AsyncCounterController from './Components/AsyncCounterController';


function App() {
    return (
    <Fragment>
        <div className='counter__display'>
            <DigitalCounter />
            <AlphabeticCounter />
        </div>

        <div className='counter__control'>
            <DigitalCounterController />
            <AlphabeticCounterController />
        </div>

        <AsyncCounter />
        <AsyncCounterController />
    </Fragment>
    );
}

export default App;
