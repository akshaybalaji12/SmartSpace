import { takeLatest, put } from 'redux-saga/effects';
import { ACTION_TYPES, BASE_URL, ENDPOINTS } from "../utils/constants";

function* getFloorPlan() {
    const floorPlanURL = BASE_URL + ENDPOINTS.floorPlan;
    try {        
        let response = yield fetch(floorPlanURL);
        response  = yield response.json();
        if(response.status === 200) {
            yield put({ type: ACTION_TYPES.FLOOR_PLAN_REQUEST_SUCCESS, payload: response.data[0].floors });
        }
    } catch (error) {
        console.log(error);
    } 
}

export const metadataSaga = [
    takeLatest(ACTION_TYPES.FLOOR_PLAN_REQUEST, getFloorPlan)
];