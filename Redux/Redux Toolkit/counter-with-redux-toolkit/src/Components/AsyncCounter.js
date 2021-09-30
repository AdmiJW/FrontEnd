import { useSelector } from 'react-redux';


function AsyncCounter() {
    console.log("Async Counter Render");

    const { pendingCount, count } = useSelector((state)=> state.asyncCounter );

    // JSX
    return (
    <div className='counter'>
        <h4>Async Counter</h4>
        <p>{ count + (pendingCount? '...': '') }</p>
    </div>
    );
}

export default AsyncCounter;