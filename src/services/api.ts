import Axios from "axios";

let urls = {
    test: `https://api.corbik.com/`,
    development: 'http://localhost:3333',
    production: 'https://api.corbik.com/'
}
const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Content-Type': 'application/json'
		},
    withCredentials: true,
});

export default api;
