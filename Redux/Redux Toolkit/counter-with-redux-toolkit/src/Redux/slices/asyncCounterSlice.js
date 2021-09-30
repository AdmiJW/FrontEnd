import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Async dispatches - Thunks has to be done via createAsyncThunk.
// These thunks contain 3 types of action - pending, fulfilled and rejected
const incrementThunk = createAsyncThunk(
    'asyncCounter/increment',
    ()=> new Promise((resolve)=> window.setTimeout(resolve, 3000))
);

const decrementThunk = createAsyncThunk(
    'asyncCounter/decrement',
    ()=> new Promise((resolve)=> window.setTimeout(resolve, 3000))
);

const setCountThunk = createAsyncThunk(
    'asyncCounter/set',
    (value)=> new Promise((resolve)=> window.setTimeout(()=> resolve(value), 3000 ))
);


export const asyncCounterSlice = createSlice({
    name: 'abc',
    initialState: {
        pendingCount: 0,
        count: 0
    },
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase( incrementThunk.pending, (state)=> {
            ++state.pendingCount;
        });
        builder.addCase( incrementThunk.fulfilled, (state)=> {
            --state.pendingCount;
            ++state.count;
        });

        builder.addCase( decrementThunk.pending, (state)=> {
            ++state.pendingCount;
        });
        builder.addCase( decrementThunk.fulfilled, (state)=> {
            --state.pendingCount;
            --state.count;
        });

        builder.addCase( setCountThunk.pending, (state)=> {
            ++state.pendingCount;
        });
        builder.addCase( setCountThunk.fulfilled, (state, action)=> {
            --state.pendingCount;
            state.count = action.payload;
        });
    }
});

// Export actions, which are the thunk creator themselves
export { incrementThunk, decrementThunk, setCountThunk };
// Export reducer
export default asyncCounterSlice.reducer;