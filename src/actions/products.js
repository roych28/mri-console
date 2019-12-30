import { APPS_SCANNED } from './types';

export const setAppsAsScanned = () => async dispatch => {
    dispatch({
        type: APPS_SCANNED
    });
};
