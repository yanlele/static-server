import axios from 'axios';
import config from '../../config';

if(!config.mock) {
    axios.defaults.baseURL = `http://127.0.0.1:${config.port}`;
}

window.axios = axios;
