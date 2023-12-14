import { ACTION_TYPES } from "../utils/constants";

export const setLoggedInUser = (userID) => {
    return { type: ACTION_TYPES.SET_LOGGED_IN_USER, payload: userID };
}

export const setDarkMode = (isDarkMode) => {
    return { type: ACTION_TYPES.SET_DARK_MODE, payload: isDarkMode };
}

export const setAdmin = () => {
    return { type: ACTION_TYPES.SET_ADMIN };
}

export const setLoggedIn = (isLoggedIn) => {
    return { type: ACTION_TYPES.SET_LOGGED_IN, payload: isLoggedIn };
}