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

## createAsyncThunk
### App.js
```js
import React, { useEffect } from "react";
import { fetchTodos, deleteTodo, toggleComplete, addTodo } from "./todoSlice";
import { useSelector, useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  const { count, todos, status, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div style={{ textAlign: "center", fontSize: "13px" }}>
      {status === "loading" && (
        <div style={{ backgroundColor: "blue", color: "white" }}>
          Loading...
        </div>
      )}
      {(status === "deleting" || status === "patching") && (
        <div style={{ backgroundColor: "blue", color: "white" }}>
          Please wait
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <h3>{count}</h3>
      {todos.map(({ title, completed, id }) => (
        <div key={id}>
          <span
            onClick={() => dispatch(deleteTodo(id))}
            style={{ color: "red", marginRight: "10px", cursor: "pointer" }}
          >
            ✘
          </span>
          <li style={{ display: "inline-block" }}>{title}</li>
          <input
            onClick={() => dispatch(toggleComplete(id))}
            type="checkbox"
            checked={completed}
          />
        </div>
      ))}
      <button onClick={() => dispatch(addTodo("Hello"))}>add</button>
    </div>
  );
}

```
### todoSlice.js
```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk(
  "todoSlice/fetchTodos",
  async function (_, { rejectWithValue }) {
    // первый параметр это то, что передаем при вызове
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      if (!response.ok) {
        throw new Error("Server error");
      }
      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todoSlice/deleteTodo",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Can't delete item");
      }

      dispatch(rmItem(id));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const toggleComplete = createAsyncThunk(
  "toggleSlice/toggleComplete",
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.find((item) => item.id === id);

    try {
      const response = await axios.patch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        { completed: !todo.completed }
      );
      if (response.status !== 200) {
        throw new Error("Can not patch");
      }

      dispatch(toggleItem(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk("todoSlice/addTodo", async function (
  text,
  { rejectWithValue, dispatch }
) {
  const todo = {
    userId: 1,
    completed: false,
    title: text
  };

  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos/",
      todo
    );
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error("Can not post");
    }
    dispatch(addItem(response.data));
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const todoSlice = createSlice({
  name: "todoSlice",

  initialState: {
    todos: [
      { title: "Drink coffee", completed: false, id: -1 },
      { title: "Make awesome app", completed: true, id: 0 }
    ],
    count: 2,
    status: "",
    error: ""
  },

  reducers: {
    addItem: (state, action) => {
      state.todos.push(action.payload);
    },
    rmItem: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    toggleItem: (state, action) => {
      const todo = state.todos.find((item) => item.id === action.payload);
      todo.completed = !todo.completed;
    }
  },

  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.status = "loading";
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    },
    [deleteTodo.pending]: (state) => {
      state.status = "deleting";
    },
    [deleteTodo.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [deleteTodo.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "error";
    },
    [toggleComplete.pending]: (state) => {
      state.status = "patching";
    },
    [toggleComplete.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [toggleComplete.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    },
    [addTodo.pending]: (state) => {
      state.status = "patching";
    },
    [addTodo.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [addTodo.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    }
  }
});

const { reducer, actions } = todoSlice;
export default reducer;
export const { addItem, rmItem, toggleItem } = actions;

```
### index.js
```js
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";

import App from "./App";

const store = configureStore({
  reducer: todoSlice
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  rootElement
);

```

## RTK Query
Эта технология отличается от предыдущей тем, что источник истинны - сервер, а не редьюсеры.
Следовательно редьюсеров здесь нет.

### goodsApi.js
```js
import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const goodsAPI = createApi({
    reducerPath: "goodsApi",
    tagTypes: ["Products"],
    baseQuery:  fetchBaseQuery({ baseUrl:  'http://localhost:3001'}),
    endpoints: (build) => ({
        getGoods: build.query({ // get Запрос
            query: (limit = '') => `goods?${limit ? `_limit=${limit}` : '' }`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Products', id })),
                        { type: 'Products', id: 'LIST' },
                    ]
                    : [{ type: 'Products', id: 'LIST' }],
        }),
        addProduct: build.mutation({ // post запрос
            query: (body) => ({
                url: "goods",
                method: "POST",
                body
            }),
            invalidatesTags: [{ type: "Products", id: "LIST"} ]
        }),
        deleteProduct: build.mutation({ // delete запрос
            query: (id) => ({
                url: `goods/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: [{ type: "Products", id: "LIST" }]
        })
    })
});
// экспортируются автоматически-созданные хуки
export const { useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation } = goodsAPI;
```
### db.json
```json
{
  "goods": [
    {
      "name": "Milk",
      "id": 1
    },
    {
      "name": "Potato",
      "id": 2
    },
    {
      "name": "Cabage",
      "id": 3
    }
  ]
}
```

### store.js
```js
import { goodsAPI } from "./goodsAPI";
import {configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        [goodsAPI.reducerPath]: goodsAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(goodsAPI.middleware)
});
```

### index.js
```js
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./redux/store";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
    rootElement
);
```

### App.js
```js
import React, {useState} from "react";
import {useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation} from "./redux/goodsAPI";

export default function App() {
    const [ count, setCount ] = useState('');
    const [ newProductName, setNewProductName ] = useState('');
    const { data = [], isLoading } = useGetGoodsQuery(count);
    const [ addProduct, { isError }] = useAddProductMutation();
    const [ deleteProduct ] = useDeleteProductMutation();

    const handleAddNewProduct = async() => {
        if (newProductName) {
            await addProduct({ name: newProductName }).unwrap();
            setNewProductName('');
        }
    }

    const handleDeleteProduct = async(id) => {
        await deleteProduct(id).unwrap();
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    // useEffect(() => )

    return (
        <ul>
            <input
                value={ newProductName }
                onChange={(e) => setNewProductName(e.target.value)}
            />
            <button onClick={ handleAddNewProduct }>add product</button>
            <select
                value={count}
                onChange={(e) => setCount(e.target.value) }>
                <option value="">all</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            { data.map(item => <li onClick={() => deleteProduct(item.id)}>{item.name}</li>) }
        </ul>
    );
}
```