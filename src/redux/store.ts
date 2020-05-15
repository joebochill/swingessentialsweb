import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { saveAuthToken } from '../api/token-middleware';

export const store = createStore(rootReducer(), applyMiddleware(thunk, saveAuthToken));
