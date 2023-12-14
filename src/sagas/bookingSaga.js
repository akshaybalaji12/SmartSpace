import { takeLatest, put } from 'redux-saga/effects';
import { ACTION_TYPES, BASE_URL, ENDPOINTS } from "../utils/constants";

function* getBookings(action) {
    const bookingsURL = `${BASE_URL}${ENDPOINTS.bookings}/${action.payload}`;
    try {        
        let response = yield fetch(bookingsURL);
        response  = yield response.json();    
        if(response.status !== 200) {
            yield put({ type: ACTION_TYPES.BOOKING_REQUEST_FAILURE, payload: response.errorMessage });
        } else {
            yield put({ type: ACTION_TYPES.BOOKING_REQUEST_SUCCESS, payload: response.data });
        } 
    } catch (error) {
        yield put({ type: ACTION_TYPES.BOOKING_REQUEST_FAILURE, payload: error });
    } 
}

function* getAvailability(action) {
    const availabilityURL = `${BASE_URL}${ENDPOINTS.seatAvailability}`;    
    try {        
        let response = yield fetch(availabilityURL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            });
        response  = yield response.json();   
        if(response.status !== 200) {
            yield put({ type: ACTION_TYPES.BOOKING_AVAILABILITY_REQUEST_FAILURE, payload: response.errorMessage });
        } else {
            yield put({ type: ACTION_TYPES.BOOKING_AVAILABILITY_REQUEST_SUCCESS, payload: response.data });
        } 
    } catch (error) {    
        console.log(error);
        yield put({ type: ACTION_TYPES.BOOKING_AVAILABILITY_REQUEST_FAILURE, payload: error });
    } 
}

function* bookSeat(action) {
    const bookSeatURL = BASE_URL + ENDPOINTS.bookSeat;
    try {    
        let response = yield fetch(
            bookSeatURL,
            {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(action.payload)
            });
        response = yield response.json();
        if(response.status !== 201) {
            yield put({ type: ACTION_TYPES.NEW_BOOKING_REQUEST_FAILURE, payload: response.errorMessage });
        } else {
            yield put({ type: ACTION_TYPES.NEW_BOOKING_REQUEST_SUCCESS, payload: response.data });        
        }  
    } catch (error) {
        yield put({ type: ACTION_TYPES.NEW_BOOKING_REQUEST_FAILURE, payload: error });
    }
}

function* modifyBooking(action) {
    const modifyBookingURL = BASE_URL + ENDPOINTS.modifyBooking;
    try {    
        let response = yield fetch(
            modifyBookingURL,
            {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(action.payload)
            });
        response = yield response.json();
        if(response.status !== 201) {
            yield put({ type: ACTION_TYPES.MODIFY_BOOKING_REQUEST_FAILURE, payload: response.errorMessage });
        } else {
            yield put({ type: ACTION_TYPES.MODIFY_BOOKING_REQUEST_SUCCESS, payload: response.data });        
        }  
    } catch (error) {
        yield put({ type: ACTION_TYPES.MODIFY_BOOKING_REQUEST_FAILURE, payload: error });
    }
}

export const bookingSaga = [
    takeLatest(ACTION_TYPES.BOOKING_REQUEST, getBookings),
    takeLatest(ACTION_TYPES.NEW_BOOKING_REQUEST, bookSeat),
    takeLatest(ACTION_TYPES.BOOKING_AVAILABILITY_REQUEST, getAvailability),
    takeLatest(ACTION_TYPES.MODIFY_BOOKING_REQUEST, modifyBooking)
];