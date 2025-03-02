import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import * as ACTIONS from './types';

import { HttpRequest } from '../../api/http';
import { success, failure } from '../../api/http-helper';

export function loadCredits() {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.GET_CREDITS.REQUEST });

        void HttpRequest.get(ACTIONS.GET_CREDITS.API)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.GET_CREDITS.SUCCESS, body));
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.GET_CREDITS.FAILURE, response as Response, 'LoadCredits'));
            })
            .request();
    };
}

type PurchaseData = {
    version?: 'v1' | 'v2';
    id: string;
    payer: string;
    package: string;
    coupon: string;
    total: string;
};
/* Hands the payment processing over to the server */
export function purchaseCredits(data: PurchaseData) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.PURCHASE_CREDITS.REQUEST });
        void HttpRequest.put(ACTIONS.PURCHASE_CREDITS.API)
            .withBody(data)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.PURCHASE_CREDITS.SUCCESS, body));
                dispatch(loadCredits());
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.PURCHASE_CREDITS.FAILURE, response as Response, 'PurchaseCredits'));
            })
            .request();
    };
}
