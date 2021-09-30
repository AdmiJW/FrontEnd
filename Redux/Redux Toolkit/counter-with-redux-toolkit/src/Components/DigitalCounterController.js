import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { increment, decrement, set } from '../Redux/slices/digitalCounterSlice';


function DigitalCounterController() {
    const dispatch = useDispatch();
    const [ field, setField ] = useState(0);

    // JSX
    return (
    <div className='controller'>
        <button type='button' className='controller-button' onClick={ ()=> dispatch(increment()) }>+1</button>
        <button type='button' className='controller-button'  onClick={ ()=> dispatch(decrement()) }>-1</button>
        <input type='number' className='controller-input' value={field} onChange={ (e)=> setField(e.target.value) }
            step='1' />
        <button type='button' className='controller-button' onClick={ ()=> dispatch(set(field)) }>Set</button>
    </div>
    );
}

export default DigitalCounterController;