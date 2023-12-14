import { ACTION_TYPES } from "../utils/constants";

const INITIAL_STATE = { 
    floorPlan: []
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {        
        case ACTION_TYPES.FLOOR_PLAN_REQUEST_SUCCESS:
            return {
                ...state,
                floorPlan: action.payload
            }        
        default:
            return state;
    }
}