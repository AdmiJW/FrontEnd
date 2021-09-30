import { useSelector } from 'react-redux';


function DigitalCounter() {
    console.log("Digital Counter Render");

    const count = useSelector((state)=> state.digitalCounter);

    // JSX
    return (
    <div className='counter'>
        <h4>Digital Counter</h4>
        <p>{count}</p>
    </div>
    );
}

export default DigitalCounter;