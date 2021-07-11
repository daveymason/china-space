import * as ActionTypes from "./ActionTypes";

export const Rovers = (
  state = { 
    isLoading: true, 
    errMess: null, 
    rovers: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_ROVERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        rovers: action.payload,
      };

    case ActionTypes.ROVERS_LOADING:
      return { ...state, isLoading: true, errMess: null, rovers: [] };

    case ActionTypes.ROVERS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
