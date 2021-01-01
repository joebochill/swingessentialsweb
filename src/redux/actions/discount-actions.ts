import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import * as ACTIONS from './types';
import { Discount } from '../../__types__';

import { HttpRequest } from '../../api/http';
import { success, failure } from '../../api/http-helper';
import { TOKEN } from '../../api/token-middleware';
import { getUserRole } from '../../utilities/user';

export function loadDiscounts() {
    return (dispatch: Dispatch): void => {
        if (getUserRole(TOKEN || '') !== 'administrator') return;
        dispatch({ type: ACTIONS.GET_DISCOUNTS.REQUEST });

        void HttpRequest.get(ACTIONS.GET_DISCOUNTS.API)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.GET_DISCOUNTS.SUCCESS, body));
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.GET_DISCOUNTS.FAILURE, response as Response, 'loadDiscounts'));
            })
            .request();
    };
}

type PartialDiscount = Partial<Discount> & {
    id: string | number;
};
export function updateDiscount(discount: PartialDiscount) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.UPDATE_DISCOUNT.REQUEST });

        void HttpRequest.put(ACTIONS.UPDATE_DISCOUNT.API)
            .withBody(discount)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.UPDATE_DISCOUNT.SUCCESS, body));
                dispatch(loadDiscounts());
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.UPDATE_DISCOUNT.FAILURE, response as Response, 'UpdateDiscount'));
            })
            .request();
    };
}

export function addDiscount(discount: Omit<Discount, 'id'>) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.ADD_DISCOUNT.REQUEST });

        void HttpRequest.post(ACTIONS.ADD_DISCOUNT.API)
            .withBody(discount)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.ADD_DISCOUNT.SUCCESS, body));
                dispatch(loadDiscounts());
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.ADD_DISCOUNT.FAILURE, response as Response, 'AddDiscount'));
            })
            .request();
    };
}

export function removeDiscount(discount: Discount) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.REMOVE_DISCOUNT.REQUEST });

        void HttpRequest.put(ACTIONS.REMOVE_DISCOUNT.API)
            .withBody(discount)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.REMOVE_DISCOUNT.SUCCESS, body));
                dispatch(loadDiscounts());
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.REMOVE_DISCOUNT.FAILURE, response as Response, 'RemoveDiscount'));
            })
            .request();
    };
}

export function checkDiscount(code: string) {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.CHECK_DISCOUNT.REQUEST });

        void HttpRequest.get(`${ACTIONS.CHECK_DISCOUNT.API}?code=${code}`)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.CHECK_DISCOUNT.SUCCESS, body));
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.CHECK_DISCOUNT.FAILURE, response as Response, 'LoadPackages'));
            })
            .request();
    };
}
