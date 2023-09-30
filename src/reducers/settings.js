import { ACTION_TYPES } from "../utils/constants";

const INITIAL_STATE = { 
    isLoggedIn: false,
    isDarkMode: false
};

export default function(state = INITIAL_STATE, action) {

    switch(action.type) {
        
        case ACTION_TYPES.isLoggedIn:
            return {
                ...state,
                isLoggedIn: action.payload
            }

        case ACTION_TYPES.darkMode:
            return {
                ...state,
                isDarkMode: action.payload
            }

        default:
            return state;

    }

}