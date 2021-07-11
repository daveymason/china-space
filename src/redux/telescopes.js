import * as ActionTypes from './ActionTypes';

export const Telescopes = (state = {
        isLoading: true,
        errMess: null,
        telescopes: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TELESCOPES:
            return {...state, isLoading: false, errMess: null, telescopes: action.payload};
        case ActionTypes.TELESCOPES_LOADING:
            return {...state, isLoading: true, errMess: null, telescopes: []};
        case ActionTypes.TELESCOPES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};