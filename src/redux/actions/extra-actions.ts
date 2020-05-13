import { ThunkDispatch } from 'redux-thunk';
import * as ACTIONS from './types';
import { loadTips } from './tip-actions';
import { loadBlogs } from './blog-actions';
// import { loadPackages } from './PackageActions';
import { ASYNC_PREFIX } from '../../constants';
import { setToken } from './auth-actions';
import { loadPros } from './pro-actions';
import { loadPackages } from './package-actions';
import { loadDiscounts } from './discount-actions';
import { Dispatch } from 'redux';
import { HttpRequest } from '../../api/http';
import { success, failure } from '../../api/http-helper';

export function loadTestimonials() {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.GET_TESTIMONIALS.REQUEST });

        HttpRequest.get(ACTIONS.GET_TESTIMONIALS.API)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.GET_TESTIMONIALS.SUCCESS, body));
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.GET_TESTIMONIALS.FAILURE, response, 'LoadTestimonials'));
            })
            .request();
    };
}

export function loadInitialData(): Function {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        const token = localStorage.getItem(`${ASYNC_PREFIX}token`);
        if (token) dispatch(setToken(token));

        dispatch({ type: ACTIONS.INITIAL_LOAD });
        dispatch(loadTestimonials());
        dispatch(loadTips());
        dispatch(loadBlogs());
        dispatch(loadPros());
        dispatch(loadPackages());
        dispatch(loadDiscounts());
    };
}

// Send report with log data to swingessentials
// export function sendLogReport(log: string, type: LOG_TYPE) {
//     return (dispatch: ThunkDispatch<any, void, any>) => {
//         dispatch({ type: ACTIONS.SEND_LOGS.REQUEST });
//         HttpRequest.post(ACTIONS.SEND_LOGS.API)
//             .withBody({ platform: Platform.OS, data: log })
//             .onSuccess((body: any) => {
//                 Logger.clear(type);
//                 AsyncStorage.setItem(ASYNC_PREFIX + 'logs_sent', '' + Math.floor(Date.now() / 1000));
//                 dispatch(success(ACTIONS.SEND_LOGS.SUCCESS, body));
//             })
//             .onFailure((response: Response) => {
//                 dispatch(failure(ACTIONS.SEND_LOGS.FAILURE, response, 'SendLogs'));
//             })
//             .request();
//     };
// }
