import { COUNTRIES_FETCHED } from "../types";
import utilsApi from "../api/utils";

export const getCountries = () => dispatch =>
  utilsApi.getCountries().then(countries => dispatch({ type: COUNTRIES_FETCHED, payload: countries }));