import api from "./index";

export default {
  getTrips: (params) => api.get(`trips`, params),
  getPopularTrips: () => api.get(`trips`),
  getTripById: (id) => api.get(`trips/${id}`),
  getTripComments: (id) => api(`trips/${id}/comments`),
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
  rateTrip: (id, newRating) => api.post(`trips/${id}/rating`, { value: newRating })
};