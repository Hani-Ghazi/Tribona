import api from "./index";

export default {
  getCountries: () => api.get("places/countries/En"),
  getCitiesByCountry: (id) => api.get(`places/countries/En/${id}/cities`),
  upload: (files) => api.post(`upload`, files),
  sendEmailContact: (data) => api.post("/constants/contact", data),
  getHomeContents: (params) => api.get("/home", params),
  getConstants: () => api.get("/constants")
};