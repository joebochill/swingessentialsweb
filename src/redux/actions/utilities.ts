const PREFIX = '@@SE/';

type ReduxAction = {
    REQUEST: string;
    SUCCESS: string;
    FAILURE: string;
    API: string;
};
export const createAction = (action: string, api: string): ReduxAction => ({
    REQUEST: `${PREFIX}/${action}.REQUEST`,
    SUCCESS: `${PREFIX}/${action}.SUCCESS`,
    FAILURE: `${PREFIX}/${action}.FAILURE`,
    API: api,
});

export const createResetAction = (action: string): string => `${PREFIX}/RESET/${action}`;
