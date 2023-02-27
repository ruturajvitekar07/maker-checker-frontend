import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import AppService from '../Service/AppService'
import axios from "axios";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import UserNavbar from '../Navbars/UserNavbar';

export default function User() {

    const navigate = useNavigate()
    const [fileDatas, setFileDatas] = useState([])
    const [workflow, setWorkflow] = useState([])
    const [workflowName, setWorkflowName] = useState('A1')
    const [file, setFile] = useState(null);
    const username = sessionStorage.getItem("username");
    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

    const currentStatus = [
        { status: "Approved by developer" },
        { status: "Approved by associate" },
        { status: "Approved by teamlead" },
        { status: "Approved by manager" },
        { status: "Approval pending for general manager" },
    ];

    const getPendigFileList = () => {
        AppService.getFileList("1", header)
            .then((response) => {
                console.log(response.data);
                setFileDatas(response.data);
            })
    }

    const workflowList = () => {
        AppService.getUserWorkflowList(header)
            .then((response) => {
                console.log(response.data);
                setWorkflow(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }

    const Handlechangeselect = (event) => {
        console.log("==workflow==", event.target.value);
        setWorkflowName(event.target.value)
    }

    const handleFileInput = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setWorkflowName('A1')
        const formData = new FormData();
        formData.append('file', file);
        console.log(workflowName);
        console.log(localStorageToken);
        // formData.append('localStorageToken', localStorageToken);
        try {
            const response = await axios.post("http://localhost:8080/file/upload", formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorageToken}`
                    }
                });
            console.log(response.data);
            toast.success("File uploaded successfully", { autoClose: 1000 })
            getPendigFileList();
        } catch (error) {
            toast.error(error);
        }
    };

    const ViewHistory = (namefile) => {
        console.log(namefile);
    };

    const onLogout = () => {
        sessionStorage.removeItem('access_token')
        localStorage.removeItem('access_token')
        sessionStorage.removeItem('username')
        localStorage.removeItem('username')
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
                <UserNavbar username={username}/>
                <hr />

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