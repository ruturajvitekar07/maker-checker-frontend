import axios from "axios";
const BASE_REST_API_URL = 'http://localhost:8080';

class AppService {

    signin(credential) {
        // http://localhost:8080/login
        return axios.post(BASE_REST_API_URL + '/login', credential)
    }

    signoff() {
        // http://localhost:8080/file/logout
        return axios.get(BASE_REST_API_URL + '/file/logout')
    }

}
export default new AppService();
