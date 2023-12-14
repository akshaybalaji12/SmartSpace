import { takeLatest, put } from 'redux-saga/effects';
import { ACTION_TYPES, BASE_URL, ENDPOINTS } from "../utils/constants";

function* getAdminApprovals() {
    const adminRequestURL = `${BASE_URL}${ENDPOINTS.getAdminApprovals}`;
    try {        
        let response = yield fetch(adminRequestURL);
        response  = yield response.json();
        if(response.status === 200) {
            yield put({ type: ACTION_TYPES.ADMIN_APPROVAL_REQUEST_SUCCESS, payload: response.data });
        } else {
            yield put({ type: ACTION_TYPES.ADMIN_APPROVAL_REQUEST_FAILURE, payload: response.data });
        }
    } catch (error) {
        console.log(error);
    } 
}

function* getVisitorRequests(action) {
    const visitorRequestURL = `${BASE_URL}${ENDPOINTS.getVisitorRequests}/${action.payload}`;
    try {        
        let response = yield fetch(visitorRequestURL);
        response  = yield response.json();
        if(response.status === 200) {
            yield put({ type: ACTION_TYPES.VISITOR_REQUEST_SUCCESS, payload: response.data });
        } else {
            yield put({ type: ACTION_TYPES.VISITOR_REQUEST_FAILURE, payload: response.data });
        }
    } catch (error) {
        console.log(error);
    } 
}

function* newVisitorRequest(action) {
    const newVisitorRequestURL = `${BASE_URL}${ENDPOINTS.raiseVisitorAccess}`;
    try {        
        let response = yield fetch(
        newVisitorRequestURL,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
        });
        response = yield response.json();
        if(response.status !== 201) {
            yield put({ type: ACTION_TYPES.NEW_VISITOR_REQUEST_FAILURE, payload: response.errorMessage });
        } else {
            yield put({ type: ACTION_TYPES.NEW_VISITOR_REQUEST_SUCCESS, payload: response.data });        
        }  
    } catch (error) {
        console.log(error);
    } 
}

function* adminAction(action) {
    const adminActionURL = `${BASE_URL}${ENDPOINTS.adminAction}`;
    try {        
        let response = yield fetch(
        adminActionURL,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
        });
        response = yield response.json();
        if(response.status !== 201) {
            yield put({ type: ACTION_TYPES.ADMIN_APPROVAL_ACTION_REQUEST_FAILURE, payload: response.errorMessage });
        } else {
            yield put({ type: ACTION_TYPES.ADMIN_APPROVAL_ACTION_REQUEST_SUCCESS, payload: response.data });        
        }  
    } catch (error) {
        console.log(error);
    } 
}

export const visitorSaga = [
    takeLatest(ACTION_TYPES.VISITOR_REQUEST, getVisitorRequests),
    takeLatest(ACTION_TYPES.NEW_VISITOR_REQUEST, newVisitorRequest),
    takeLatest(ACTION_TYPES.ADMIN_APPROVAL_REQUEST, getAdminApprovals),
    takeLatest(ACTION_TYPES.ADMIN_APPROVAL_ACTION_REQUEST, adminAction)
];