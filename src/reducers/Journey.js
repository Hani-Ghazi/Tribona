import {
  JOURNEYS_FETCHED,
  POPULAR_JOURNEYS_FETCHED
} from "../types";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case JOURNEYS_FETCHED:
      return { ...state, list: action.payload };
    case POPULAR_JOURNEYS_FETCHED:
      return { ...state, popular: action.payload };
    default:
      return state;
  }
};