import {
  START_LOADING,
  START_UPDATEING,
  FINISHED_LOADING,
  FINISHED_UPDATING
} from "../types";

const INIT_STATE = { isLoading: false, isUpdating: false };

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case FINISHED_LOADING:
      return { ...state, isLoading: false };
    case START_UPDATEING:
      return { ...state, isUpdating: true };
    case FINISHED_UPDATING:
      return { ...state, isUpdating: false };
    default:
      return state;
  }
};