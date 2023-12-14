import { ACTION_TYPES } from "../utils/constants";

export const requestLogin = (userParams) => {
    return { type: ACTION_TYPES.LOGIN_REQUEST, payload: userParams };
}

export const requestSignUp = (userParams) => {
    return { type: ACTION_TYPES.SIGNUP_REQUEST, payload: userParams };
}

export const requestDelegates = (userID) => {
    return { type: ACTION_TYPES.DELEGATES_REQUEST, payload: userID };
}

export const requestStatistics = (userID) => {
    return { type: ACTION_TYPES.STATISTICS_REQUEST, payload: userID };
}

export const clearError = () => {
    return { type: ACTION_TYPES.CLEAR_AUTH_ERROR };
}

export const logoutUser = () => {
    return { type: ACTION_TYPES.LOGOUT, payload: null };
}