import { createSlice } from '@reduxjs/toolkit';

// We also allow importing the whole slice if needed
export const digitalCounterSlice = createSlice({
    name: 'digitalCounter',
    initialState: 0,
    reducers: {
        increment: (state)=> ++state,
        decrement: (state)=> --state,
        set: (state, action)=> state = action.payload
    }
});

// Export actions
export const { increment, decrement, set } = digitalCounterSlice.actions;
// Export reducer
export default digitalCounterSlice.reducer;