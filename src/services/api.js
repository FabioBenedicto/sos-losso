import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mylocker-api-production.up.railway.app/',
});

export default api;
