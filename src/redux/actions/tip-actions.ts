import { HttpRequest } from '../../api/http';
import { success, failure } from '../../api/http-helper';
import { Dispatch } from 'redux';
import * as ACTIONS from './types';
import { Tip } from '../../__types__';
import { ThunkDispatch } from 'redux-thunk';

export function loadTips() {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.GET_TIPS.REQUEST });

        HttpRequest.get(ACTIONS.GET_TIPS.API)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.GET_TIPS.SUCCESS, body));
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.GET_TIPS.FAILURE, response, 'LoadTips'));
            })
            .request();
    };
}

export function updateTip(tip: Tip) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.UPDATE_TIP.REQUEST });

        HttpRequest.put(ACTIONS.UPDATE_TIP.API)
            .withBody(tip)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.UPDATE_TIP.SUCCESS, body));
                dispatch(loadTips());
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.UPDATE_TIP.FAILURE, response, 'UpdateTip'));
            })
            .request();
    };
}

export function addTip(tip: Omit<Tip, 'id'>) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.ADD_TIP.REQUEST });

        HttpRequest.post(ACTIONS.ADD_TIP.API)
            .withBody(tip)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.ADD_TIP.SUCCESS, body));
                dispatch(loadTips());
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.ADD_TIP.FAILURE, response, 'AddTip'));
            })
            .request();
    };
}

export function removeTip(tip: Tip) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.REMOVE_TIP.REQUEST });

        HttpRequest.put(ACTIONS.REMOVE_TIP.API)
            .withBody(tip)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.REMOVE_TIP.SUCCESS, body));
                dispatch(loadTips());
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.REMOVE_TIP.FAILURE, response, 'RemoveTip'));
            })
            .request();
    };
}
