import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import AppService from '../Service/AppService'
import Swal from 'sweetalert2';
import { TRUE, FALSE } from '../Constants/constants';

export default function AddStage() {
    const [no, setNo] = useState('')
    const [role, setRole] = useState('')
    // const [previousStage, setPreviousStage] = useState('')
    const [nextStage, setNextStage] = useState('')
    const [name, setName] = useState('')
    const [workflowName, setWorkflowName] = useState('')
    // const [workflow, setWorkflow] = useState([])
    const [email, setEmail] = useState(TRUE)
    const [mobileNo, setMobileNo] = useState(FALSE)
    // const [stageId, setStageId] = useState('')
    // const [notificationId, setNotificationId] = useState('')
    // const [notificationType, setNotificationType] = useState('')
    const [emailChecked, setEmailChecked] = useState(true);
    const [smsChecked, setSmsChecked] = useState(false);
    const [both, setBoth] = useState(false);
    const navigate = useNavigate()
    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };
    const [nextNo, setNextNo] = useState("1");

    const handleNoChange = (e) => {
        const currentNo = e.target.value;
        setNo(currentNo);
        setNextNo(Number(currentNo) + 1);
    };

    const handleEmailChange = () => {
        setEmailChecked(true);
        setSmsChecked(false);
        setBoth(false);
        setEmail(TRUE)
        setMobileNo(FALSE)
        console.log("email");
    };

    const handleSmsChange = () => {
        setEmailChecked(false);
        setSmsChecked(true);
        setBoth(false);
        setEmail(FALSE)
        setMobileNo(TRUE)
        console.log("sms");
    };

    const handleBoth = () => {
        setBoth(true);
        setEmailChecked(true);
        setSmsChecked(true);
        setEmail(TRUE)
        setMobileNo(TRUE)
        console.log("both");
    }

    const Handlechangeselect = (event) => {
        console.log("==workflow==", event.target.value);
        // setWorkFlowName(event.target.value)
    }

    const workflowList = () => {
        AppService.getWorkflowList(header)
            .then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                    console.log(response.data);
                    console.log(response.data[3]);
                    const sortedData = response.data.sort((a, b) =>
                        a.localeCompare(b)
                    );
                    console.log(sortedData[3]);
                    setWorkflowName(sortedData[3]);
                    // setWorkflowName(response.data[2]);
                } else {
                    //   throw new Error('Failed to get workflow list');
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
                    //   toast.error('Unable to retrieve workflow list');
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

        const stage = { workflowName, no, role, nextStage, name, notificationDto };

        const stage1 = { no, role, nextStage, name, notificationDto }
        const valuesFilled = Object.values(stage1).every(value => value !== undefined && value !== null && value !== '');

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
            return; // stop execution
        }

        try {
            const response = await AppService.createStageByWorkflowName(stage, header);
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Added!',
                    text: response.data,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500
                });
                setNo('')
                setRole('')
                setNextStage('')
                setName('')
                setEmail('')
                setMobileNo('')
            } else if (response.status === 400) {
                // throw new Error('Failed to add stage');
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to add stage' & response.message,
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
        <div className="container mt-3">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3 mt-4">
                    <div className="card-body">
                        <h2 class="card-title mb-4" style={{ textAlign: 'center' }}>Add Stage</h2>
                        {/* <form> */}
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
                                onChange={handleNoChange}
                            >
                            </input>
                            <div>
                            <span style={{ color: 'red', marginLeft: '20px', fontSize: '13px'}}>Hint : Next stage number is {nextNo}</span>
                            </div>
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
                            <span style={{ color: 'red', marginLeft: '20px', fontSize: '13px' }}>If you are entering the last stage, you can skip the next stage</span>
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

                        {/* <div className="form-group mb-2 mt-2">
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
                                    type="text"
                                    required
                                    placeholder="Enter mobile number"
                                    name="mobileNo"
                                    className="form-control"
                                    pattern="[0-9]{10}"
                                    value={mobileNo}
                                    onChange={(e) => setMobileNo(e.target.value)}
                                >
                                </input>
                            </div> */}

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
                            <button className="btn btn-success" onClick={() => addStage()}>Submit</button>
                            &nbsp;&nbsp;

                            <Link to="/admin" className="btn btn-danger">Cancel</Link>
                        </div>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </div >
    )
}