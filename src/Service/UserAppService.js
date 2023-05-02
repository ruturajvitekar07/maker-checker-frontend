import axios from "axios";
const BASE_REST_API_URL = 'http://localhost:8080';

class UserAppService {

    signoff(header) {
        // http://localhost:8080/file/logout
        return axios.get(BASE_REST_API_URL + '/file/logout', header)
    }

    uploadFile(file) {
        // http://localhost:8080/file/upload
        return axios.post(BASE_REST_API_URL + '/file/upload', file)
    }

    uploadSpecificFile(fileEvent, header) {
        // http://localhost:8080/file/upload-specific-file
        return axios.post(BASE_REST_API_URL + '/file/upload-specific-file', fileEvent, header)
    }

    downloadFile(fileObject, header) {
        // http://localhost:8080/file/download
        return axios.post(BASE_REST_API_URL + '/file/download', fileObject, header)
    }

    getFileHistory(filename, header) {
        // http://localhost:8080/file/get-single-file-history?filename=navigate.xml
        return axios.get(BASE_REST_API_URL + '/file/get-single-file-history?filename=' + filename, header)

    }

    getFileList(workflowname, stagename, header) {
        // http://localhost:8080/file/list?workflowname=A1&stagename=upload
        return axios.get(BASE_REST_API_URL + '/file/list?workflowname=' + workflowname + '&stagename=' + stagename, header)
    }

    getPendingFilesList(header) {
        // http://localhost:8080/file/get-all-list
        return axios.get(BASE_REST_API_URL + '/file/get-all-list', header)
    }

    getUserInfo(header) {
        // http://localhost:8080/file/get-info
        return axios.get(BASE_REST_API_URL + '/file/get-info', header)
    }

    fileApproveDecline(decision, header) {
        // http://localhost:8080/file/file-approve
        return axios.post(BASE_REST_API_URL + '/file/file-approve', decision, header)
    }

    getUserWorkflowList(header) {
        // http://localhost:8080/file/get-user-workflow-list
        return axios.get(BASE_REST_API_URL + '/file/get-user-workflow-list', header)
    }

    setUsersActivities(trackingData, header) {
        // http://localhost:8080/file/track-activity
        return axios.post(BASE_REST_API_URL + '/file/track-activity', trackingData, header)
    }

}
export default new UserAppService();