import api from "./index";

export default {
  login: (credentials) => api.post("auth/token", credentials),
  signup: (params) => api.post("auth/signup", params),
  verify: (params) => api.post("auth/verify/email", params),
  forgetPassword: (data) => api.post("auth/reset", data),
  resetPassword: (data) => api.put("auth/reset", data),
  getMe: () => api.get("users/me"),
  loginViaFacebook: (credentials) => api.post("auth/token_facebook", credentials),
  loginViaGoogle: (credentials) => api.post("auth/token_google", credentials),
  usersList: () => api.get("users"),
  followUser: (id) => api.put(`users/following/${id}`),
  unFollowUser: (id) => api.delete(`users/following/${id}`)
};