import axios from "axios";
import qs from "query-string";
import { clearObject } from "../utils";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});


const user = JSON.parse(localStorage.triponaUser === "undefined" ? "{}" : localStorage.getItem("triponaUser"));
const access_token = (user && user.token && user.token !== "") ? `bearer ${user.token}` : null;

// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] = access_token ? access_token : "";

instance.interceptors.request.use(config => {
  if (!!config.filters || !!config.pagination) {
    const filters = clearObject(Object.assign({}, config.filters, config.pagination));
    config.url += `?${qs.stringify(filters)}`;
  }
  return config;
});

instance.interceptors.response.use(res => {
  return res.data;
}, error => {
  if (error && error.response && error.response.status &&
    (error.response.status === 401 || error.response.status === 403)) {
    localStorage.removeItem("triponaUser");
    window.location.href = "/";
  }
  return error && error.response && error.response.data ? Promise.reject(error.response.data) : Promise.reject(error);
});

export default instance;
