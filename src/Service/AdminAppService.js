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

    // deleteStageFile(header) {
    //     // http://localhost:8080/admin/delete-stage-data
    //     return axios.delete(BASE_REST_API_URL + '/admin/delete-stage-data', header)
    // }

    createStage(stage, header) {
        // http://localhost:8080/admin/add-stage
        return axios.post(BASE_REST_API_URL + '/admin/add-stage', stage, header)
    }

    createWorkflow(workflow, header) {
        // http://localhost:8080/admin/add-workflow
        return axios.post(BASE_REST_API_URL + '/admin/add-workflow', workflow, header)
    }

    createStageByWorkflowName(workFlowName, workFlowBody, header) {
        // http://localhost:8080/admin/add-workflow-stage?workFlowName=v2
        return axios.post(BASE_REST_API_URL + '/admin/add-workflow-stage?version=' + workFlowName, workFlowBody, header)
    }

    getUserList(header) {
        // http://localhost:8080/admin/get-user-list
        return axios.get(BASE_REST_API_URL + '/admin/get-user-list', header)
    }
}
export default new AdminAppService();