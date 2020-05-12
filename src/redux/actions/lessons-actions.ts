import { HttpRequest } from '../../api/http';
import { success, failure, xhrfailure } from '../../api/http-helper';
import { Dispatch } from 'redux';
import * as ACTIONS from './types';
import { ThunkDispatch } from 'redux-thunk';
import { loadCredits } from './credit-actions';

export function loadLessons() {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.GET_LESSONS.REQUEST });

        HttpRequest.get(ACTIONS.GET_LESSONS.API)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.GET_LESSONS.SUCCESS, body));
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.GET_LESSONS.FAILURE, response, 'LoadLessons'));
            })
            .request();
    };
}

/* Lets a user redeem a credit and submit a new lesson request */
export function submitLesson(data: FormData, onUpdateProgress: (this: XMLHttpRequest, ev: ProgressEvent) => any) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.SUBMIT_LESSON.REQUEST });

        HttpRequest.post(ACTIONS.SUBMIT_LESSON.API)
            .withBody(data, false)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.SUBMIT_LESSON.SUCCESS, body));
                dispatch(loadLessons());
                dispatch(loadCredits());
            })
            .onFailure((response: XMLHttpRequest) => {
                dispatch(xhrfailure(ACTIONS.SUBMIT_LESSON.FAILURE, response));
            })
            .requestWithProgress(onUpdateProgress);
    };
}

/* Marks a new lesson as viewed by the user */
export function markLessonViewed(lessonID: number) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.MARK_VIEWED.REQUEST });

        HttpRequest.put(ACTIONS.MARK_VIEWED.API)
            .withBody({ id: lessonID })
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.MARK_VIEWED.SUCCESS, body));
                dispatch(loadLessons());
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.MARK_VIEWED.FAILURE, response, 'markViewed'));
            })
            .request();
    };
}

/* Allows an administrator to reply to a lesson */
type LessonUpdate = {
    lesson_id: number;
    username: string;
    date?: string;
    response_video: string;
    response_notes: string;
    response_status: 'good' | 'bad';
};

export function putLessonResponse(data: LessonUpdate) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.PUT_LESSON.REQUEST });

        HttpRequest.put(ACTIONS.PUT_LESSON.API)
            .withBody(data)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.PUT_LESSON.SUCCESS, body));
                dispatch(loadLessons());
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.PUT_LESSON.FAILURE, response, 'markViewed'));
            })
            .request();
    };
}
