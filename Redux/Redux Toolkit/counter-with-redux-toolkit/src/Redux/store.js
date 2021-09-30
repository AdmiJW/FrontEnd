import { configureStore } from '@reduxjs/toolkit';

import digitalCounterReducer from './slices/digitalCounterSlice';
import alphabeticCounterReducer from './slices/alphabeticCounterSlice';
import asyncCounterReducer from './slices/asyncCounterSlice';

export default configureStore({
    reducer: {
        digitalCounter: digitalCounterReducer,
        alphabeticCounter: alphabeticCounterReducer,
        asyncCounter: asyncCounterReducer
    },
    extraReducers: (builder)=> {
    }
});