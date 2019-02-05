import {
  START_LOADING,
  START_UPDATEING,
  FINISHED_LOADING,
  FINISHED_UPDATEGING
} from "../types";

export const startLoading = () => (dispatch) => dispatch({ type: START_LOADING });
export const finishedLoading = () => (dispatch) => dispatch({ type: FINISHED_LOADING });
export const startUpdating = () => (dispatch) => dispatch({ type: START_UPDATEING });
export const finishedUpdating = () => (dispatch) => dispatch({ type: FINISHED_UPDATEGING });