import api from "./index";

export default {
  getJourneys: (params) => api.get(`journeys`, params),
  getPopularJourneys: () => api.get(`journeys`),
  getJourneyById: (id) => api.get(`journeys/${id}`),
  getJourneyComments: (id) => api(`journeys/${id}/comments`),
  journeyLike: (id) => api.put(`journeys/${id}/like`),
  journeyDisLike: (id) => api.delete(`journeys/${id}/like`),
  journeyFav: (id) => api.put(`journeys/${id}/favorite`),
  journeyUnFav: (id) => api.delete(`journeys/${id}/favorite`),
  addOrUpdateComment: ({ id, text, commentId }) =>
    api.post(`journeys/${id}/comments${!!commentId ? "/" + commentId : ""}`, { text }),
  deleteComment: ({ id, commentId }) => api.delete(`journeys/${id}/comments/${commentId}`),
  getJourneySteps: (id) => api.get(`journeys/${id}/steps`),
  createJourney: (journey) => api.post(`journeys`, journey),
  updateJourney: (journey) => api.put(`journeys/${journey.id}`, journey),
  createStep: (step) => api.post(`journeys/${step.journeyId}/steps`, step),
  updateStep: (step) => api.put(`journeys/steps/${step.id}`, step),
  deleteJourneyStep: (id) => api.delete(`journeys/steps/${id}`),
  stepDisLike: (id) => api.delete(`journeys/steps/${id}/like`),
  stepLike: (id) => api.put(`journeys/steps/${id}/like`),
  rateJourney: (id, newRating) => api.post(`journeys/${id}/rating`, { value: newRating }),
  stepComment: (stepId, comment) =>
    api.post(`journeys/steps/${stepId}/comments${comment.id ? "/" + comment.id : ""}`, comment),
  rateStep: (stepId, value) => api.post(`journeys/steps/${stepId}/rating`, { value }),
  getStepsComments: (stepId) => api.get(`journeys/steps/${stepId}/comments`),
  deleteStepComment: (stepId, commentId) => api.delete(`journeys/steps/${stepId}/comments/${commentId}`)
};