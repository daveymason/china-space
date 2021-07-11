import * as ActionTypes from "./ActionTypes";

export const Spaceports = (
  state = { isLoading: true, errMess: null, spaceports: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_SPACEPORTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        spaceports: action.payload,
      };

    case ActionTypes.SPACEPORTS_LOADING:
      return { ...state, isLoading: true, errMess: null, spaceports: [] };

    case ActionTypes.SPACEPORTS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
