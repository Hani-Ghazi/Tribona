import api from "./index";

export default {
  getPlaces: (filters) => api.get("places", filters),
  getPlacesCategories: () => api.get("places/categories"),
  getPlaceById: (id) => api.get(`places/${id}`),
  getPlaceComments: (id) => api(`places/${id}/comments`),
  placeLike: (id) => api.put(`places/${id}/like`),
  placeDisLike: (id) => api.delete(`places/${id}/like`),
  placeFav: (id) => api.put(`places/${id}/favorite`),
  placeUnFav: (id) => api.delete(`places/${id}/favorite`),
  addOrUpdateComment: ({ id, text, commentId }) => api.post(`places/${id}/comments${!!commentId ? "/" + commentId : ""}`, { text }),
  deleteComment: ({ id, commentId }) => api.delete(`places/${id}/comments/${commentId}`),
  createPlace: (place) => api.post(`places`, place),
  updatePlace: (place) => api.put(`places/${place.id}`, place),
  ratePlace: (id, newRating) => api.post(`places/${id}/rating`, { value: newRating })
};