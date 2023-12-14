import { ACTION_TYPES } from "../utils/constants";

const INITIAL_STATE = { 
    bookings: [],
    bookingMessage: '',
    modifyBookingMessage: '',
    seatBookingData: {},
    unavailableSeats: [],
    bookedSeats: [],
    isLoading: false
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {   
        case ACTION_TYPES.MODIFY_BOOKING_REQUEST_SUCCESS:
            return {
                ...state,
                modifyBookingMessage: action.payload
            }       
        case ACTION_TYPES.MODIFY_BOOKING_REQUEST_FAILURE:
            return {
                ...state,
                modifyBookingMessage: action.payload
            }       
        case ACTION_TYPES.NEW_BOOKING_REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                bookingMessage: 'success'
            }     
        case ACTION_TYPES.NEW_BOOKING_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                bookingMessage: 'failed'
            }      
        case ACTION_TYPES.NEW_BOOKING_REQUEST:
            return {
                ...state,
                isLoading: true
            }     
        case ACTION_TYPES.BOOKING_REQUEST:
            return {
                ...state,
                isLoading: true,
                bookingMessage: '',
                modifyBookingMessage: ''
            }         
        case ACTION_TYPES.BOOKING_AVAILABILITY_REQUEST:
            return {
                ...state,
                isLoading: true
            }            
        case ACTION_TYPES.SET_BOOKING_DATA:
            return {
                ...state,
                seatBookingData: { ...action.payload }
            }     
        case ACTION_TYPES.BOOKING_REQUEST_SUCCESS:
            return {
                ...state,
                bookings: [...action.payload],
                bookingMessage: '',
                isLoading: false
            }          
        case ACTION_TYPES.BOOKING_REQUEST_FAILURE:
            return {
                ...state,
                bookingMessage: action.payload,
                isLoading: false
            }     
        case ACTION_TYPES.BOOKING_AVAILABILITY_REQUEST_FAILURE:
            return {
                ...state,
                bookingMessage: action.payload,
                isLoading: false
            }     
        case ACTION_TYPES.BOOKING_AVAILABILITY_REQUEST_SUCCESS:
            return {
                ...state,
                unavailableSeats: [...action.payload.unavailableSeats],
                bookedSeats: [...action.payload.bookedSeats],
                bookingMessage: '',
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