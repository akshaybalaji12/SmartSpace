import { ACTION_TYPES } from "../utils/constants";

export const requestFloorPlan = () => {
    return { type: ACTION_TYPES.FLOOR_PLAN_REQUEST };
}