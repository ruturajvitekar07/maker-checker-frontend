import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import AppService from '../Service/AppService'
import axios from "axios";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import UserNavbar from '../Navbars/UserNavbar';
import Swal from 'sweetalert2';

export default function User() {

    const navigate = useNavigate()
    const [fileDatas, setFileDatas] = useState([])
    const [workflow, setWorkflow] = useState([])
    const [workflowData, setWorkflowData] = useState()
    const [role, setRole] = useState('')
    // const [workflowName, setWorkflowName] = useState('A1')
    const [file, setFile] = useState(null);
    const username = sessionStorage.getItem("username");
    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

    const userInfo = () => {
        AppService.getUserInfo(username, header)
            .then((response) => {
                console.log(response.data);
                setWorkflowData(response.data);
                setRole(response.data.role)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Get the workflow with version A1
    const version = workflowData.workflows.find(workflow => workflow.version === workflow);
    // Get the stage with role developer
    const stageForDeveloper = version.stages[0].stage.find(stage => stage.role === role);
    // Get the name of the stage
    const stageName = stageForDeveloper.name;
    console.log(stageName);

    const currentStatus = [
        { status: "Approved by developer" },
        { status: "Approved by associate" },
        { status: "Approved by teamlead" },
        { status: "Approved by manager" },
        { status: "Approval pending for general manager" },
    ];

    const workflowList = () => {
        AppService.getUserWorkflowList(header)
            .then((response) => {
                console.log(response.data);
                console.log(response.data[0]);
                setWorkflow(response.data[0]);
            }).catch((error) => {
                console.log(error);
            })
    }

    const getPendigFileList = () => {
        AppService.getFileList(workflow, stageName, header)
            .then((response) => {
                console.log(response.data);
                setFileDatas(response.data);
            })
    }

    const Handlechangeselect = (event) => {
        console.log("==workflow==", event.target.value);
        // setWorkflowName(event.target.value)
    }

    const handleFileInput = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('workflowName', workflow);
        if (file.type === 'application/pdf') {
            try {
                const response = await axios.post("http://localhost:8080/file/upload", formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorageToken}`
                        }
                    });
                console.log(response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'File uploaded successfully',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (error) {
                toast.error(error);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid file type',
                toast: true,
                position: 'top-end',
                text: 'Please upload only PDF files',
                timer: 1500
            });
        }


    };

    const ViewHistory = (namefile) => {
        console.log(namefile);
    };

    const onLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        navigate('/login')
    }

    useEffect(() => {
        getPendigFileList()
        workflowList()
    }, [])

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">History</Popover.Header>
            <Popover.Body>
                {currentStatus.map(update => {
                    return (
                        <div key={update.status}>
                            <div>{update.status}</div>
                        </div>
                    );
                })}
            </Popover.Body>
        </Popover>
    );

    return (
        <div className="container">
            <div className='mt-3'>
                <UserNavbar username={username} onClick={onLogout} />
                <div className='row'>
                    <div className='col-4'>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Upload File</label>
                            <input className="form-control" type="file" onChange={handleFileInput} id="formFile" />
                            <button className='btn btn-success mt-2' onClick={handleSubmit}>Upload</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <table className="table table-striped">
                    <thead style={{ textAlign: 'center' }}>
                        <tr>
                            <th className="table-primary">File Name</th>
                            <th className="table-primary">Upload Date-Time</th>
                            <th className="table-primary">Current status</th>
                            <th className="table-primary">History</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        {
                            fileDatas.map((file) =>
                                <tr>
                                    <td>{file.fileName}</td>
                                    <td>{file.timeStamp}</td>
                                    <td>Pending</td>
                                    <td>
                                        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                                            <button className="btn bg-transparent" style={{ padding: 0, margin: 0 }} onClick={(e) => { ViewHistory(file.fileName) }}>
                                                <i className="bi bi-info-circle-fill" style={{ fontSize: '21px' }}></i>
                                            </button>
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}