// import { TOKEN_TIMEOUT } from '../redux/actions/types';
// import { store } from '../redux/store';
// import { loadUserContent } from '../redux/actions/auth-actions';
// import { Dispatch } from 'redux';

/* Dispatch a failure action for the supplied action type */
export function failure(type: string, response: Response | null, api: string) {
    if (response && response.headers && response.headers.get) {
        // TODO Log an error
    }
    return {
        type: type,
        response: response,
        error: response && response.headers && response.headers.get ? response.headers.get('Error') : 'N/A',
    };
}

/* Dispatch a failure action for the supplied action type, XMLHTTPRequest variant */
export function xhrfailure(type: string, response: XMLHttpRequest) {
    if (response && response.getResponseHeader) {
        // TODO Log an error
    }
    return {
        type: type,
        response: response,
        error: response && response.getResponseHeader ? parseInt(response.getResponseHeader('Error') || '', 10) : -1,
    };
}

/* Dispatch a success action for the supplied action type */
export function success(type: string, data: any = null) {
    return {
        type: type,
        payload: data,
    };
}

// export function checkTimeout(response: Response, dispatch: Dispatch) {
//     // If we get a failed API call, check if our authentication needs to be re-upped
//     const error =
//         response && response.headers && response.headers.get ? parseInt(response.headers.get('Error') || '', 10) : 999;
//     if (error && error === 400100 && dispatch) {
//         store.dispatch({ type: TOKEN_TIMEOUT });
//         store.dispatch(loadUserContent());
//     }
// }