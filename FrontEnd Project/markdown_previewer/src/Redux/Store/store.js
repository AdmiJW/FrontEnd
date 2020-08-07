import { createStore, applyMiddleware } from 'redux';
import Reducer from '../Reducer/winReducer';
import Thunk from 'redux-thunk';

const store = createStore( Reducer, 
    applyMiddleware(Thunk)
);

export default store;