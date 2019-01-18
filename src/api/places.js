import api from "./index";

export default {
  getPlaces: () => api.get("places").then(res => res.data),
  getPlacesCategories: () => api.get("places/categories").then(res => res.data),
  getPlaceById: (id) => api.get(`places/${id}`).then(res => res.data),
  getPlaceComments: (id) => api(`places/${id}/comments`).then(res => res.data),
  placeLike: (id) => api.put(`places/${id}/like`).then(res => res.data),
  placeDisLike: (id) => api.delete(`places/${id}/like`).then(res => res.data),
  placeFav: (id) => api.put(`places/${id}/favorite`).then(res => res.data),
  placeUnFav: (id) => api.delete(`places/${id}/favorite`).then(res => res.data),
  addOrUpdateComment: ({ id, text, commentId }) => api.post(`places/${id}/comments${!!commentId ? "/" + commentId : ""}`, { text }).then(res => res.data),
  deleteComment: ({ id, commentId }) => api.delete(`places/${id}/${commentId}`).then(res => res.data)
};