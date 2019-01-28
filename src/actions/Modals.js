import {
  LOGIN_MODAL_CLOSE,
  LOGIN_MODAL_OPEN,
  LIGHT_BOX_CLOSE,
  LIGHT_BOX_OPEN
} from "../types";

export const openLoginModal = () => (dispatch) => dispatch({ type: LOGIN_MODAL_OPEN });
export const closeLoginModal = () => (dispatch) => dispatch({ type: LOGIN_MODAL_CLOSE });
export const openLightBoxModal = (images) => (dispatch) => dispatch({ type: LIGHT_BOX_OPEN, payload: images });
export const closeLightBoxModal = () => (dispatch) => dispatch({ type: LIGHT_BOX_CLOSE });