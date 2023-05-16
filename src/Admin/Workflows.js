import React, { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTracking } from 'react-tracking';
import Swal from 'sweetalert2';
import useAuth from '../LogIn/auth';
import AdminNavbar from '../Navbars/AdminNavbar';
import AdminAppService from '../Service/AdminAppService';
import IdleTimeout from '../Utility/IdleTimeout';

export default function Workflows() {

    const { trackEvent } = useTracking();

    const [workflows, setWorkflows] = useState([])
    const navigate = useNavigate()
    const username = sessionStorage.getItem("username");
    const access_token = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${access_token}` } };
    const { isSwalOpen, setIsSwalOpen, isLoggedIn, setIsLoggedIn } = useAuth();

    const { reset } = useIdleTimer({
        timeout: 1000 * 60 * 10,
    });

    const handleLogout = () => {
        trackEvent({
            component: "Admin",
            event: "Clicked on logout button",
            user: username,
            time: new Date().toLocaleString(),
            status: "Success"
        });
        setIsLoggedIn(false);
        console.log('User has been logged out');
        reset();
        sessionStorage.clear();
        localStorage.clear();
        navigate('/login')
    };

    const workflowList = () => {
        AdminAppService.getWorkflowList(header)
            .then((response) => {
                if (response.status === 200) {
                    const sorted = response.data.sort();
                    setWorkflows(sorted);
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
                    console.log(deleteResponse.data);
                    console.log(deleteResponse.message);
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
            console.log(error.response.data.message);
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

    const handleAddStage = (workflowName) => {
        navigate(`/addstage/${workflowName}`);
    };

    useEffect(() => {
        workflowList()
    }, []);

    return (
        <div>
            <IdleTimeout/>
            <AdminNavbar username={username} onLogout={handleLogout} />
            <div className='col-10 offset-1'>
                <div className='mt-4 mb-4'>
                    <h2 className='mt-3' style={{ textAlign: 'center' }}>Workflows</h2>
                </div>
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
                                        <button className='btn btn-success col-2' onClick={(e) => handleAddStage(work)}>Add Stage</button> &emsp;
                                        <button className='btn btn-danger col-2' onClick={(e) => deleteWorkflow(work)}>Delete</button>
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
            </div>
        </div>
    )
}
