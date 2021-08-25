import axios from 'axios';

let webService = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    //baseURL: 'http://127.0.0.1:8000/api/',
});

export default webService;
