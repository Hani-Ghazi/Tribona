// import {} from '../types';
import api from '../api/user';


export const followUser = (id) => () => api.followUser(id);
export const unFollowUser = (id) => () => api.unFollowUser(id);
export const getUserById = (id) => () => api.userById(id);