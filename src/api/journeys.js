import api from "./index";

export default {
  getJourneys: () => api.get(`journeys`).then(res => res.data),
  getPopularJourneys: () => api.get(`journeys`).then(res => res.data),
  getJourneyById: (id) => api.get(`journeys/${id}`).then(res => res.data),
  getJourneyComments: (id) => api(`journeys/${id}/comments`).then(res => res.data),
  journeyLike: (id) => api.put(`journeys/${id}/like`).then(res => res.data),
  journeyDisLike: (id) => api.delete(`journeys/${id}/like`).then(res => res.data),
  journeyFav: (id) => api.put(`journeys/${id}/favorite`).then(res => res.data),
  journeyUnFav: (id) => api.delete(`journeys/${id}/favorite`).then(res => res.data),
  addOrUpdateComment: ({ id, text, commentId }) => api.post(`journeys/${id}/comments${!!commentId ? "/" + commentId : ""}`, { text }).then(res => res.data),
  deleteComment: ({ id, commentId }) => api.delete(`journeys/${id}/comments/${commentId}`).then(res => res.data),
  getJourneySteps: (id) => api.get(`journeys/${id}/steps`).then(res => res.data),
  createJourney: (journey) => api.post(`journeys`, journey).then(res => res.data),
  updateJourney: (journey) => api.put(`journeys/${journey.id}`, journey).then(res => res.data),
  createStep: (step) => api.post(`journeys/${step.journeyId}/steps`, step).then(res => res.data),
  updateStep: (step) => api.put(`journeys/steps/${step.id}`, step).then(res => res.data),
  deleteJourneyStep: (id) => api.delete(`journeys/steps/${id}`).then(res => res.data),
  stepDisLike: (id) => api.delete(`journeys/steps/${id}/like`).then(res => res.data),
  stepLike: (id) => api.put(`journeys/steps/${id}/like`).then(res => res.data)
};