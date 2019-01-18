import api from "./index";

export default {
  login: (credentials) => api.post("auth/token", credentials).then(res => res.data),
  signup: (params) => api.post("auth/signup", params).then(res => res.data),
  verify: (params) => api.post("auth/verify/email", params).then(res => res.data),
  forgetPassword: (data) => api.post("auth/reset", data).then(res => res.data),
  resetPassword: (data) => api.put("auth/reset", data).then(res => res.data),
  getMe: () => api.get("users/me").then(res => res.data),
  loginViaFacebook: (credentials) => api.post("auth/token_facebook", credentials).then(res => res.data),
  loginViaGoogle: (credentials) => api.post("auth/token_google", credentials).then(res => res.data),
  usersList: () => api.get("users").then(res => res.data),
  followUser: (id) => api.put(`users/following/${id}`).then(res => res.data),
  unFollowUser: (id) => api.delete(`users/following/${id}`).then(res => res.data)
};