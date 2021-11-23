import React, { useState, useReducer, useCallback, useEffect } from "react";
import todoReducer, { ADD_TODO } from "./todoReducer";
import TodoContext from "./context";
import TodoList from "./TodoList";
import ThemeContext, { colors } from "./themeContext";
import "./styles.css";
import themeReducer from "./themeReducer";
import ThemeToggler from "./ThemeToggler";

export default function App() {
    const [id, setId] = useState(1);
    const [text, setText] = useState("");
    const initialState = [];
    const [todoState, dispatch] = useReducer(todoReducer, initialState);
    const [themeState, dispatchTheme] = useReducer(themeReducer, colors.light);

    const addItem = (e) => {
        e.preventDefault();
        const newId = id + 1;
        setId(newId);
        dispatch({
            type: ADD_TODO,
            id: newId,
            text: text
        });
        setText("");
    };

    const themeSetter = useCallback(theme => dispatchTheme({ type: theme }), [dispatchTheme]);

    return (
        <TodoContext.Provider value={[todoState, dispatch]}>
            <ThemeContext.Provider value={[themeState, themeSetter]}>
                <div
                    className="app"
                    style={{
                        background: themeState.backgroundColor,
                        color: themeState.color
                    }}
                >
                    <ThemeToggler />
                    <h1>Todo app</h1>
                    <form className="input" onSubmit={addItem}>
                        <input value={text} onChange={(e) => setText(e.target.value)} />
                        <button disabled={text.length === 0} type="submit">
                            +
                        </button>
                    </form>
                    <TodoList />
                </div>
            </ThemeContext.Provider>
        </TodoContext.Provider>
    );
}
