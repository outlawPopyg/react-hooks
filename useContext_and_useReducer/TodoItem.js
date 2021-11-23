import React, { useContext } from "react";
import TodoContext from "./context";
import { REMOVE_TODO, COMPLETE_TODO } from "./todoReducer";

const Todo = ({ todo }) => {
    const [, dispatch] = useContext(TodoContext);
    const removeTodo = (id) => {
        dispatch({ type: REMOVE_TODO, id });
    };
    const completeTodo = (id) => {
        dispatch({ type: COMPLETE_TODO, id });
    };

    return (
        <div className="todoItem">
      <span
          style={{ marginRight: "5px" }}
          className={todo.completed ? "completed" : ""}
      >
        {todo.text}
      </span>
            <button onClick={() => removeTodo(todo.id)}>✕</button>
            <button onClick={() => completeTodo(todo.id)}>✓</button>
        </div>
    );
};
export default Todo;
