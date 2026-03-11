// services/levelService.js
import api from '@/axios';

export default {
  fetchLevels() {
    return api.get('/levels').then(res => res.data);
  }
};
