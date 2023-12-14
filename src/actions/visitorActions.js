import { ACTION_TYPES } from "../utils/constants";

export const requestVisitorRequests = (userID) => {
    return { type: ACTION_TYPES.VISITOR_REQUEST, payload: userID };
}

export const raiseVisitorAccess = (visitor) => {
    return { type: ACTION_TYPES.NEW_VISITOR_REQUEST, payload: visitor };
}

export const adminAction = (reqBody) => {
    return { type: ACTION_TYPES.ADMIN_APPROVAL_ACTION_REQUEST, payload: reqBody };
}

export const requestAdminApprovals = () => {
    return { type: ACTION_TYPES.ADMIN_APPROVAL_REQUEST };
}