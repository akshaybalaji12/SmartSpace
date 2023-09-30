import { ACTION_TYPES } from "../utils/constants";

export const setDarkMode = (isDarkMode) => {
    return { type: ACTION_TYPES.darkMode, payload: isDarkMode };
}

export const setLoggedIn = (isLoggedIn) => {
    return { type: ACTION_TYPES.isLoggedIn, payload: isLoggedIn };
}