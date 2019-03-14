import axios from "axios";
import qs from "query-string";


const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});


const user = JSON.parse(localStorage.triponaUser === "undefined" ? "{}" : localStorage.getItem("triponaUser"));
const access_token = (user && user.token && user.token !== "") ? `bearer ${user.token}` : null;

// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] = access_token ? access_token : "";

instance.interceptors.request.use(config => {
  if (!!config.filters || !!config.pagination) {
    config.url += `?${qs.stringify({ ...config.filters, ...config.pagination })}`;
  }
  return config;
});

instance.interceptors.response.use(res => {
  return res.data;
}, error => {
  if (error.response.status === 401 || error.response.status === 403) {
    localStorage.removeItem("triponaUser");
    // window.location.href = "/";
  }
  return Promise.reject(error.response.data);
});

export default instance;
