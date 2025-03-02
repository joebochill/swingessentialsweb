type FailureAction = {
    type: string;
    response: Response | null;
    error: string | null;
};
/* Dispatch a failure action for the supplied action type */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const failure = (type: string, response: Response | null, api: string): FailureAction => {
    // if (response && response.headers && response.headers.get) {
        // TODO Log an error
        // console.error(`Request failed to ${api}`);
    // }
    return {
        type: type,
        response: response,
        error: response && response.headers && response.headers.get ? response.headers.get('Error') : 'N/A',
    };
};

type XHRFailureAction = {
    type: string;
    response: XMLHttpRequest | null;
    error: number | null;
};
/* Dispatch a failure action for the supplied action type, XMLHTTPRequest variant */
export const xhrfailure = (type: string, response: XMLHttpRequest): XHRFailureAction => {
    // if (response && response.getResponseHeader) {
        // TODO Log an error
    // }
    return {
        type: type,
        response: response,
        error: response && response.getResponseHeader ? parseInt(response.getResponseHeader('Error') || '', 10) : -1,
    };
};

type SuccessAction = {
    type: string;
    payload: any;
};
/* Dispatch a success action for the supplied action type */
export const success = (type: string, data: any = null): SuccessAction => ({
    type: type,
    payload: data,
});
