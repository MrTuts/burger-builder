import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-8d7c6.firebaseio.com/',
});

export default instance;
