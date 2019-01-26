import {
  PLACES_FETCHED,
  PLACE_FETCHED,
  PLAEC_COMMENTS_FETCHED,
  POPULAR_PLACES_FETCHED
} from "../types";
import api from "../api/places";

export const getPlaces = (filters) => dispatch =>
  api.getPlaces(filters).then(places => dispatch({ type: PLACES_FETCHED, payload: places }));


export const getPopularPlaces = () => dispatch =>
  api.getPlaces().then(places => dispatch({ type: POPULAR_PLACES_FETCHED, payload: places }));

export const getPlaceById = (id) => (dispatch) =>
  api.getPlaceById(id).then(place => dispatch({ type: PLACE_FETCHED, payload: place }));

export const getPlaceComments = (id) => (dispatch) =>
  api.getPlaceComments(id).then(comments => dispatch({ type: PLAEC_COMMENTS_FETCHED, payload: comments }));


export const addOrUpdateComment = ({ id, text, commentId }) => () => api.addOrUpdateComment({ id, text, commentId });

export const deleteComment = ({ id, commentId }) => () => api.deleteComment({ id, commentId });


export const placeToggleLike = ({ id, isLiked }) => () => isLiked ? api.placeDisLike(id) : api.placeLike(id);
export const placeToggleFavorite = ({ id, isFavorite }) => () => isFavorite ? api.placeUnFav(id) : api.placeFav(id);

export const getPlacesCategories = () => () => api.getPlacesCategories();

export const createPlace = (place) => (dispatch) => api.createPlace(place).then(palce => dispatch({
  type: PLACE_FETCHED,
  payload: place
}));
export const updatePlace = (place) => (dispatch) => api.updatePlace(place).then(palce => dispatch({
  type: PLACE_FETCHED,
  payload: place
}));
