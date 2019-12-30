import dummyApps from '../dummy/dummyApps.json';
import { APPS_SCANNED } from 'actions/types';

const defaultState = {
    ready: false,
    loading: false,
    applications: dummyApps
};

export default function(state = defaultState, action) {
    const { type, payload } = action;

    switch (type) {
        case APPS_SCANNED:
            return {
                ...state,
                ready: true,
                loading: false
            };
        default:
            return state;
    }
}
