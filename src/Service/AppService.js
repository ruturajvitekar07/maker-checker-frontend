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

    downloadFile(fileObject, header, responseType) {
        // http://localhost:8080/file/download-file
        return axios.post(BASE_REST_API_URL + '/file/download-file', fileObject, header, responseType)
    }

    getFileList(stageNo, header) {
        // http://localhost:8080/file/list/stageNo
        return axios.get(BASE_REST_API_URL + '/file/list/' + stageNo, header)
    }

    getFileAllList(header) {
        // http://localhost:8080/admin/get-all-filelist
        return axios.get(BASE_REST_API_URL + '/file/get-all-filelist', header)
    }

    getUserInfo(username, header) {
        // http://localhost:8080/file/get-info/ruturaj@gmail.com
        return axios.get(BASE_REST_API_URL + '/file/get-info/' + username, header)
    }

    fileApproveDecline(decision, header) {
        // http://localhost:8080/file/fileapprove
        return axios.post(BASE_REST_API_URL + '/file/fileapprove', decision, header)

        // http://localhost:8080/file/fileapprove?role=team lead&filename=elk.jpg&status=approved
        // return axios.get(BASE_REST_API_URL + '/file/fileapprove?role=' + role + '&filename=' + filename + '&status=' + status, header)
    }

    getFileInfo(username) {
        // http://localhost:8080/file/get-info/ruturaj@gmail.com
        return axios.get(BASE_REST_API_URL + '/file/get-info/' + username)
    }

    getUserWorkflowList(header) {
        // http://localhost:8080/file/get-user-workflow-list
        return axios.get(BASE_REST_API_URL + '/file/get-user-workflow-list', header)
    }

    creteUser(user, header) {
        // http://localhost:8080/admin/signup
        return axios.post(BASE_REST_API_URL + '/admin/signup', user, header)
    }

    getHistory(header) {
        // http://localhost:8080/admin/get-all-filelist
        return axios.get(BASE_REST_API_URL + '/admin/get-all-filelist', header)
    }

    getAllHistory(header) {
        // http://localhost:8080/admin/get-eachfile-history
        return axios.get(BASE_REST_API_URL + '/admin/get-eachfile-history', header)
    }

    deleteUserAccount(username, header) {
        // http://localhost:8080/admin/delete-account/nilesh@gmail.com
        return axios.delete(BASE_REST_API_URL + '/admin/delete-account/' + username, header)
    }

    getStageList(header) {
        // http://localhost:8080/admin/get-stage-data
        return axios.get(BASE_REST_API_URL + '/admin/get-stage-data', header)
    }

    getAllWorkflowsData(header) {
        // http://localhost:8080/admin/get-all-workflows
        return axios.get(BASE_REST_API_URL + '/admin/get-all-workflows', header)
    }

    getWorkflowList(header) {
        // http://localhost:8080/admin/get-workflow-list
        return axios.get(BASE_REST_API_URL + '/admin/get-workflow-list', header)
    }

    deleteStageFile(header) {
        // http://localhost:8080/admin/delete-stage-data
        return axios.delete(BASE_REST_API_URL + '/admin/delete-stage-data', header)
    }

    createStage(stage, header) {
        // http://localhost:8080/admin/add-stage
        return axios.post(BASE_REST_API_URL + '/admin/add-stage', stage, header)
    }

    createWorkflow(workflow, header) {
        // http://localhost:8080/admin/addWorkFlow
        return axios.post(BASE_REST_API_URL + '/admin/addWorkFlow', workflow, header)
    }

    createStageByWorkflowName(workFlowName, workFlowBody, header) {
        // http://localhost:8080/admin/addStage-To-WorkFlow?workFlowName=v2
        return axios.post(BASE_REST_API_URL + '/admin/addStage-To-WorkFlow?version=' + workFlowName, workFlowBody, header)
    }

    getUserList(header) {
        // http://localhost:8080/admin/get-user-list
        return axios.get(BASE_REST_API_URL + '/admin/get-user-list', header)
    }

}
export default new AppService();
