import {
  JOURNEY_COMMENTS_FETCHED,
  JOURNEYS_FETCHED,
  POPULAR_JOURNEYS_FETCHED,
  JOURNEY_FETCHED
} from "../types";
import api from "../api/journeys";

export const getJourneys = (params) => (dispatch) =>
  api.getJourneys(params).then(journeys => dispatch({ type: JOURNEYS_FETCHED, payload: journeys }));
export const getPopularJourneys = () => (dispatch) =>
  api.getPopularJourneys().then(journeys => dispatch({ type: POPULAR_JOURNEYS_FETCHED, payload: journeys }));

export const getJourneyById = (id) => (dispatch) =>
  api.getJourneyById(id).then(journey => dispatch({ type: JOURNEY_FETCHED, payload: journey }));


export const getJourneyComments = (id) => (dispatch) =>
  api.getJourneyComments(id).then(comments => dispatch({ type: JOURNEY_COMMENTS_FETCHED, payload: comments }));


export const addOrUpdateComment = ({ id, text, commentId }) => () => api.addOrUpdateComment({ id, text, commentId });

export const deleteComment = ({ id, commentId }) => () => api.deleteComment({ id, commentId });


export const journeyToggleLike = ({ id, isLiked }) => () => isLiked ? api.journeyDisLike(id) : api.journeyLike(id);
export const journeyToggleFavorite = ({ id, isFavorite }) => () => isFavorite ? api.journeyUnFav(id) : api.journeyFav(id);

export const getJourneySteps = (id) => () =>
  api.getJourneySteps(id);


export const createJourney = (journey) => () => api.createJourney(journey);

export const updateJourney = (journey) => () => api.updateJourney(journey);

export const createStep = (step) => () => api.createStep(step);

export const updateStep = (step) => () => api.updateStep(step);

export const deleteJourneyStep = (id) => (dispatch) =>
  api.deleteJourneyStep(id);

export const stepToggleLike = ({id, isLiked}) => () => isLiked? api.stepDisLike(id) : api.stepLike(id);