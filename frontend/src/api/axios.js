import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://localhost:5500/attendance'
})

export default instance;