import { HttpRequest } from '../../api/http';
import { success, failure } from '../../api/http-helper';
import { Dispatch } from 'redux';
import * as ACTIONS from './types';
import { Pro } from '../../__types__';
import { ThunkDispatch } from 'redux-thunk';

export function loadPros() {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.GET_PROS.REQUEST });

        HttpRequest.get(ACTIONS.GET_PROS.API)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.GET_PROS.SUCCESS, body));
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.GET_PROS.FAILURE, response, 'loadPros'));
            })
            .request();
    };
}
export function updatePro(pro: Pro) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.UPDATE_PRO.REQUEST });

        HttpRequest.put(ACTIONS.UPDATE_PRO.API)
            .withBody(pro)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.UPDATE_PRO.SUCCESS, body));
                dispatch(loadPros());
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.UPDATE_PRO.FAILURE, response, 'UpdatePro'));
            })
            .request();
    };
}

export function addPro(pro: Omit<Pro, 'id'>) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.ADD_PRO.REQUEST });

        HttpRequest.post(ACTIONS.ADD_PRO.API)
            .withBody(pro)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.ADD_PRO.SUCCESS, body));
                dispatch(loadPros());
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.ADD_PRO.FAILURE, response, 'AddPro'));
            })
            .request();
    };
}

export function removePro(pro: { id: number | string }) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.REMOVE_PRO.REQUEST });

        HttpRequest.put(ACTIONS.REMOVE_PRO.API)
            .withBody(pro)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.REMOVE_PRO.SUCCESS, body));
                dispatch(loadPros());
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.REMOVE_PRO.FAILURE, response, 'RemovePro'));
            })
            .request();
    };
}
