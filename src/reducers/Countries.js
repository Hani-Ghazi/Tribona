import {
  COUNTRIES_FETCHED
} from "../types";

const INIT_STATE = [];

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case COUNTRIES_FETCHED:
      return action.payload;
    default:
      return state;
  }
};