import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Match with your backend
});

export default instance;
