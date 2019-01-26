import {
  LOGIN_MODAL_CLOSE,
  LOGIN_MODAL_OPEN
} from "../types";

export const openLoginModal = () => (dispatch) => dispatch({ type: LOGIN_MODAL_OPEN });
export const closeLoginModal = () => (dispatch) => dispatch({ type: LOGIN_MODAL_CLOSE });