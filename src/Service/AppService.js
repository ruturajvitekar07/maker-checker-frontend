import axios from "axios";
const BASE_REST_API_URL = 'http://localhost:8080';

class AppService {

    signin(credential) {
        // http://localhost:8080/login
        return axios.post(BASE_REST_API_URL + '/login', credential)
    }

    uploadFile(file) {
        // http://localhost:8080/file/upload
        return axios.post(BASE_REST_API_URL + '/file/upload', file)
    }

    getFileList(stageNo, header) {
        // http://localhost:8080/file/list/stageNo
        return axios.get(BASE_REST_API_URL + '/file/list/' + stageNo, header)
    }

    getUserInfo(username, header) {
        // http://localhost:8080/file/get-info/ruturaj@gmail.com
        return axios.get(BASE_REST_API_URL + '/file/get-info/' + username, header)
    }

    fileApproveDecline(FileApproveRequest, header) {
        // http://localhost:8080/file/fileapprove
        return axios.get(BASE_REST_API_URL + '/file/fileapprove', FileApproveRequest, header)
    }

    getFileInfo(username) {
        // http://localhost:8080/file/get-info/ruturaj@gmail.com
        return axios.get(BASE_REST_API_URL + '/file/get-info/' + username)
    }

    creteUser(user, header) {
        // http://localhost:8080/admin/signup
        return axios.post(BASE_REST_API_URL + '/admin/signup', user, header)
    }

    deleteUserAccount(username, header) {
        // http://localhost:8080/admin/delete-account/nilesh@gmail.com
        return axios.delete(BASE_REST_API_URL + '/admin/delete-account/' + username, header)
    }

    getStageList(header) {
        // http://localhost:8080/admin/get-stage-data
        return axios.get(BASE_REST_API_URL + '/admin/get-stage-data', header)
    }

    deleteStageFile(header) {
        // http://localhost:8080/admin/delete-stage-data
        return axios.delete(BASE_REST_API_URL + '/admin/delete-stage-data', header)
    }

    createStage(stage, header) {
        // http://localhost:8080/admin/add-stage
        return axios.post(BASE_REST_API_URL + '/admin/add-stage', stage, header)
    }

    getUserList(header) {
        // http://localhost:8080/admin/get-user-list
        return axios.get(BASE_REST_API_URL + '/admin/get-user-list', header)
    }

}
export default new AppService();
