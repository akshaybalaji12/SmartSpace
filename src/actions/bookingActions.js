import { ACTION_TYPES } from "../utils/constants";

export const requestBookings = (userID) => {
    return { type: ACTION_TYPES.BOOKING_REQUEST, payload: userID };
}

export const requestAvailability = (availabilityBody) => {
    return { type: ACTION_TYPES.BOOKING_AVAILABILITY_REQUEST, payload: availabilityBody };
}

export const setBookingData = (bookingData) => {
    return { type: ACTION_TYPES.SET_BOOKING_DATA, payload: bookingData };
}

export const bookSeat = (bookingParams) => {
    return { type: ACTION_TYPES.NEW_BOOKING_REQUEST, payload: bookingParams };
}

export const modifyBooking = (booking) => {
    return { type: ACTION_TYPES.MODIFY_BOOKING_REQUEST, payload: booking };
}