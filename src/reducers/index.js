import { combineReducers } from 'redux';
import settings from './settings'

const reducers = combineReducers({
    settings
});

const rootReducer = (state, action) => {
    return reducers(state, action);
}

export default rootReducer;