export const toggle = display => ({
    type: 'TOGGLE_ACTION',
    payload: { display },
});

export const startFasting = (startTime, endTime, duration) => ({
    type: 'TOGGLE_ACTION',
    payload: {
        startTime,
        endTime,
        duration,
    },
});

export const updateFast = (startTime, endTime, duration) => ({
    type: 'UPDATE_FAST',
    payload: {
        startTime,
        endTime,
        duration,
    },
});

export const endFast = () => ({
    type: 'END_FAST',
});

export const fasting = (state = {}, action) => {
    switch (action.type) {
        case 'TOGGLE_DISPLAY':
            return {
                ...state,
                display: !state.display,
            };
        case 'START_FASTING':
        case 'UPDATE_FAST':
            return {
                ...state,
                startTime: action.payload.startTime,
                endTime: action.payload.endTime,
                duration: action.payload.duration,
            };
        case 'END_FAST':
            return {
                ...state,
                startTime: null,
                endTime: null,
                duration: null,
            };
        default:
            return state;
    }
};
