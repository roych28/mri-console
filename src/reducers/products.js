import dummyApps from '../dummy/dummyApps.json';

const defaultState = {
    ready: false,
    loading: false,
    applications: dummyApps
};

export default function(state = defaultState, action) {
    const { type, payload } = action;

    switch (type) {
        default:
            return state;
    }
}
