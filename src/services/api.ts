import Axios from "axios";

let urls = {
    test: `https://api.corbik.com/`,
    development: 'http://localhost:3333',
    production: 'https://api.corbik.com/'
}
const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;