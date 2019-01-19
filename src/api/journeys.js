import api from "./index";

export default {
  getJourneys: () => api.get(`journeys`).then(res => res.data),
  getPopularJourneys : () => api.get(`journeys`).then(res => res.data)
};