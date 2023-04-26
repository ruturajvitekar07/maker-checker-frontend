import { useEffect, useState } from "react";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import AdminAppService from "../Service/AdminAppService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AdminNavbar from "../Navbars/AdminNavbar";
import { useTracking } from 'react-tracking';


export default function ViewStage() {

  const { trackEvent } = useTracking();

  const [workFlows, setWorkFlows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState("");
  const [workflows1, setWorkflows1] = useState([]);
  const username = sessionStorage.getItem("username");
  const localStorageToken = sessionStorage.getItem("access_token");
  const header = { headers: { Authorization: `Bearer ${localStorageToken}` } };

  const getStages = () => {
    AdminAppService.getAllWorkflowsData(header)
      .then((res) => {
        if (res.status === 200) {
          setWorkFlows(res.data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Error",
            toast: true,
            position: "top-end",
            text: "Failed to get workflows data",
            timer: 3000,
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Error",
            toast: true,
            position: "top-end",
            text: "Unable to retrieve stages data",
            timer: 3000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            toast: true,
            position: "top-end",
            text: "Error retrieving data of stages",
            timer: 3000,
          });
        }
      });
  };

  const workflowList = () => {
    AdminAppService.getWorkflowList(header)
      .then((response) => {
        if (response.status === 200) {
          const sortedData = response.data.sort((a, b) => a.localeCompare(b));
          setWorkflows1(sortedData);
        } else {
          Swal.fire({
            icon: "warning",
            title: "error",
            toast: true,
            position: "top-end",
            text: "Failed to get workflow list, Please refresh",
            timer: 3000,
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          Swal.fire({
            icon: "Error",
            title: "error",
            toast: true,
            position: "top-end",
            text: "Unable to retrieve workflow list",
            timer: 3000,
          });
        }
      });
  };

  useEffect(() => {
    workflowList();
    getStages();
  }, []);

  useEffect(() => {
    if (workflows1.length > 0) {
      setSelectedWorkflow(workflows1[0]);
    }
  }, [workflows1]);

  return (
    <div>
      <AdminNavbar username={username} />
      <div className="col-10 offset-1">
        <div className="mt-4">
          <h2 className="mt-3" style={{ textAlign: "center" }}>
            Stages
          </h2>
        </div>
        <div className="col-4">
          <label htmlFor="drop" className="mb-2">
            Choose Workflow :{" "}
          </label>
          <select
            className="form-select"
            name="drop"
            value={selectedWorkflow}
            onChange={(event) => {
              setSelectedWorkflow(event.target.value);
            }}
            onClick={() =>
              trackEvent({
                component: 'ViewStage',
                event: `Stage : ${selectedWorkflow} is selected from dropdown`,
                user: username,
                time: new Date().toLocaleString(),
                status: 'Success'
              })}
          >
            <option defaultValue={"Select a workflow"} disabled>
              Select a workflow
            </option>
            {workflows1.map((work) => (
              <option value={work} key={work}>
                {work}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          {selectedWorkflow && (
            <table className="table table-striped">
              <thead style={{ textAlign: "center" }}>
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
              <tbody style={{ textAlign: "center" }}>
                {workFlows.find(
                  (workflow) => workflow.version === selectedWorkflow
                )?.stages?.[0]?.stage?.length > 0 ? (
                  workFlows
                    .find((workflow) => workflow.version === selectedWorkflow)
                    .stages[0].stage.map((stage1) => (
                      <tr key={stage1.name}>
                        <td>{stage1.name}</td>
                        <td>{stage1.no}</td>
                        <td>{stage1.role}</td>
                        <td>{stage1.previousStage}</td>
                        <td>{stage1.nextStage}</td>
                        <td>{stage1.notification.email}</td>
                        <td>{stage1.notification.mobileNo}</td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="7">
                      Data not present, Please insert stages in workflow :{" "}
                      {selectedWorkflow}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
