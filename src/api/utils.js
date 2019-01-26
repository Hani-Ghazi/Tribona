import api from "./index";

export default {
  getCountries: () => api.get("places/countries/En").then(res => res.data),
  getCitiesByCountry: (id) => api.get(`places/countries/En/${id}/cities`).then(res => res.data),
  upload: (files) => api.post(`upload`, files).then(res => res.data)
};