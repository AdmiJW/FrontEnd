import { useSelector } from 'react-redux';


function AlphabeticCounter() {
    console.log("Alphabetic Counter Render");

    const count = useSelector((state)=> state.alphabeticCounter);

    // JSX
    return (
    <div className='counter'>
        <h4>Alphabetic Counter</h4>
        <p>{ String.fromCharCode(count) }</p>
    </div>
    );
}

export default AlphabeticCounter;