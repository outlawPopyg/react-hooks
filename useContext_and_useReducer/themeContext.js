import { createContext } from "react";

export const colors = {
    dark: {
        backgroundColor: "#000000",
        color: "#ffffff"
    },

    light: {
        backgroundColor: "#ffffff",
        color: "#000000"
    }
};

const themeContext = createContext(colors.light);
export default themeContext;
