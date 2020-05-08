import { HttpRequest } from '../../api/http';
import { success, failure } from '../../api/http-helper';
import { Dispatch } from 'redux';
import * as ACTIONS from './types';

export function checkUsernameAvailability(username: string) {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.CHECK_USERNAME.REQUEST });
        HttpRequest.get(`${ACTIONS.CHECK_USERNAME.API}?username=${encodeURIComponent(username)}`)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.CHECK_USERNAME.SUCCESS, body)); // {...json, lastChecked: username}
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.CHECK_USERNAME.FAILURE, response, 'CheckUsername'));
            })
            .request();
    };
}

export function checkEmailAvailability(email: string) {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.CHECK_EMAIL.REQUEST });
        HttpRequest.get(`${ACTIONS.CHECK_EMAIL.API}?email=${encodeURIComponent(email)}`)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.CHECK_EMAIL.SUCCESS, body)); // {...json, lastChecked: email}
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.CHECK_EMAIL.FAILURE, response, 'CheckEmail'));
            })
            .request();
    };
}

export function resetRegistrationAvailabilityChecks() {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.CHECK_EMAIL.RESET });
        dispatch({ type: ACTIONS.CHECK_USERNAME.RESET });
    };
}

type NewAccountDetails = {
    username: string;
    email: string;
    password: string;
    heard: string;
    firstName?: string;
    lastName?: string;
    location?: string;
    phone?: string;
};
export function createAccount(data: NewAccountDetails) {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.CREATE_ACCOUNT.REQUEST });
        HttpRequest.put(ACTIONS.CREATE_ACCOUNT.API)
            .withBody(data)
            .onSuccess((response: any) => {
                const token = response.headers.get('Token');
                dispatch(success(ACTIONS.CREATE_ACCOUNT.SUCCESS, { token, personal: data }));
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.CREATE_ACCOUNT.FAILURE, response, 'CreateAccount'));
            })
            .request();
    };
}

export function verifyEmail(code: string) {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.VERIFY_EMAIL.REQUEST });
        HttpRequest.put(ACTIONS.VERIFY_EMAIL.API)
            .withBody({ type: 'email', code: code })
            .onSuccess((response: any) => {
                dispatch(success(ACTIONS.VERIFY_EMAIL.SUCCESS, response));
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.VERIFY_EMAIL.FAILURE, response, 'VerifyEmail'));
            })
            .request();
    };
}

export function requestPasswordReset(data: { email: string }) {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.RESET_PASSWORD_EMAIL.REQUEST });
        HttpRequest.put(ACTIONS.RESET_PASSWORD_EMAIL.API)
            .withBody(data)
            .onSuccess((response: any) => {
                dispatch(success(ACTIONS.RESET_PASSWORD_EMAIL.SUCCESS, response));
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.RESET_PASSWORD_EMAIL.FAILURE, response, 'ResetRequest'));
            })
            .request();
    };
}

export function verifyResetPasswordCode(code: string) {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.VERIFY_RESET_PASSWORD_CODE.REQUEST });
        HttpRequest.put(ACTIONS.VERIFY_RESET_PASSWORD_CODE.API)
            .withBody({ type: 'reset', code: code })
            .withParsedResponse()
            .onSuccess((response: any) => {
                dispatch(success(ACTIONS.VERIFY_RESET_PASSWORD_CODE.SUCCESS, response));
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.VERIFY_RESET_PASSWORD_CODE.FAILURE, response, 'VerifyResetCode'));
            })
            .request();
    };
}
