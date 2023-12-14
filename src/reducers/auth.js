import { ACTION_TYPES } from "../utils/constants";

const INITIAL_STATE = { 
    userData: {},
    createdUser: {},
    loginError: "",
    signUpError: "",
    delegatesDetails: [],
    statistics: [],
    delegatesError: "",
    isLoading: false
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {     
        case ACTION_TYPES.STATISTICS_REQUEST:
            return {
                ...state,
                isLoading: true,
                statistics: []
            } 
        case ACTION_TYPES.STATISTICS_REQUEST_SUCCESS:
            return {
                ...state,
                statistics: [...action.payload],
                isLoading: false
            }
        case ACTION_TYPES.STATISTICS_REQUEST_FAILURE:
            return {
                ...state,
                statistics: [],
                isLoading: false
            }   
        case ACTION_TYPES.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true
            }    
        case ACTION_TYPES.SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true
            }    
        case ACTION_TYPES.DELEGATES_REQUEST:
            return {
                ...state,
                isLoading: true
            }      
        case ACTION_TYPES.LOGIN_REQUEST_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                isLoading: false
            }
        case ACTION_TYPES.LOGIN_REQUEST_FAILURE:
            return {
                ...state,
                loginError: action.payload,
                isLoading: false
            }
        case ACTION_TYPES.SIGNUP_REQUEST_SUCCESS:
            return {
                ...state,
                createdUser: action.payload,
                isLoading: false
            }
        case ACTION_TYPES.SIGNUP_REQUEST_FAILURE:
            return {
                ...state,
                signUpError: action.payload,
                isLoading: false
            }
        case ACTION_TYPES.DELEGATES_REQUEST_SUCCESS:
            return {
                ...state,
                delegatesDetails: [...action.payload],
                isLoading: false
            }
        case ACTION_TYPES.DELEGATES_REQUEST_FAILURE:
            return {
                ...state,
                delegatesError: action.payload,
                isLoading: false
            }      
        case ACTION_TYPES.CLEAR_AUTH_ERROR:
            return {
                ...state,
                loginError: "",
                signUpError: "",
                delegatesError: "",
                isLoading: false
            }
        case ACTION_TYPES.LOGOUT:
            return {
                ...INITIAL_STATE
            }
        default:
            return state;
    }
}