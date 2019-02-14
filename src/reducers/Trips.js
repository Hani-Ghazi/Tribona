import {
  TRIP_COMMENTS_FETCHED,
  TRIP_FETCHED,
  TRIPS_FETCHED,
  POPULAR_TRIPS_FETCHED
} from "../types";

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TRIPS_FETCHED:
      return { ...state, list: action.payload };
    case TRIP_FETCHED:
      return { ...state, trip: { ...state.trip, ...action.payload } };
    case TRIP_COMMENTS_FETCHED:
      return { ...state, trip: { ...state.trip, comments: action.payload } };
    case POPULAR_TRIPS_FETCHED :
      return { ...state, popular: action.payload };
    default:
      return state;
  }
};