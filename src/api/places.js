import api from "./index";

export default {
  getPlaces: () => api.get("places").then(res => res.data),
  getPlacesCategories: () => api.get("places/categories").then(res => res.data),
  getPlaceById: (id) => api.get(`places/${id}`).then(res => res.data),
  getPlaceComments: (id) => api(`places/${id}/comments`).then(res => res.data),
  CheckPlaceLikeStatus: (id) => api(`places/${id}/like`).then(() => true).catch(() => false),
  placeLike: (id) => api.put(`places/${id}/like`).then(res => res.data),
  placeDisLike: (id) => api.delete(`places/${id}/like`).then(res => res.data)
  // CheckPlaceLikeStatus  : () => api.get(`places/${id}/`).then(res => res.data)
};