import ThemeContext from "./themeContext";
import React, { useContext, useEffect, useState } from "react";
import { DARK, LIGHT } from "./themeReducer";

const ThemeToggler = () => {
    const [showLight, setShowLight] = useState(true);
    const [themeState, themeSetter] = useContext(ThemeContext);
    const dispatchToDarkTheme = () => themeSetter(DARK);
    const dispatchToLightTheme = () => themeSetter(LIGHT);

    const toggleTheme = () => {
        showLight ? dispatchToDarkTheme() : dispatchToLightTheme();
        setShowLight(!showLight);
    };

    // useEffect(() => console.log(themeState));

    return (
        <div>
            <button onClick={toggleTheme}>
                {showLight ? "Change to Dark Theme" : "Change to Light Theme"}
            </button>
        </div>
    );
};
export default ThemeToggler;
