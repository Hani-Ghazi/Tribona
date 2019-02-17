import {
  LOGIN_MODAL_OPEN,
  LOGIN_MODAL_CLOSE,
  LIGHT_BOX_CLOSE,
  LIGHT_BOX_OPEN,
  STEPS_DRAWER_OPEN,
  STEPS_DRAWER_CLOSE
} from "../types";

const INIT_STATE = { isLoginModalOpen: false, isLightBoxOpen: false, lightBoxImages: [] };

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_MODAL_OPEN:
      return { ...state, isLoginModalOpen: true };
    case LOGIN_MODAL_CLOSE:
      return { ...state, isLoginModalOpen: false };
    case LIGHT_BOX_OPEN:
      return { ...state, isLightBoxOpen: true, lightBoxImages: action.payload };
    case LIGHT_BOX_CLOSE:
      return { ...state, isLightBoxOpen: false, lightBoxImages: [] };
    case STEPS_DRAWER_OPEN:
      return { ...state, stepsDrawer: action.payload, isStepsDrawerOpen: true };
    case STEPS_DRAWER_CLOSE:
      return { ...state, stepsDrawer: null, isStepsDrawerOpen: false };
    default:
      return state;
  }
};