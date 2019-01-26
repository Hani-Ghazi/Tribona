import api from "./index";

export default {
  getJourneys: () => api.get(`journeys`).then(res => res.data),
  getPopularJourneys : () => api.get(`journeys`).then(res => res.data),
  getJourneyById: (id) => api.get(`journeys/${id}`).then(res => res.data),
  getJourneyComments: (id) => api(`journeys/${id}/comments`).then(res => res.data),
  journeyLike: (id) => api.put(`journeys/${id}/like`).then(res => res.data),
  journeyDisLike: (id) => api.delete(`journeys/${id}/like`).then(res => res.data),
  journeyFav: (id) => api.put(`journeys/${id}/favorite`).then(res => res.data),
  journeyUnFav: (id) => api.delete(`journeys/${id}/favorite`).then(res => res.data),
  addOrUpdateComment: ({ id, text, commentId }) => api.post(`journeys/${id}/comments${!!commentId ? "/" + commentId : ""}`, { text }).then(res => res.data),
  deleteComment: ({ id, commentId }) => api.delete(`journeys/${id}/${commentId}`).then(res => res.data)
};