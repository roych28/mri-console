import dummyDoctors from '../dummy/dummyDoctors.json';

const defaultState = {
    ready: false,
    loading: false,
    doctorsList: dummyDoctors
};

export default function(state = defaultState, action) {
    const { type, payload } = action;

    switch (type) {
        default:
            return state;
    }
}
