import React from 'react'
import { useEffect, useState } from 'react'
import AdminAppService from '../Service/AdminAppService'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from '../Navbars/AdminNavbar';

export default function Workflow() {

    const [version, setVersion] = useState('')
    const [workflows, setWorkflows] = useState([])
    const [showTable, setShowTable] = useState(false);
    const username = sessionStorage.getItem("username");
    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

    const workflowList = () => {
        AdminAppService.getWorkflowList(header)
            .then((response) => {
                if (response.status === 200) {
                    setWorkflows(response.data);
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Error',
                        toast: true,
                        position: 'top-end',
                        text: 'Failed to get workflow list, Please refresh',
                        timer: 3000
                    });
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    Swal.fire({
                        icon: 'Error',
                        title: 'Error',
                        toast: true,
                        position: 'top-end',
                        text: 'Unable to retrieve workflow list',
                        timer: 3000
                    });
                }
            });
    };

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
                    AdminAppService.createWorkflow(workflow, header)
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
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error!',
                                    text: 'Unable to add workflow. Please try again later.',
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                            }
                        })
                        .catch((error) => {
                            if (error.response && error.response.status === 400) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error!',
                                    text: 'Bad request. Please check your input.',
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                            } else {
                                toast.show("An error occurred. Please try again later.");
                            }

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
                const deleteResponse = await AdminAppService.deleteWorkflowByVersion(workflow, header);
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
            if (error.response && error.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops.. Unable to delete this workflow',
                    text: error.response.data.message,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    footer: 'System is using this workflow',
                    timer: 2500,
                });
            } else {
                toast.warning(error);
            }
        }
    };

    useEffect(() => {
        workflowList()
    }, [])

    return (
        <div>
            <AdminNavbar username={username} />
            <div className="container mt-5">
                <div class="row">
                    <div class="col">
                        <div className='col-8 offset-2'>
                            <div className="card">
                                <h2 className='card-title mt-3' style={{ textAlign: 'center' }}>Add Workflow</h2>
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
                                    {workflows.length > 0 ? (
                                        workflows.map((work) => (
                                            <tr key={work}>
                                                <td>{work}</td>
                                                <td>
                                                    <button className='btn btn-danger col-5' onClick={(e) => deleteWorkflow(work)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2">No workflows present. Please add one.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
