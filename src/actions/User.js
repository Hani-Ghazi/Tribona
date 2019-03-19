import {
  USER_UPDATE_PROFILE
} from "../types";
import api from "../api/user";


export const followUser = (id) => () => api.followUser(id);
export const unFollowUser = (id) => () => api.unFollowUser(id);
export const getUserById = (id) => () => api.userById(id);
export const updateUser = (user) => (dispatch) =>
  api.updateUser(user).then(user => dispatch({ type: USER_UPDATE_PROFILE, payload: user }));