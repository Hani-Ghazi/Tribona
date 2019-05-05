import api from "./index";

export default {
  getTrips: (params) => api.get(`trips`, params),
  getPopularTrips: (params) => api.get(`trips`, params),
  getTripById: (id) => api.get(`trips/${id}`),
  getTripsComments: (id) => api(`trips/${id}/comments`),
  tripLike: (id) => api.put(`trips/${id}/like`),
  tripDisLike: (id) => api.delete(`trips/${id}/like`),
  tripFav: (id) => api.put(`trips/${id}/favorite`),
  tripUnFav: (id) => api.delete(`trips/${id}/favorite`),
  addOrUpdateComment: ({ id, text, commentId }) => api.post(`trips/${id}/comments${!!commentId ? "/" + commentId : ""}`, { text }),
  deleteComment: ({ id, commentId }) => api.delete(`trips/${id}/comments/${commentId}`),
  getTripSteps: (id) => api.get(`trips/${id}/steps`),
  createTrip: (trip) => api.post(`trips`, trip),
  updateTrip: (trip) => api.put(`trips/${trip.id}`, trip),
  createStep: (step) => api.post(`trips/${step.tripId}/steps`, step),
  updateStep: (step) => api.put(`trips/steps/${step.id}`, step),
  deleteStep: (id) => api.delete(`trips/steps/${id}`),
  stepDisLike: (id) => api.delete(`trips/steps/${id}/like`),
  stepLike: (id) => api.put(`trips/steps/${id}/like`),
  rateTrip: (id, newRating) => api.post(`trips/${id}/rating`, { value: newRating }),
  stepComment: (stepId, comment) =>
    api.post(`trips/steps/${stepId}/comments${comment.id ? "/" + comment.id : ""}`, comment),
  rateStep: (stepId, value) => api.post(`trips/steps/${stepId}/rating`, { value }),
  getStepsComments: (stepId) => api.get(`trips/steps/${stepId}/comments`),
  deleteStepComment: (stepId, commentId) => api.delete(`trips/steps/${stepId}/comments/${commentId}`),
  getFeatures: () => api.get(`trips/features`),
  booking: (data) => api.put(`trips/${data.id}/booking`, data)
};