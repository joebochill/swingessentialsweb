  
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { saveAuthToken } from '../api/token-middleware';

export const store = createStore(rootReducer(), applyMiddleware(thunk, saveAuthToken));