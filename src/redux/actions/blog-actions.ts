import { HttpRequest } from '../../api/http';
import { success, failure } from '../../api/http-helper';
import { Dispatch } from 'redux';
import * as ACTIONS from './types';
import { ThunkDispatch } from 'redux-thunk';
import { Blog } from '../../__types__';

export function loadBlogs() {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.GET_BLOGS.REQUEST });

        HttpRequest.get(ACTIONS.GET_BLOGS.API)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.GET_BLOGS.SUCCESS, body));
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.GET_BLOGS.FAILURE, response, 'Load19Hole'));
            })
            .request();
    };
}
export function updateBlog(blog: Blog) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.UPDATE_BLOG.REQUEST });

        HttpRequest.put(ACTIONS.UPDATE_BLOG.API)
            .withBody(blog)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.UPDATE_BLOG.SUCCESS, body));
                dispatch(loadBlogs());
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.UPDATE_BLOG.FAILURE, response, 'UpdateBlog'));
            })
            .request();
    };
}

export function addBlog(blog: Omit<Blog, 'id'>) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.ADD_BLOG.REQUEST });

        HttpRequest.post(ACTIONS.ADD_BLOG.API)
            .withBody(blog)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.ADD_BLOG.SUCCESS, body));
                dispatch(loadBlogs());
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.ADD_BLOG.FAILURE, response, 'AddBlog'));
            })
            .request();
    };
}

export function removeBlog(blog: Blog) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.REMOVE_BLOG.REQUEST });

        HttpRequest.put(ACTIONS.REMOVE_BLOG.API)
            .withBody(blog)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.REMOVE_BLOG.SUCCESS, body));
                dispatch(loadBlogs());
            })
            .onFailure((response: Response) => {
                dispatch(failure(ACTIONS.REMOVE_BLOG.FAILURE, response, 'RemoveBlog'));
            })
            .request();
    };
}
