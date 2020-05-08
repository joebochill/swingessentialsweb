import { HttpRequest } from '../../api/http';
import { success, failure } from '../../api/http-helper';
import { Dispatch } from 'redux';
import * as ACTIONS from './types';

export function checkDiscount(code: string) {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.CHECK_DISCOUNT.REQUEST });

        HttpRequest.get(`${ACTIONS.CHECK_DISCOUNT.API}?code=${code}`)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.CHECK_DISCOUNT.SUCCESS, body));
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.CHECK_DISCOUNT.FAILURE, response, 'LoadPackages'));
            })
            .request();
    };
}
