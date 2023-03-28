import axios from "axios";
const BASE_REST_API_URL = 'http://localhost:8080';

class AppService {

    signin(credential) {
        // http://localhost:8080/login
        return axios.post(BASE_REST_API_URL + '/login', credential)
    }

//     uploadFile(file, header) {
//         // http://localhost:8080/file/upload
//         return axios.post(BASE_REST_API_URL + '/file/upload', file, header)
//     }

    // uploadSpecificFile(fileEvent, header) {
    //     // http://localhost:8080/file/upload-specific-file
    //     return axios.post(BASE_REST_API_URL + '/file/upload-specific-file', fileEvent, header)
    // }

//     downloadFile(fileObject, header) {
//         // http://localhost:8080/file/download
//         return axios.post(BASE_REST_API_URL + '/file/download', fileObject, header)
//     }

//     getFileHistory(filename, header) {
//         // http://localhost:8080/file/get-single-file-history?filename=navigate.xml
//         return axios.get(BASE_REST_API_URL + '/file/get-single-file-history?filename=' + filename, header)

//     }

//     getFileList(workflowname, stagename, header) {
//         // http://localhost:8080/file/list?workflowname=A1&stagename=upload
//         return axios.get(BASE_REST_API_URL + '/file/list?workflowname=' + workflowname + '&stagename=' + stagename, header)
//     }

//     getPendingFilesList(header){
//         // http://localhost:8080/file/get-all-list
//         return axios.get(BASE_REST_API_URL + '/file/get-all-list', header)
//     }

//     getUserInfo(header) {
//         // http://localhost:8080/file/get-info
//         return axios.get(BASE_REST_API_URL + '/file/get-info', header)
//     }

//     fileApproveDecline(decision, header) {
//         // http://localhost:8080/file/file-approve
//         return axios.post(BASE_REST_API_URL + '/file/file-approve', decision, header)
//     }

//     getUserWorkflowList(header) {
//         // http://localhost:8080/file/get-user-workflow-list
//         return axios.get(BASE_REST_API_URL + '/file/get-user-workflow-list', header)
//     }

//     creteUser(user, header) {
//         // http://localhost:8080/admin/signup
//         return axios.post(BASE_REST_API_URL + '/admin/signup', user, header)
//     }

//     getFileAllList(header) {
//         // http://localhost:8080/admin/get-all-filelist
//         return axios.get(BASE_REST_API_URL + '/file/get-all-filelist', header)
//     }

//     getHistory(header) {
//         // http://localhost:8080/admin/get-all-filelist
//         return axios.get(BASE_REST_API_URL + '/admin/get-all-filelist', header)
//     }

//     getAllHistory(header) {
//         // http://localhost:8080/admin/get-eachfile-history
//         return axios.get(BASE_REST_API_URL + '/admin/get-eachfile-history', header)
//     }

//     deleteUserAccount(username, header) {
//         // http://localhost:8080/admin/delete-account/nilesh@gmail.com
//         return axios.delete(BASE_REST_API_URL + '/admin/delete-account/' + username, header)
//     }

//     deleteWorkflowByVersion(workflow, header) {
//         // http://localhost:8080/admin/delete-workflow-by-version?version=v3
//         return axios.delete(BASE_REST_API_URL + '/admin/delete-workflow-by-version?version=' + workflow, header)
//     }

//     getStageList(header) {
//         // http://localhost:8080/admin/get-stage-data
//         return axios.get(BASE_REST_API_URL + '/admin/get-stage-data', header)
//     }

//     getAllWorkflowsData(header) {
//         // http://localhost:8080/admin/get-all-workflows
//         return axios.get(BASE_REST_API_URL + '/admin/get-all-workflows', header)
//     }

//     getWorkflowList(header) {
//         // http://localhost:8080/admin/get-workflow-list
//         return axios.get(BASE_REST_API_URL + '/admin/get-workflow-list', header)
//     }

//     deleteStageFile(header) {
//         // http://localhost:8080/admin/delete-stage-data
//         return axios.delete(BASE_REST_API_URL + '/admin/delete-stage-data', header)
//     }

//     createStage(stage, header) {
//         // http://localhost:8080/admin/add-stage
//         return axios.post(BASE_REST_API_URL + '/admin/add-stage', stage, header)
//     }

//     createWorkflow(workflow, header) {
//         // http://localhost:8080/admin/add-workflow
//         return axios.post(BASE_REST_API_URL + '/admin/add-workflow', workflow, header)
//     }

//     createStageByWorkflowName(workFlowBody, header) {
//         // http://localhost:8080/admin/add-workflow-stage
//         return axios.post(BASE_REST_API_URL + '/admin/add-workflow-stage', workFlowBody, header)
//     }

//     getUserList(header) {
//         // http://localhost:8080/admin/get-user-list
//         return axios.get(BASE_REST_API_URL + '/admin/get-user-list', header)
//     }

}
export default new AppService();
