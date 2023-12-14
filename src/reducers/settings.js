import { ACTION_TYPES } from "../utils/constants";

const INITIAL_STATE = { 
    loggedInUser: null,
    isLoggedIn: false,
    isDarkMode: true
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {    
        case ACTION_TYPES.SET_LOGGED_IN_USER:
            return {
                ...state,
                loggedInUser: action.payload
            }
        case ACTION_TYPES.SET_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.payload
            }
        case ACTION_TYPES.SET_DARK_MODE:
            return {
                ...state,
                isDarkMode: action.payload
            }
        case ACTION_TYPES.LOGOUT:
            return {
                ...INITIAL_STATE
            }
        default:
            return state;
    }
}