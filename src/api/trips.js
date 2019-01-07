import api from './index';

export default {
  getTrips: () => api.get('trips').then(res => res.data)
};