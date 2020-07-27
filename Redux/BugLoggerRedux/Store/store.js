import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../Reducers/rootReducer';

const store = createStore(rootReducer, compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ) );


export default store;
