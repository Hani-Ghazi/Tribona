import { COUNTRIES_FETCHED } from "../types";
import api from "../api/utils";

export const getCountries = () => dispatch =>
  api.getCountries().then(countries => dispatch({ type: COUNTRIES_FETCHED, payload: countries }));

export const getCitiesByCountryId = (id) => () =>
  api.getCitiesByCountry(id);