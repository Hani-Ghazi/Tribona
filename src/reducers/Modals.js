import {
  LOGIN_MODAL_OPEN,
  LOGIN_MODAL_CLOSE
} from "../types";

const INIT_STATE = { isLoginModalOpen: false };

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_MODAL_OPEN:
      return { isLoginModalOpen: true };
    case LOGIN_MODAL_CLOSE:
      return { isLoginModalOpen: false };
    default:
      return state;
  }
};