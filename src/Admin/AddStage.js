import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import AppService from '../Service/AppService'
import Swal from 'sweetalert2';

export default function AddStage() {
    const [no, setNo] = useState('')
    const [role, setRole] = useState('')
    const [previousStage, setPreviousStage] = useState('')
    const [nextStage, setNextStage] = useState('')
    const [dirName, setDirName] = useState('')
    const [workFlowName, setWorkFlowName] = useState('')
    const [workflow, setWorkflow] = useState([])
    const [email, setEmail] = useState('')
    const [mobileNo, setMobileNo] = useState()
    const [stageId, setStageId] = useState('')
    const [notificationId, setNotificationId] = useState('')
    const [notificationType, setNotificationType] = useState('')
    const [emailChecked, setEmailChecked] = useState(true);
    const [smsChecked, setSmsChecked] = useState(false);
    const [both, setBoth] = useState(false);
    const navigate = useNavigate()
    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

    const handleEmailChange = () => {
        setEmailChecked(true);
        setSmsChecked(false);
        setBoth(false);
        setNotificationType("email");
        console.log("email");
        console.log(emailChecked);
        console.log(smsChecked);
    };

    const handleSmsChange = () => {
        setEmailChecked(false);
        setSmsChecked(true);
        setBoth(false);
        setNotificationType("sms");
        console.log("sms");
        console.log(emailChecked);
        console.log(smsChecked);
    };

    const handleBoth = () => {
        setBoth(true);
        setEmailChecked(true);
        setSmsChecked(true);
        setNotificationType("both");
        console.log("both");
        console.log(emailChecked);
        console.log(smsChecked);
    }

    const Handlechangeselect = (event) => {
        console.log("==workflow==", event.target.value);
        setWorkFlowName(event.target.value)
    }

    const workflowList = () => {
        AppService.getWorkflowList(header)
            .then((response) => {
                console.log(response.data);
                setWorkflow(response.data);
            })
    }

    const addStage = () => {
        const notification = { notificationId, email, mobileNo }
        const stage = { stageId, no, role, previousStage, nextStage, dirName, notification };
        console.log("--------", workFlowName);
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "Do you want to Add this stage ?",
            showCancelButton: true,
            confirmButtonText: 'Yes, Add it!',
            cancelButtonText: 'No, cancel!',
        })
            .then((response) => {
                if (response.value) {
                    const apiresponse = AppService.createStageByWorkflowName("A1", stage, header);
                    console.log(apiresponse);
                    if (apiresponse.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Added!',
                            text: 'Stage data has been Added.',
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/stagelist')
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed',
                            icon: 'error',
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                }
            }).catch((error) => {
                toast.error("Failed", { autoClose: 1000 })
            })
    }

    useEffect(() => {
        workflowList()
    }, [])

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3 mt-4">
                    <div className="card-body">
                        <h2 class="card-title mb-4" style={{ textAlign: 'center' }}>Add Stage</h2>
                        <form>
                            {/* <label className="form-label" htmlFor='dropdown1'> Choose a workflow : </label>
                        <select className="form-select" value={workFlowName} onChange={Handlechangeselect}>
                            <option disabled>Select workflow</option>
                            {workflow.map((opt) => (
                                <option value={opt}>{opt}</option>
                            ))}
                        </select> */}

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
                                    name="dirName"
                                    className="form-control"
                                    value={dirName}
                                    onChange={(e) => setDirName(e.target.value)}
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

                            {/* <div className="form-group mb-2">
                            <label className="form-label"> Previous stage name : </label>
                            <input
                                type="number"
                                required
                                placeholder="Enter previous stage number"
                                name="previousStage"
                                className="form-control"
                                value={previousStage}
                                onChange={(e) => setPreviousStage(e.target.value)}
                            >
                            </input>
                        </div> */}

                            <div className="form-group mb-2">
                                <label className="form-label"> Next stage name : </label>
                                <input
                                    type="number"
                                    required
                                    placeholder="Enter next stage number"
                                    name="nextStage"
                                    className="form-control"
                                    value={nextStage}
                                    onChange={(e) => setNextStage(e.target.value)}
                                >
                                </input>
                            </div>

                            {/* <div className="form-group mb-2 mt-2">
                            <label className="form-label"> Notification Id : </label>
                            <input
                                type="number"
                                required
                                placeholder="Enter workflow id"
                                name="workFlowName"
                                className="form-control"
                                value={notificationId}
                                onChange={(e) => setNotificationId(e.target.value)}
                            >
                            </input>
                        </div> */}

                            <div className="form-group mb-2 mt-2">
                                <label className="form-label"> Email : </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter email"
                                    name="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className="form-group mb-2 mt-2">
                                <label className="form-label"> Mobile No : </label>
                                <input
                                    type="number"
                                    required
                                    placeholder="Enter mobile number"
                                    name="mobileNo"
                                    className="form-control"
                                    value={mobileNo}
                                    onChange={(e) => setMobileNo(e.target.value)}
                                >
                                </input>
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
                                <button className="btn btn-success" onClick={addStage}>Submit</button>
                                &nbsp;&nbsp;

                                <Link to="/admin" className="btn btn-danger">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}