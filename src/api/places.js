import api from './index';

export default {
  getPlaces: () => api.get('places').then(res => res.data)
};