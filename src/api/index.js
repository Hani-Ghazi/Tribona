import axios from "axios";
import qs from "query-string";
import { clearObject } from "../utils";
import {toast} from "react-toastify"

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
  if (error && error.response && error.response.status){
    if(error.response.status === 401 || error.response.status === 403) {
      toast.error("Sorry your session has been expired please login again", {
        hideProgressBar: true
      });
      localStorage.removeItem("triponaUser");
      window.location.href = "/";
    }
    else if (error.response.status === 400) {
      toast.error("Please re-check the inputted values, something went wrong!", {
        hideProgressBar: true
      });
    }
    else if(error.response.status === 405) {
      toast.error("Permission denied, Please contact us if you think something wrong happened here", {
        hideProgressBar: true
      });
    }
    else if (error.response.status === 409) {
      toast.error("Email already exist", {
        hideProgressBar: true
      });
    }
  }

  return error && error.response && error.response.data ? Promise.reject(error.response.data) : Promise.reject(error);
});

export default instance;
