import {
  TRIP_COMMENTS_FETCHED,
  TRIPS_FETCHED,
  POPULAR_TRIPS_FETCHED,
  TRIP_FETCHED
} from "../types";
import api from "../api/trips";
import { defaultPagination } from "../utils";

export const getTrips = (params) => (dispatch) =>
  api.getTrips({ ...params, pagination: defaultPagination })
    .then(trips => dispatch({ type: TRIPS_FETCHED, payload: trips }));

export const getPopularTrips = (params) => (dispatch) =>
  api.getPopularTrips(params).then(trips => dispatch({ type: POPULAR_TRIPS_FETCHED, payload: trips }));

export const getTripById = (id) => (dispatch) =>
  api.getTripById(id).then(trip => dispatch({ type: TRIP_FETCHED, payload: trip }));


export const getTripsComments = (id) => (dispatch) =>
  api.getTripsComments(id).then(comments => dispatch({ type: TRIP_COMMENTS_FETCHED, payload: comments }));


export const addOrUpdateComment = ({ id, text, commentId }) => () => api.addOrUpdateComment({ id, text, commentId });

export const deleteComment = ({ id, commentId }) => () => api.deleteComment({ id, commentId });


export const tripToggleLike = ({ id, isLiked }) => () => isLiked ? api.tripDisLike(id) : api.tripLike(id);
export const tripToggleFavorite = ({ id, isFavorite }) => () => isFavorite ? api.tripUnFav(id) : api.tripFav(id);

export const getTripSteps = (id) => () =>
  api.getTripSteps(id);


export const createTrip = (trip) => () => api.createTrip(trip);

export const updateTrip = (trip) => () => api.updateTrip(trip);

export const createStep = (step) => () => api.createStep(step);

export const updateStep = (step) => () => api.updateStep(step);

export const deleteStep = (id) => () => api.deleteStep(id);

export const stepToggleLike = ({ id, isLiked }) => () => isLiked ? api.stepDisLike(id) : api.stepLike(id);

export const rateTrip = (id, newRating) => () => api.rateTrip(id, newRating);