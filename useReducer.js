import React, { useState, useReducer } from "react";
import reducer, { ADD_TODO, REMOVE_TODO, COMPLETE_TODO } from "./reducer";
import "./styles.css";

export default function App() {
  const [id, setId] = useState(0);
  const [text, setText] = useState("");

  const initialState = [
    {
      id: id,
      text: "First item",
      completed: false
    }
  ];

  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (e) => {
    e.preventDefault();
    const newId = id + 1;
    setId(newId);
    dispatch({
      type: ADD_TODO,
      text: text,
      id: newId
    });
    setText("");
  };

  const removeTodo = (id) => dispatch({ type: REMOVE_TODO, id });
  const completeTodo = (id) => dispatch({ type: COMPLETE_TODO, id });

  return (
    <div className="App">
      <h1>Todo example</h1>
      <form onSubmit={addItem}>
        <input value={text} onInput={(e) => setText(e.target.value)} />
        <button disabled={text.length === 0}>+</button>
      </form>
      <div className="todos">
        {state.map((todo) => {
          return (
            <div key={todo.id} className="todo">
              <p className={todo.completed && "completed"}>{todo.text}</p>
              <button
                className="removeItem"
                onClick={() => removeTodo(todo.id)}
              >
                remove
              </button>
              <button
                className="completeItem"
                onClick={() => completeTodo(todo.id)}
              >
                done
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
