import { takeLatest, put, call } from 'redux-saga/effects';
import { ACTION_TYPES, BASE_URL, ENDPOINTS } from "../utils/constants";
import * as NavigationService from '../services/NavigationService';

function* loginUser(action) {
    const loginURL = BASE_URL + ENDPOINTS.login;
    try {        
        let response = yield fetch(
            loginURL,
            {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(action.payload)
            });
        response = yield response.json();
        if(response.status !== 200) {
            yield put({ type: ACTION_TYPES.LOGIN_REQUEST_FAILURE, payload: response.errorMessage });
        } else {
            let { userID } = response.data;
            if(response.data.isAdmin) user = 'admin';
            yield put({ type: ACTION_TYPES.LOGIN_REQUEST_SUCCESS, payload: response.data });
            yield put({ type: ACTION_TYPES.SET_LOGGED_IN_USER, payload: userID });
            yield put({ type: ACTION_TYPES.SET_LOGGED_IN, payload: true });
            NavigationService.navigate('Home')
        } 
    } catch (error) {
        yield put({ type: ACTION_TYPES.LOGIN_REQUEST_FAILURE, payload: error });
    } 
}

function* signUpUser(action) {
    const signUpURL = BASE_URL + ENDPOINTS.signUp;
    try {
        let response = yield fetch(
        signUpURL,
        {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
        });
        response = yield response.json();
        if(response.status !== 201) {
            yield put({ type: ACTION_TYPES.SIGNUP_REQUEST_FAILURE, payload: response.errorMessage });
        } else {
            yield put({ type: ACTION_TYPES.SIGNUP_REQUEST_SUCCESS, payload: response.data });        
        }  
    } catch (error) {
        yield put({ type: ACTION_TYPES.SIGNUP_REQUEST_FAILURE, payload: error });
    }
}

function* getDelegates(action) {
    const delegatesURL = `${BASE_URL}${ENDPOINTS.getDelegates}/${action.payload}`
    try {        
        let response = yield fetch(delegatesURL);
        response  = yield response.json();
        if(response.status !== 200) {
            yield put({ type: ACTION_TYPES.DELEGATES_REQUEST_FAILURE, payload: response.errorMessage });
        } else {
            yield put({ type: ACTION_TYPES.DELEGATES_REQUEST_SUCCESS, payload: response.data });
        } 
    } catch (error) {
        yield put({ type: ACTION_TYPES.DELEGATES_REQUEST_FAILURE, payload: error });
    } 
}

function* getStatistics(action) {
    const statisticsURL = `${BASE_URL}${ENDPOINTS.getStatistics}/${action.payload}`
    try {        
        let response = yield fetch(statisticsURL);
        response  = yield response.json();
        if(response.status !== 200) {
            yield put({ type: ACTION_TYPES.STATISTICS_REQUEST_FAILURE, payload: response.errorMessage });
        } else {
            yield put({ type: ACTION_TYPES.STATISTICS_REQUEST_SUCCESS, payload: response.data });
        } 
    } catch (error) {
        yield put({ type: ACTION_TYPES.STATISTICS_REQUEST_FAILURE, payload: error });
    } 
}

export const authSagas = [
    takeLatest(ACTION_TYPES.LOGIN_REQUEST, loginUser),
    takeLatest(ACTION_TYPES.SIGNUP_REQUEST, signUpUser),
    takeLatest(ACTION_TYPES.DELEGATES_REQUEST, getDelegates),
    takeLatest(ACTION_TYPES.STATISTICS_REQUEST, getStatistics)
];