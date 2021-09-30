# Redux Toolkit

[__Reference__](https://redux-toolkit.js.org/tutorials/quick-start)

When I first learned about `react-redux`, I learned to create one directory `Redux`, which contains 3 directories:
* `actions`
* `reducers`
* `store`

When you want to write some logic to read and write from the store, you have to implement actions, respective switch statement in your reducer, connect dispatch as well as the store to your component! That's the traditional way to implement `react-redux`, which involves a lot of boilerplate code, and it is a pain in the ass. 

Furthermore, we always need to treat the state as immutable and always return a new state based on the previous state. This introduces awkward code if you are going to change some state value in deeply nested object! Like:
```js
// Your state
{
    name: 'AdmiJW',
    post: [
        {
            _id: 1,
            content: 'Lorem Ipsum'   // <- Imagine you simply need to change this 'content'!
        }
    ]
}
```

Introducing `reduxjs/redux-toolkit` - The modern way to writing redux code. Paired with `useSelector()` and `useDispatch()` hooks from `react-redux`, say goodbye to class components and hatred boilerplate code!

Install `reduxjs/redux-toolkit` along with `react-redux`:
```
npm i @reduxjs/toolkit react-redux
```

<br>

---

## 1.0 - `configureStore` - Setting Up your Store

The first thing to get started with redux toolkit is to setup your store. Create a `store.js` and include these:

```js
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})
```

Unlike traditional redux setup, the chrome extension and redux thunk is already included automatically for you. Neat!

Then as usual, include a `<Provider store={store} />` component in the top level of your application to ensure all children has access to the store. The `store` is none other than the one exported from `store.js`.

```js
// You'll see this if you use create-react-app
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

<br>

---

## 3.0 - Separate Logic with `createSlice`

A "Slice" is simply part of your overall store - It is a part of your state, and a part of your reducer. For example, if I have a application of social media, I may have multiple slices - A `userSlice`, `postSlice`, `commentSlice`, each having their "piece" of state and reducers without interferring with other slices.

Example of a slice in an counter application:
```js
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

Wait, isn't it a rule that we shouldn't mutate the state? Turns out, redux toolkit incorporates with `Immer` library which applies a proxy to the state, thus any mutations will end up in a new object at the end, without us explicitly implement it! Awesome!

> __HOWEVER, please note that in each of the reducers, you can only choose to either (1) mutate `state` and return nothing, or (2) return the new state! YOU CANNOT DO BOTH AT THE SAME TIME. CAREFUL WHEN USING ARROW FUNCTIONS WITHOUT ENCLOSING BRACKET, AS IT AUTOMATICALLY RETURNS VALUE, EVEN IF YOU MUTATE STATE__

Note that you are not forced to always use `createSlice` as there are alternative ways.

At the end, we export the actions creators from `slice.actions` and the reducer from `slice.reducer`. Both are required for the next steps.

<br>

---

## 4.0 - Include Our Reducer into the Store.

The reducer needs to be included into our store. 

```js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})
```

`configureStore` will automatically combine all the reducers included in the `reducer` property.

<br>

---

## 5.0 - Accessing and Dispatching

Finally, in our React component, import the hooks from `react-redux`. `useSelector()` for reading the state, `useDispatch()` to dispatch actions. Also, import the actions we exported earlier from our slice.

```js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'

// Our React Component
export function Counter() {
    // Choose from the state the required values
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
        <div>
            <button aria-label="Increment value" onClick={() => dispatch(increment())} >
                Increment
            </button>
        <span>{count}</span>
            <button aria-label="Decrement value" onClick={() => dispatch(decrement())} >
                Decrement
            </button>
        </div>
    </div>
  )
}
```

---

## 6.0 - Async Dispatch with `createAsyncThunk`

[__REFERENCE__](https://redux-toolkit.js.org/usage/usage-guide#asynchronous-logic-and-data-fetching)

`redux-thunk` had always the popular option to implementing asynchronous dispatches with redux. It is made even easier with `createAsyncThunk`.

First, we create a thunk by calling `createAsyncThunk`, providing the action type (string), and __a function that returns a `Promise` that contains asynchronous logic and resolves with your data__. 

The thunk, when dispatched, will actually dispatch 3 actions to your reducer:
1. `your_action_type/pending`
1. `your_action_type/fulfilled`
1. `your_action_type/rejected`

Therefore, we have to handle these actions in our reducer. We do not include these in regular `reducers` field as these are meant for synchronous dispatches. Instead we put in `extraReducers` field to mark those as other reducers that we don't want it auto generating action creators for us.

Here's an example from docs:
```js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'

// First, create the thunk
const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const response = await userAPI.fetchById(userId)
    return response.data
  }
)

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: 'users',
  initialState: { entities: [], loading: 'idle' },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    })
  },
})

// Later, dispatch the thunk as needed in the app
dispatch(fetchUserById(123))
```
