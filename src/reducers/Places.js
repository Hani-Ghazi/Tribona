import {
  PLACE_FETCHED,
  PLACES_FETCHED,
  COMMENTS_FETCHED,
  PLACE_LIKE_STATUS_FETCHED,
  PLACE_FAV_STATUS_FETCHED
} from "../types";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PLACES_FETCHED:
      return { list: action.payload };
    case PLACE_FETCHED:
      return { place: { ...state.place, ...action.payload } };
    case COMMENTS_FETCHED:
      return { place: { ...state.place, comments: action.payload } };
    case PLACE_LIKE_STATUS_FETCHED:
      return { place: { ...state.place, isLike: action.payload } };
    case PLACE_FAV_STATUS_FETCHED:
      return { place: { ...state.place, isFav: action.payload } };
    default:
      return state;
  }
};