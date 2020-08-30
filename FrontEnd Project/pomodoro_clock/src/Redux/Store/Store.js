import { createStore } from 'redux';

import RootReducer from '../Reducer/RootReducer';

//  REMOVE CHROME EXTENSION ON BUILD!
const store = createStore( RootReducer );


export default store;