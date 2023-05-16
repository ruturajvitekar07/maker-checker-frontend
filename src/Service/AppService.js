import axios from "axios";
const BASE_REST_API_URL = 'http://localhost:8080';

class AppService {

    signin(credential) {
        // http://localhost:8080/login
        return axios.post(BASE_REST_API_URL + '/login', credential);
    }

    refreshToken(refresh_token) {
        // http://localhost:8080/token/refresh_token
        return axios.post(BASE_REST_API_URL + '/token/' + refresh_token);
    }

}
export default new AppService();
