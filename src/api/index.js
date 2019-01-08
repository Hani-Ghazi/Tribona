import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const user = JSON.parse(localStorage.getItem("triponaUser"));
const access_token = (user && user.token && user.token !== "") ? `bearer ${user.token}` : null;

// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] = access_token ? access_token : "";

export default instance;
