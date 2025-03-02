import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import * as ACTIONS from './types';
import { Pro } from '../../__types__';

import { HttpRequest } from '../../api/http';
import { success, failure } from '../../api/http-helper';

export function loadPros() {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.GET_PROS.REQUEST });

        void HttpRequest.get(ACTIONS.GET_PROS.API)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.GET_PROS.SUCCESS, body));
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.GET_PROS.FAILURE, response as Response, 'loadPros'));
            })
            .request();
    };
}
export function updatePro(pro: Pro) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.UPDATE_PRO.REQUEST });

        void HttpRequest.put(ACTIONS.UPDATE_PRO.API)
            .withBody(pro)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.UPDATE_PRO.SUCCESS, body));
                dispatch(loadPros());
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.UPDATE_PRO.FAILURE, response as Response, 'UpdatePro'));
            })
            .request();
    };
}

export function addPro(pro: Omit<Pro, 'id'>) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.ADD_PRO.REQUEST });

        void HttpRequest.post(ACTIONS.ADD_PRO.API)
            .withBody(pro)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.ADD_PRO.SUCCESS, body));
                dispatch(loadPros());
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.ADD_PRO.FAILURE, response as Response, 'AddPro'));
            })
            .request();
    };
}

export function removePro(pro: { id: number | string }) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.REMOVE_PRO.REQUEST });

        void HttpRequest.put(ACTIONS.REMOVE_PRO.API)
            .withBody(pro)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.REMOVE_PRO.SUCCESS, body));
                dispatch(loadPros());
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.REMOVE_PRO.FAILURE, response as Response, 'RemovePro'));
            })
            .request();
    };
}
