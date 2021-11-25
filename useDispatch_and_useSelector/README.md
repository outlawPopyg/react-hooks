## employeeSlice.js
```js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const endPoint = "https://my-json-server.typicode.com/ifeanyidike/jsondata/employees";

export const fetchEmployees = createAsyncThunk("employees/fetchAll", async () => {
    const { data } = await axios.get(endPoint);
    return data;
});

const employeesSlice = createSlice({
    name: "employees",
    initialState: { employees: [], loading: false, error: "", count: 0 },
    reducers: {},
    extraReducers: {
        [fetchEmployees.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchEmployees.fulfilled]: (state, action) => {
            state.loading = false;
            state.employees = action.payload;
        },
        [fetchEmployees.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});
export default employeesSlice.reducer;
```
## reduxStore.js
```js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import employeesReducer from "./employeesSlice";

const reducer = combineReducers({
    employees: employeesReducer
});

export default configureStore({ reducer });
```
## index.js
```js
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
import store from "./reduxStore";
import {Povider, Provider} from "react-redux";
const rootElement = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <StrictMode>
            <App />
        </StrictMode>
    </Provider>,
    rootElement
);

```
## App.js
```js
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "./employeesSlice";
import { useEffect, useState } from "react";

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const employeesState = useSelector((state) => state.employees);
    const { employees, loading, error } = employeesState;


    return (
        <div className="App">
            {loading ? (
                <h1>Loading</h1>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>
                    <h1>List of Employees</h1>
                    {employees.map((employee) => (
                        <div key={employee.id}>
                            <h3>{`${employee.firstName} ${employee.lastName}`}</h3>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
```