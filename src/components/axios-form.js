import axios from 'axios';

const instance = axios.create({
    baseURL: '//104.155.161.90:8000/'
});

export default instance;