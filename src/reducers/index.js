import { combineReducers } from 'redux';
import settings from './settings'
import auth from './auth'
import metadata from './metadata'
import bookings from './bookings';
import visitor from './visitor';
import { ACTION_TYPES } from '../utils/constants';

const reducers = combineReducers({
    settings,
    auth,
    metadata,
    bookings,
    visitor
});

const rootReducer = (state, action) => {
    if(action === ACTION_TYPES.LOGOUT) {
        
        const { settings, metadata } = state;
        state = { settings, metadata };
        
    }

    return reducers(state, action);
}

export default rootReducer