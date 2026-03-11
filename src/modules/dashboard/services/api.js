import axios from 'axios';

const api = axios.create({

  baseURL: 'https://682fa4cdf504aa3c70f4b779.mockapi.io/',
  headers: {
    'Content-Type': 'application/json'
  }

});

export default api;