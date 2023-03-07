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
    const [showTable, setShowTable] = useState(false);
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
                                const newWorkflows = [...workflows, version];
                                setWorkflows(newWorkflows);
                                setVersion('');
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

    const deleteWorkflow = async (workflow) => {
        try {
            const response = await Swal.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
            });

            if (response.isConfirmed) {
                const deleteResponse = await AppService.deleteWorkflowByVersion(workflow, header);
                if (deleteResponse.status === 200) {
                    workflowList();
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: `${workflow}'s has been deleted.`,
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong! Failed to delete workflow',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        } catch (error) {
            console.error(error);
            toast.warning(error);
        }
    };

    useEffect(() => {
        workflowList()
    }, [])

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <h2 style={{ textAlign: 'center' }}>Add Workflow</h2>
            </div>
            <div class="row">
                <div class="col">
                    <div className='col-8 offset-2'>
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
            <div className='row mt-3'>
                <div className='col-6 offset-3 text-center'>
                    <button className="btn btn-primary mb-2" onClick={() => setShowTable(!showTable)}>
                        {showTable ? "Hide Workflows" : "View Workflows"}
                    </button>
                    {showTable && (
                        <table className="table table-striped">
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th className="table-primary">Workflow Name</th>
                                    <th className="table-primary">Action</th>
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: 'center' }}>
                                {workflows.map((work) => (
                                    <tr key={work}>
                                        <td>{work}</td>
                                        <td>
                                            <button className='btn btn-danger col-5' onClick={(e) => deleteWorkflow(work)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    )
}
