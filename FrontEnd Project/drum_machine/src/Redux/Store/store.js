import { createStore, applyMiddleware, compose } from 'redux'
import Thunk from 'redux-thunk';
import Reducer from '../Reducers/Reducer';

//  Remove extension when build!

const store = createStore( Reducer, applyMiddleware(Thunk) );

export default store;