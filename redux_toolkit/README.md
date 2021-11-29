## createSlice()
### locationSlice.js
```js
import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: "location",

    initialState: {
        location: ["Kalim", "Albert", "Yan"],
        count: 0
    },

    reducers: {
        save: (state, action) => {
            const { payload } = action;
            state.location = [...state.location, payload];
        },
        increment: (state, action) => {
            state.count = state.count + 1;
        }
    }
});

const { actions, reducer } = locationSlice;
export const { save, increment } = actions;
export default reducer;
```
### index.js
```js
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./locationSlice";
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
import { save, increment } from "./locationSlice";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
    const [ locationName, setLocationName ] = useState('');
    const dispatch = useDispatch();
    const { location, count } = useSelector(state => state);

    const handleData = (e) => {
        setLocationName(e.target.value);
    };

    const handleSave = () => {
        const ifPrestent = location.includes(locationName);
        if(locationName !== undefined && !ifPrestent) {
            dispatch(save(locationName));
            setLocationName('');
        } else {
            setLocationName('');
        }
    }
    useEffect(() => console.log("effect"));
    return (
        <div>
            <div>
                <h1>{ count }</h1>
                <button onClick={() => dispatch(increment())}>increment</button>
            </div>
            <input onChange={handleData} value={locationName} />
            <button style={{margin: '10px'}} onClick={handleSave}>
                add
            </button>

            <div>
                <h3> List of locations </h3>
            </div>
            <div>
                {location.map((item) => <li>{item}</li>) }
            </div>
        </div>
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