import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootSaga from '../sagas';
import auth from '../reducers/auth';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

const saga = createSagaMiddleware();

const middlewares = [saga, thunk]

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, compose(applyMiddleware(...middlewares)));
export const persistor = persistStore(store);

saga.run(rootSaga);