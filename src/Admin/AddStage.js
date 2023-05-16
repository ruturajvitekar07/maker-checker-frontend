import { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useTracking } from 'react-tracking';
import Swal from 'sweetalert2';
import { FALSE, TRUE } from '../Constants/constants';
import useAuth from '../LogIn/auth';
import AdminNavbar from '../Navbars/AdminNavbar';
import AdminAppService from '../Service/AdminAppService';
import IdleTimeout from '../Utility/IdleTimeout';

export default function AddStage() {

    const { trackEvent } = useTracking();

    const [no, setNo] = useState('')
    const [role, setRole] = useState('')
    const [nextStage, setNextStage] = useState('')
    const [name, setName] = useState('')
    const [workflowName, setWorkflowName] = useState('')
    const [email, setEmail] = useState(TRUE)
    const [mobileNo, setMobileNo] = useState(FALSE)
    const [emailChecked, setEmailChecked] = useState(true);
    const [smsChecked, setSmsChecked] = useState(false);
    const [both, setBoth] = useState(false);
    const navigate = useNavigate()
    const { isSwalOpen, setIsSwalOpen, isLoggedIn, setIsLoggedIn } = useAuth(); 
    const username = sessionStorage.getItem("username");
    const access_token = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${access_token}` } };
    const { work } = useParams();

    const handleEmailChange = () => {
        setEmailChecked(true);
        setSmsChecked(false);
        setBoth(false);
        console.log(TRUE);
        setEmail(TRUE)
        setMobileNo(FALSE)
    };

    const handleSmsChange = () => {
        setEmailChecked(false);
        setSmsChecked(true);
        setBoth(false);
        console.log(TRUE);
        setEmail(FALSE)
        setMobileNo(TRUE)
    };

    const handleBoth = () => {
        setBoth(true);
        setEmailChecked(true);
        setSmsChecked(true);
        console.log(FALSE);
        setEmail(TRUE)
        setMobileNo(TRUE)
    }


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
                    const sortedData = response.data.sort((a, b) =>
                        a.localeCompare(b)
                    );
                    console.log(work);
                    setWorkflowName(work);
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
                console.log(error);
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

    const addStage = async () => {
        const notificationDto = { email, mobileNo }
        if (!notificationDto.email && !notificationDto.mobileNo) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Notification Info',
                text: 'Please provide an email and/or mobile number for notifications.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        const validStage = { no, role, nextStage, name, notificationDto }
        const valuesFilled = Object.values(validStage).every(value => value !== undefined && value !== null && value !== '');

        if (!valuesFilled) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Stage Info',
                text: 'Please fill all the stage fields before adding.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        const stage = { workflowName, no, role, nextStage, name, notificationDto };

        try {
            console.log(header);
            const response = await AdminAppService.createStageByWorkflowName(stage, header);
            console.log(response);
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Added!',
                    text: response.data,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2500
                });
                setNo('')
                setRole('')
                setNextStage('')
                setName('')
                setEmail('')
                setMobileNo('')
            } else if (response.status === 400) {
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to add stage',
                    icon: 'error',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message, { autoClose: 1000 })
        }
    }

    useEffect(() => {
        workflowList()
    }, [])

    return (
        <div>
            <IdleTimeout/>
            <AdminNavbar username={username} onLogout={handleLogout} />
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3 mt-4">
                    <div className="card-body mb-3">
                        <h2 className="card-title mb-4" style={{ textAlign: 'center' }}>Add Stage</h2>
                        <hr />
                        <form onSubmit={addStage}>
                            <div className="form-group mb-2 mt-2">
                                <label className="form-label"> Stage No : </label>
                                <input
                                    type="number"
                                    required
                                    placeholder="Enter stage number"
                                    name="no"
                                    className="form-control"
                                    value={no}
                                    onChange={(e) => setNo(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label"> Stage Name : </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter stage name"
                                    name="name"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label"> Role : </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter role"
                                    name="role"
                                    className="form-control"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label"> Next stage name : </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter next stage number"
                                    name="nextStage"
                                    className="form-control"
                                    value={nextStage}
                                    onChange={(e) => setNextStage(e.target.value)}
                                    title={"If you are entering the last stage, you can skip the next stage"}
                                >
                                </input>
                                <span style={{ color: 'red', marginLeft: '10px', fontSize: '13px' }}>If you are entering the last stage, you can skip the next stage</span>
                            </div>

                            <div>
                                <label className="form-outline mb-2 mt-3 col-4">Notification Type : </label>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="checkbox" value="email" checked={emailChecked} onChange={handleEmailChange} />
                                        Email
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="checkbox" value="sms" checked={smsChecked} onChange={handleSmsChange} />
                                        SMS
                                    </label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="checkbox" value="both" checked={both} onChange={handleBoth} />
                                        Both
                                    </label>
                                </div>
                            </div>

                            <div className='mt-3'>
                                <button type="submit" className="btn btn-success"
                                    onClick={() =>
                                        trackEvent({
                                            component: 'History',
                                            event: 'Add stage form submit button clicked',
                                            user: username,
                                            time: new Date().toLocaleString(),
                                            status: 'Success'
                                        })}>
                                    Submit
                                </button>
                                &nbsp;&nbsp;
                                <Link to="/admin" className="btn btn-danger"
                                    onClick={() =>
                                        trackEvent({
                                            component: 'AddStage',
                                            event: 'Add stage form cancel button clicked',
                                            user: username,
                                            time: new Date().toLocaleString(),
                                            status: 'Success'
                                        })}>
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}