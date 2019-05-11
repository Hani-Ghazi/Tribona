import {
  CONSTANTS_LOADED
} from "../types";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CONSTANTS_LOADED:
      return { constants: action.payload };
    default:
      return state;
  }
};