import axios from "axios";
import qs from "query-string";


const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const user = JSON.parse(localStorage.getItem("triponaUser"));
const access_token = (user && user.token && user.token !== "") ? `bearer ${user.token}` : null;

// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] = access_token ? access_token : "";

instance.interceptors.request.use(config => {
  if (!!config.filters) {
    config.url += `?${qs.stringify(config.filters)}`;
  }
  return config;
});

instance.interceptors.response.use(res => {
  return res.data;
}, error => {
  if (error.response.status === 401 || error.response.status === 403) {
    window.location.href = "/access-denied";
  }

});

export default instance;
