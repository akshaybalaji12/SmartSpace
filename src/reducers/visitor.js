import { ACTION_TYPES } from "../utils/constants";

const INITIAL_STATE = { 
    visitorRequests: [],
    isLoading: false,
    newVisitorMessage: '',
    actionMessage: '',
    requestMessage: '',
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {   
        case ACTION_TYPES.ADMIN_APPROVAL_ACTION_REQUEST:
            return {
                ...state,
                actionMessage: ''
            }   
        case ACTION_TYPES.ADMIN_APPROVAL_ACTION_REQUEST_SUCCESS:
            return {
                ...state,
                actionMessage: action.payload
            }  
        case ACTION_TYPES.ADMIN_APPROVAL_ACTION_REQUEST_FAILURE:
            return {
                ...state,
                actionMessage: action.payload
            }           
        case ACTION_TYPES.ADMIN_APPROVAL_REQUEST:
            return {
                ...state,
                isLoading: true,
                requestMessage: ''
            }  
        case ACTION_TYPES.ADMIN_APPROVAL_REQUEST_SUCCESS:
            return {
                ...state,
                visitorRequests: [...action.payload],
                isLoading: false,
                requestMessage: ''
            }        
        case ACTION_TYPES.ADMIN_APPROVAL_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                visitorRequests: [],
                requestMessage: action.payload
            }     
        case ACTION_TYPES.NEW_VISITOR_REQUEST_SUCCESS:
            return {
                ...state,
                newVisitorMessage: action.payload
            }        
        case ACTION_TYPES.NEW_VISITOR_REQUEST_FAILURE:
            return {
                ...state,
                newVisitorMessage: action.payload
            }         
        case ACTION_TYPES.VISITOR_REQUEST:
            return {
                ...state,
                isLoading: true,
                actionMessage: ''
            }       
        case ACTION_TYPES.VISITOR_REQUEST_SUCCESS:
            return {
                ...state,
                visitorRequests: [...action.payload],
                isLoading: false
            }       
        case ACTION_TYPES.VISITOR_REQUEST_FAILURE:
            return {
                ...state,
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