import { useEffect, useState } from 'react'
import React from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AppService from '../Service/AppService'
import { Link } from 'react-router-dom'


export default function ViewStage() {

  const [workFlows, setWorkFlows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState("");
  const [workflows1, setWorkflows1] = useState([]);
  const localStorageToken = sessionStorage.getItem("access_token");
  const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

  const getStages = () => {
    AppService.getAllWorkflowsData(header)
      .then((res) => {
        console.log(res.data);
        setWorkFlows(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.warning("Error retrieving data of stages");
      });
  }

  const workflowList = () => {
    AppService.getWorkflowList(header)
      .then((response) => {
        console.log(response.data);
        setWorkflows1(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.warning("Error retrieving data of workflows");
      });
  }

  useEffect(() => {
    getStages()
    workflowList()
  }, [])

  return (
    <div className="container">
      <div className='mt-5'>
        <h2 style={{ textAlign: 'center' }} >Stages</h2>
      </div>
      <hr />
      <div className='col-4'>
        <select className="form-select" value={selectedWorkflow} onChange={(event) => setSelectedWorkflow(event.target.value)}>
          <option defaultValue={"Select a workflow"} disabled>Select a workflow</option>
          {workflows1.map((work) => (
            <option value={work} key={work}>
              {work}
            </option>
          ))}
        </select>
      </div>
      <div className='mt-4'>
        {selectedWorkflow && (
          <table className="table table-striped">
            <thead style={{ textAlign: 'center' }}>
              <tr>
                <th className="table-primary">Stage Name</th>
                <th className="table-primary">Stage No</th>
                <th className="table-primary">Role</th>
                <th className="table-primary">Previous Stage</th>
                <th className="table-primary">Next Stage</th>
                <th className="table-primary">Email</th>
                <th className="table-primary">Mobile No</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
              {workFlows.find((workflow) => workflow.version === selectedWorkflow).stages[0].stageList.map((stage) => (
                <tr key={stage.name}>
                  <td>{stage.name}</td>
                  <td>{stage.no}</td>
                  <td>{stage.role}</td>
                  <td>{stage.previousStage}</td>
                  <td>{stage.nextStage}</td>
                  <td>{stage.notification.email}</td>
                  <td>{stage.notification.mobileNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* <div className='my-lg-2' style={{ alignContent: 'center', alignItems: 'center' }}>
        <Link to="/workflow">
          <a className="btn btn-primary">Add Workflow</a>
        </Link>
        &nbsp;
        &nbsp;
        <Link to="/admin">
          <a className="btn btn-danger">Back</a>
        </Link>
      </div> */}
    </div>
  )
}