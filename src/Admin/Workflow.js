import React from 'react'
import { useEffect, useState } from 'react'
import AppService from '../Service/AppService'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Workflow() {

    const [version, setVersion] = useState('')
    const [workflows, setWorkflows] = useState([])
    const navigate = useNavigate()
    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

    const workflowList = () => {
        AppService.getWorkflowList(header)
            .then((response) => {
                console.log(response.data);
                setWorkflows(response.data);
            })
            .catch((error) => {
                console.log(error);
                toast.warning("Error retrieving data of workflows");
            });
    }

    const addWorkflow = (event) => {
        const workflow = { version };
        event.preventDefault();
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "Do you want to add this workflow ?",
            showCancelButton: true,
            confirmButtonText: 'Yes, Add it!',
            cancelButtonText: 'No, cancel!',
        })
            .then((response) => {
                if (response.value) {
                    AppService.createWorkflow(workflow, header)
                        .then((response) => {
                            if (response.status === 200) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Added!',
                                    text: 'Workflow has been Added',
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate('/workflow');
                            } else {
                                toast.show("Unable to add workflow. Please try again later.");
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            toast.show("An error occurred. Please try again later.");
                        });
                }
            })
    }

    useEffect(() => {
        workflowList()
    }, [])

    return (
        <div className="container mt-3">
            <div className="row mb-4">
                <h2 style={{ textAlign: 'center' }}>Add Workflow</h2>
            </div>
            <div class="row">
                <div class="col">
                    <div className='col-10 offset-1'>
                        <table className="table table-striped">
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th className="table-primary">Workflow Name</th>
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: 'center' }}>
                                {
                                    workflows.map((work) =>
                                        <tr key={work}>
                                            <td>{work}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="col">
                    <div className='col-10 offset-1'>
                        <div className="card">
                            <div className='row-fluid'>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group mb-2 mt-2">
                                            <label className="form-label"> Workflow Name : </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Enter workflow name"
                                                name="workFlowName"
                                                className="form-control"
                                                value={version}
                                                onChange={(e) => setVersion(e.target.value)}
                                            >
                                            </input>
                                        </div>

                                        <div className='mt-3'>
                                            <button className="btn btn-success" onClick={(e) => addWorkflow(e)}>Submit</button>
                                            &nbsp;&nbsp;
                                            <Link to="/admin" className="btn btn-danger">Cancel</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
