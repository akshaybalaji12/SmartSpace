import { authSagas } from '../sagas/authSaga';
import { all } from 'redux-saga/effects';
import { metadataSaga } from './metadataSaga';
import { bookingSaga } from './bookingSaga';
import { visitorSaga } from './visitorSaga';

export default function* rootSaga() {
    yield all([
        ...authSagas,
        ...metadataSaga,
        ...bookingSaga,
        ...visitorSaga
    ]);
}