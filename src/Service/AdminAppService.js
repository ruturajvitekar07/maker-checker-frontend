import axios from "axios";
const BASE_REST_API_URL = 'http://localhost:8080';

class AdminAppService {

    creteUser(user, header) {
        // http://localhost:8080/admin/signup
        return axios.post(BASE_REST_API_URL + '/admin/signup', user, header)
    }

    getFileAllList(header) {
        // http://localhost:8080/admin/get-all-filelist
        return axios.get(BASE_REST_API_URL + '/file/get-all-filelist', header)
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

    deleteWorkflowByVersion(workflow, header) {
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
        // http://localhost:8080/admin/add-workflow
        return axios.post(BASE_REST_API_URL + '/admin/add-workflow', workflow, header)
    }

    createStageByWorkflowName(workFlowBody, header) {
        // http://localhost:8080/admin/add-workflow-stage
        return axios.post(BASE_REST_API_URL + '/admin/add-workflow-stage', workFlowBody, header)
    }

    getUserList(header) {
        // http://localhost:8080/admin/get-user-list
        return axios.get(BASE_REST_API_URL + '/admin/get-user-list', header)
    }

    setStatusInactive(statusRequest, header) {
        // http://localhost:8080/admin/change-status
        return axios.post(BASE_REST_API_URL + '/admin/change-status', statusRequest, header)
    }

    getLoginLogoutDetails(username, header) {
        // http://localhost:8080/admin/get-login-logout-info/abd@gmail.com
        return axios.get(BASE_REST_API_URL + '/admin/get-login-logout-info/' + username, header)
    }

    getLoginFailedDetails(username, header){
        // http://localhost:8080/admin/get-failed-login-info/abd@gmail.com
        return axios.get(BASE_REST_API_URL + '/admin/get-failed-login-info/' + username, header)
    }

    getTrackingData(username, header){
        // http://localhost:8080/admin/get-tracking-data
        return axios.post(BASE_REST_API_URL + '/admin/get-tracking-data', username, header)
    }
}
export default new AdminAppService();