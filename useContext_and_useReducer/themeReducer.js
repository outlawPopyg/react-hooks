import { colors } from "./themeContext";
export const LIGHT = "LIGHT";
export const DARK = "DARK";

const themeReducer = (state, action) => {
    switch (action.type) {
        case LIGHT:
            return {
                ...colors.light
            };
        case DARK:
            return {
                ...colors.dark
            };

        default:
            return state;
    }
};

export default themeReducer;
