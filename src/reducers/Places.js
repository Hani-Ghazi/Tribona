import {
  PLACE_FETCHED,
  PLACES_FETCHED,
  PLAEC_COMMENTS_FETCHED,
  POPULAR_PLACES_FETCHED
} from "../types";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PLACES_FETCHED:
      return { ...state, list: action.payload };
    case PLACE_FETCHED:
      return { ...state, place: { ...state.place, ...action.payload } };
    case PLAEC_COMMENTS_FETCHED:
      return { ...state, place: { ...state.place, comments: action.payload } };
    case POPULAR_PLACES_FETCHED :
      return { ...state, popular: action.payload };
    default:
      return state;
  }
};