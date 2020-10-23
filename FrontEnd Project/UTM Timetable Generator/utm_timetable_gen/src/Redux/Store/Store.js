import { createStore } from 'redux'

import timetableReducer from '../Reducers/TimetableReducer';

const store = createStore( timetableReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

export default store;