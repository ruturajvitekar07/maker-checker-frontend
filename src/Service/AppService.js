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
        // http://localhost:8080/file/download
        return axios.post(BASE_REST_API_URL + '/file/download', fileObject, header, responseType)
    }

    getFileList(workfloName, stageName, header) {
        // http://localhost:8080/file/list?workflowname=A1&stagename=upload
        return axios.get(BASE_REST_API_URL + '/file/list?workflowname=' + workfloName +'&stagename='+ stageName, header)
    }

    getFileAllList(header) {
        // http://localhost:8080/admin/get-all-filelist
        return axios.get(BASE_REST_API_URL + '/file/get-all-filelist', header)
    }

    getUserInfo(header) {
        // http://localhost:8080/file/get-info/ruturaj@gmail.com
        return axios.get(BASE_REST_API_URL + '/file/get-info', header)
    }

    fileApproveDecline(decision, header) {
        // http://localhost:8080/file/file-approve
        return axios.post(BASE_REST_API_URL + '/file/file-approve', decision, header)

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

    deleteWorkflowByVersion(workflow, header){
        // http://localhost:8080/admin/delete-workflow-by-version?version=v3
        return axios.delete(BASE_REST_API_URL + '/admin/delete-workflow-by-version?version=' + workflow, header)
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
        // http://localhost:8080/admin/addWorkflow
        return axios.post(BASE_REST_API_URL + '/admin/addWorkflow', workflow, header)
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
