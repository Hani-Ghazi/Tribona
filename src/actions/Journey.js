import {
  JOURNEYS_FETCHED,
  POPULAR_JOURNEYS_FETCHED
} from "../types";
import api from "../api/journeys";

export const getJourneys = () => (dispatch) =>
  api.getJourneys().then(journeys => dispatch({ type: JOURNEYS_FETCHED, payload: journeys }));
export const getPopularJourneys = () => (dispatch) =>
  api.getPopularJourneys().then(journeys => dispatch({ type: POPULAR_JOURNEYS_FETCHED, payload: journeys }));