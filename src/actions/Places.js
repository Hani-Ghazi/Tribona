import {
  PLACES_FETCHED,
  PLACE_FETCHED,
  COMMENTS_FETCHED,
  PLACE_LIKE_STATUS_FETCHED,
  PLACE_FAV_STATUS_FETCHED
} from "../types";
import api from "../api/places";

export const getPlaces = () => dispatch =>
  api.getPlaces().then(countries => dispatch({ type: PLACES_FETCHED, payload: countries }));

export const getPlaceById = (id) => (dispatch) =>
  api.getPlaceById(id).then(place => dispatch({ type: PLACE_FETCHED, payload: place }));

export const getPlaceComments = (id) => (dispatch) =>
  api.getPlaceComments(id).then(comments => dispatch({ type: COMMENTS_FETCHED, payload: comments }));

export const CheckPlaceFavStatus = (id) => (dispatch) =>
  api.CheckPlaceFavStatus(id).then(status => dispatch({ type: PLACE_FAV_STATUS_FETCHED, payload: status }));

export const CheckPlaceLikeStatus = (id) => (dispatch) =>
  api.CheckPlaceLikeStatus(id).then(status => dispatch({ type: PLACE_LIKE_STATUS_FETCHED, payload: status }));

export const placeLike = (id) => () => api.placeLike(id);

export const placeDisLike = (id) => () => api.placeDisLike(id);