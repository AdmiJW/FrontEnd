import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { increment, decrement, set } from '../Redux/slices/alphabeticCounterSlice';

function AlphabeticCounterController() {

    const dispatch = useDispatch();
    const [ field, setField ] = useState('A');

    // JSX
    return (
    <div className='controller'>
        <button type='button' className='controller-button' onClick={ ()=> dispatch(increment()) } >++</button>
        <button type='button' className='controller-button' onClick={ ()=> dispatch(decrement()) } >--</button>
        <input type='text' className='controller-input' value={field} minLength='0' maxLength='1'
            onChange={ (e)=> setField(e.target.value) } />
        <button type='button' className='controller-button'
            onClick={ ()=> dispatch( set( field.charCodeAt(0) ) ) } >
                Set
        </button>
    </div>
    );
}

export default AlphabeticCounterController;