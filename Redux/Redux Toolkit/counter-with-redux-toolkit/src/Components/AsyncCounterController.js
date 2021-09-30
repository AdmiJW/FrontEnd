import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { incrementThunk, decrementThunk, setCountThunk } from '../Redux/slices/asyncCounterSlice';

function AsyncCounterController() {
    const dispatch = useDispatch();
    const [ field, setField ] = useState(0);

    // JSX
    return (
    <div className='controller'>
        <button type='button' className='controller-button' onClick={ ()=> dispatch(incrementThunk()) }>+1</button>
        <button type='button' className='controller-button' onClick={ ()=> dispatch(decrementThunk()) }>-1</button>
        <input type='number' className='controller-input' value='0' step='1' value={ field }
            onChange={ (e)=> setField( Number.parseInt(e.target.value) ) } />
        <button type='button' className='controller-button' onClick={ ()=> dispatch(setCountThunk(field)) }>Set</button>
    </div>
    );
}

export default AsyncCounterController;