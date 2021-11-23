import React, { useContext } from "react";
import TodoContext from "./context";
import TodoItem from "./TodoItem";
const TodoList = () => {
    const [state] = useContext(TodoContext);
    return (
        <div className="todos">
            {state.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
};
export default TodoList;
