import { ThunkDispatch } from 'redux-thunk';
import * as ACTIONS from './types';
import { HttpRequest } from '../../api/http';
import { success, failure } from '../../api/http-helper';
import { Audience, EmailType } from '../../__types__';

export function sendBulkEmail(email: {
    subject: string;
    title: string;
    body: string;
    type: EmailType;
    audience: Audience;
    bcc?: string[];
}) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.SEND_BULK_EMAIL.REQUEST });

        void HttpRequest.post(ACTIONS.SEND_BULK_EMAIL.API)
            .withBody(email)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.SEND_BULK_EMAIL.SUCCESS, body));
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.SEND_BULK_EMAIL.FAILURE, response as Response, 'SendBulkEmail'));
            })
            .request();
    };
}
