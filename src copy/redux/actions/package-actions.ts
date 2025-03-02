import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { HttpRequest } from '../../api/http';
import { success, failure } from '../../api/http-helper';

import * as ACTIONS from './types';
import { Package } from '../../__types__';

export function loadPackages() {
    return (dispatch: Dispatch): void => {
        dispatch({ type: ACTIONS.GET_PACKAGES.REQUEST });

        void HttpRequest.get(ACTIONS.GET_PACKAGES.API)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.GET_PACKAGES.SUCCESS, body));
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.GET_PACKAGES.FAILURE, response as Response, 'LoadPackages'));
            })
            .request();
    };
}

type PartialPackage = Partial<Package> & {
    id: string | number;
};
export function updatePackage(pkg: PartialPackage) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.UPDATE_PACKAGE.REQUEST });

        void HttpRequest.put(ACTIONS.UPDATE_PACKAGE.API)
            .withBody(pkg)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.UPDATE_PACKAGE.SUCCESS, body));
                dispatch(loadPackages());
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.UPDATE_PACKAGE.FAILURE, response as Response, 'UpdatePackage'));
            })
            .request();
    };
}

export function addPackage(pkg: Omit<Package, 'id'>) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.ADD_PACKAGE.REQUEST });

        void HttpRequest.post(ACTIONS.ADD_PACKAGE.API)
            .withBody(pkg)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.ADD_PACKAGE.SUCCESS, body));
                dispatch(loadPackages());
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.ADD_PACKAGE.FAILURE, response as Response, 'AddPackage'));
            })
            .request();
    };
}

export function removePackage(pkg: Package) {
    return (dispatch: ThunkDispatch<any, void, any>): void => {
        dispatch({ type: ACTIONS.REMOVE_PACKAGE.REQUEST });

        void HttpRequest.put(ACTIONS.REMOVE_PACKAGE.API)
            .withBody(pkg)
            .onSuccess((body: any) => {
                dispatch(success(ACTIONS.REMOVE_PACKAGE.SUCCESS, body));
                dispatch(loadPackages());
            })
            .onFailure((response) => {
                dispatch(failure(ACTIONS.REMOVE_PACKAGE.FAILURE, response as Response, 'RemovePackage'));
            })
            .request();
    };
}
