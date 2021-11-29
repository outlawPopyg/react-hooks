## createSlice()
### namesSlice.js
```js
import { createSlice } from "@reduxjs/toolkit";

const namesSlice = createSlice({
    name: "names",

    initialState: {
        names: ["Claim", "Albert", "Yan"]
    },

    reducers: {
        add: (state, action) => {
            state.names.push(action.payload); // можно мутировать state
        }
    }
});

export const { add } = namesSlice.actions; // export actions
export default namesSlice.reducer;
```
### index.js
```js
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";
import namesSlice from "./namesSlice";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");

const store = configureStore({
    reducer: {
        namesReducer: namesSlice
    }
});

ReactDOM.render(
    <Provider store={store}>
        <StrictMode>
            <App />
        </StrictMode>
    </Provider>,
    rootElement
);
```
### App.js
```js
import React, {useEffect, useState} from "react";
import { add } from "./namesSlice";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
    const [ value, setValue ] = useState('');
    const dispatch = useDispatch();
    const { namesReducer: { names } } = useSelector(state => state);

    return (
        <>
            <h1>There are {names.length} names</h1>
            <input onInput={(e) => setValue(e.target.value)} value={ value } type="text"/>
            <button onClick={() => dispatch(add(value))}>add name</button>
            <ul>
                { names.map(name => <li key={name}>{ name }</li>) }
            </ul>
        </>

    );
}
```

## createReducer()
### createReducerExample.js
```js
import { createAction } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";

export const incrementAction = createAction("INCREMENT");

const initialState = {
    count: 0
};

const counterReducer = createReducer(initialState, {
    [incrementAction]: (state, action) => {
        state.count = state.count + 1;
    }
});

export default counterReducer;
```
### index.js
```js
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./createReducerExample";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");

const store = configureStore({
    reducer: rootReducer
});

ReactDOM.render(
    <Provider store={store}>
        <StrictMode>
            <App />
        </StrictMode>
    </Provider>,
    rootElement
);



```
### App.js
```js
import React, {useEffect, useState} from "react";
import { incrementAction } from "./createReducerExample";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
    const dispatch = useDispatch();
    const count = useSelector(state => state.count);
    console.log("render");
    return (
        <>
            <h1>{count}</h1>
            <button onClick={() => dispatch(incrementAction())}>+</button>
        </>

    );
}
```