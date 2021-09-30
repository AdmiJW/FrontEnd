import { createSlice } from '@reduxjs/toolkit';

const ascii_A = 'A'.charCodeAt(0);
const ascii_Z = 'Z'.charCodeAt(0);

// We also allow importing the whole slice if needed
export const alphabeticCounterSlice = createSlice({
    name: 'alphabeticCounter',
    initialState: ascii_A,
    reducers: {
        increment: (state)=> state = Math.max(ascii_A, (state + 1) % (ascii_Z + 1) ),
        decrement: (state)=> state = state === ascii_A? ascii_Z: state - 1,
        set: (state, action)=> {
            const code = action.payload;
            if ( code && code >= ascii_A && code <= ascii_Z ) return code;
            return state.valueOf();
        }
    }
});

// Export actions
export const { increment, decrement, set } = alphabeticCounterSlice.actions;
// Export reducer
export default alphabeticCounterSlice.reducer;