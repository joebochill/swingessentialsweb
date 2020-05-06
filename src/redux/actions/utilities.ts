const PREFIX = '@@SE/';

export type ReduxAction = {
    REQUEST: string;
    SUCCESS: string;
    FAILURE: string;
    RESET: string;
    API: string;
};
export const createAction = (action: string, api: string): ReduxAction => ({
    REQUEST: `${PREFIX}/${action}.REQUEST`,
    SUCCESS: `${PREFIX}/${action}.SUCCESS`,
    FAILURE: `${PREFIX}/${action}.FAILURE`,
    RESET: `${PREFIX}/${action}.RESET`,
    API: api,
});