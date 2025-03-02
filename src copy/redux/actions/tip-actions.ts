import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import * as ACTIONS from './types';
import { Tip } from '../../../src/__types__';

import { HttpRequest } from '../../api/http';
import { success, failure } from '../../api/http-helper';

export function loadTips() {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.GET_TIPS.REQUEST });

        void HttpRequest.get(ACTIONS.GET_TIPS.API)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.GET_TIPS.SUCCESS, body));
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.GET_TIPS.FAILURE, response as Response, 'LoadTips'));
            })
            .request();
    };
}

export function updateTip(tip: Tip) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.UPDATE_TIP.REQUEST });

        void HttpRequest.put(ACTIONS.UPDATE_TIP.API)
            .withBody(tip)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.UPDATE_TIP.SUCCESS, body));
                dispatch(loadTips());
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.UPDATE_TIP.FAILURE, response as Response, 'UpdateTip'));
            })
            .request();
    };
}

export function addTip(tip: Omit<Tip, 'id'>) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.ADD_TIP.REQUEST });

        void HttpRequest.post(ACTIONS.ADD_TIP.API)
            .withBody(tip)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.ADD_TIP.SUCCESS, body));
                dispatch(loadTips());
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.ADD_TIP.FAILURE, response as Response, 'AddTip'));
            })
            .request();
    };
}

export function removeTip(tip: Tip) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.REMOVE_TIP.REQUEST });

        void HttpRequest.put(ACTIONS.REMOVE_TIP.API)
            .withBody(tip)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.REMOVE_TIP.SUCCESS, body));
                dispatch(loadTips());
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.REMOVE_TIP.FAILURE, response as Response, 'RemoveTip'));
            })
            .request();
    };
}
