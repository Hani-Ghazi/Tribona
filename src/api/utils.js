import api from "./index";

export default {
  getCountries: () => api.get("places/countries/En").then(res => res.data),
  getCitiesByCountry: (country) => api.get(`/places/countries/En/${country.geonameId}/cities`).then(res => res.data)
};