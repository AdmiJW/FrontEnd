import { createStore, applyMiddleware, compose } from 'redux'
import Thunk from 'redux-thunk';
import Reducer from '../Reducers/Reducer';

//  Remove extension when build!

const store = createStore( Reducer, compose( applyMiddleware(Thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ) );

export default store;