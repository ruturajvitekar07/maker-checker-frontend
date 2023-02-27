import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import UserNavbar from '../Navbars/UserNavbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import AppService from '../Service/AppService'
import Login from '../LogIn/Login';
import User from '../User/User';

const NewLogin = () => {

    const navigate = useNavigate()
    // const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [comment, setComment] = useState('')
    const [fileData, setFileData] = useState([])
    const [status, setStatus] = useState('')
    const [fileDatas, setFileDatas] = useState([])
    // const [workflow, setWorkflow] = useState([])
    const [workflowName, setWorkflowName] = useState('A1')
    const [file, setFile] = useState(null);
    const username1 = sessionStorage.getItem("username");
    const email = sessionStorage.getItem('username');
    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };
    const responseType = { responseType: 'blob' };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (event) => {
        setShow(true);
        setStatus(event.target.name);
        console.log("status : " + event.target.name);
    }
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = (event) => {
        setShow1(true);
        setStatus(event.target.name);
        console.log("status : " + event.target.name);
    }

    //==================Login====================

    const onLogin = (e) => {
        e.preventDefault();
        const userCredentials = { username, password }
        if (username.length == 0) {
            toast.warning('Please Enter username', { autoClose: 1000 })
        } else if (password.length == 0) {
            toast.warning('Please Enter Password', { autoClose: 1000 })
        } else {
            AppService.signin(userCredentials)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success('Welcome to my Application', { autoClose: 1000 })
                        const access_token = response.data.access_token
                        const username = response.data.username
                        sessionStorage.setItem("access_token", access_token);
                        sessionStorage.setItem("username", username)
                        sessionStorage['access_token'] = access_token
                        sessionStorage['username'] = username
                        if (username == "ADMIN")
                            navigate('/admin')
                        else if (username !== null) {
                            const localStorageToken = sessionStorage.getItem("access_token");
                            const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };
                            AppService.getUserInfo(username, header)
                                .then((response) => {
                                    if (response.status === 200) {
                                        console.log(response.data.role);
                                        if (response.data.role === "developer") {
                                            setIsLoggedIn(true);
                                            console.log(response.data.role);
                                            setRole(response.data.role);
                                            // history.push('/dashboard/developer');
                                        }
                                        else {
                                            setIsLoggedIn(true);
                                            console.log(response.data.role);
                                            setRole(response.data.role);
                                            // history.push('/dashboard/approver');
                                        }
                                    } else {
                                        toast.error("Data not stored", { autoClose: 1000 });
                                    }
                                })

                        }
                    }
                })
                .catch((error) => {
                    toast.error('Invalid name or password', { autoClose: 1000 })
                })
        }
    };

    //==================Approver====================

    const getPendigFileLists = () => {
        AppService.getUserInfo(email, header)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    if (response.data.role == "associate") {
                        pendingFiles(response.data.previousStage)
                    }
                    else if (response.data.role == "team lead") {
                        pendingFiles(response.data.previousStage)
                    }
                    else if (response.data.role == "manager") {
                        pendingFiles(response.data.previousStage)
                    }
                } else {
                    toast.error("Data not stored", { autoClose: 1000 });
                }
            })
    }

    const pendingFiles = (stageNumber) => {
        console.log("==========stage===========");
        console.log(stageNumber);
        console.log("===========stage==========");
        AppService.getFileList(stageNumber, header)
            .then((response) => {
                console.log(response.data)
                setFileData(response.data);
            })
    }

    const approveFile = (fileName) => {
        const status = "approved";
        console.log(role);
        console.log(fileName);
        console.log(status);
        console.log(comment);
        const decision = { fileName, role, status, comment }
        AppService.fileApproveDecline(decision, header)
            .then((response) => {
                console.log(response.data);
                toast.success("Approved", { autoClose: 1000 })
            })
        // pendingFiles(stageno)
    }

    const declineFile = (fileName) => {
        const status = "declined";
        console.log(role);
        console.log(fileName);
        console.log(status);
        console.log(comment);
        const decision = { fileName, role, status, comment }
        AppService.fileApproveDecline(decision, header)
            .then((response) => {
                console.log(response.data);
                toast.success("Declined", { autoClose: 1000 })
            })
        // pendingFiles(stageno)
    }

    const downloadFile1 = async (filename) => {
        console.log(email);
        // console.log(stageno);
        console.log(filename);
        const fileObj = { email, filename };
        // const fileObj = { email, stageno, filename };
        try {
            const response = await axios.post('http://localhost:8080/file/download-file-byte1',
                fileObj, header, { responseType: 'blob' }
            );
            let url = window.URL.createObjectURL(new Blob([response.data]));
            let link = document.createElement('a');
            link.href = link;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(url);
            toast.success("downloaded", { autoClose: 1000 })
        } catch (error) {
            toast.error(error);
        }
    };


    //==================User====================

    const currentStatus = [
        { status: "Approved by developer" },
        { status: "Approved by associate" },
        { status: "Approved by teamlead" },
        { status: "Approved by manager" },
        { status: "Approval pending for general manager" },
    ];

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

    const getPendigFileList = () => {
        AppService.getFileList("1", header)
            .then((response) => {
                console.log(response.data);
                setFileDatas(response.data);
            })
    }

    // const workflowList = () => {
    //     AppService.getUserWorkflowList(header)
    //         .then((response) => {
    //             console.log(response.data);
    //             setWorkflow(response.data);
    //         }).catch((error) => {
    //             console.log(error);
    //         })
    // }

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
        if (file.type === 'application/pdf') {
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
        }
        else {
            toast.error('Only PDF files are allowed to upload', { autoClose: 1500 });
        }
    };

    const ViewHistory = (namefile) => {
        console.log(namefile);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setRole('');
        sessionStorage.removeItem('access_token')
        localStorage.removeItem('access_token')
        sessionStorage.removeItem('username')
        localStorage.removeItem('username')
        navigate('/login')
    };

    const onLogout = () => {
        setIsLoggedIn(false);
        setRole('');
        sessionStorage.removeItem('access_token')
        localStorage.removeItem('access_token')
        sessionStorage.removeItem('username')
        localStorage.removeItem('username')
        navigate('/login')
    }

    const goHome = () => {
        navigate('/')
    }

    useEffect(() => {
        getPendigFileLists()
        getPendigFileList()
        // workflowList()
    }, [])

    return (
        <>
            {isLoggedIn ? (
                <>
                    {role === 'developer' ? (
                        <div className="container">
                            <div className='mt-3'>
                                <UserNavbar username={username1} onClick={onLogout} />
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
                        // <User/>
                    ) : (
                        <div className='container'>
                            <div className='mt-5'>
                                <UserNavbar username={username1} onClick={onLogout}/>
                                <hr />
                                <div className='mt-4'>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th className="table-primary">Filename</th>
                                                <th className="table-primary">Date & Time</th>
                                                <th className="table-primary">Download</th>
                                                <th className="table-primary">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                fileData.map((file) =>
                                                    <tr>
                                                        <td>{file.fileName}</td>
                                                        <td>{file.timeStamp}</td>
                                                        <td>
                                                            <button className='btn btn-info' type='submit' onClick={() => downloadFile1(file.fileName)}>Download</button>
                                                        </td>
                                                        <td>
                                                            <Button name='Approved' variant="success" onClick={(e) => handleShow}>Approve</Button>
                                                            <Modal show={show} onHide={handleClose}>
                                                                <Modal.Header closeButton>
                                                                    <Modal.Title>Reason</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    <Form>
                                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                            <Form.Label>Comment</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                name="comment"
                                                                                value={comment}
                                                                                onChange={(e) => setComment(e.target.value)}
                                                                                placeholder="Approve reason"
                                                                                autoFocus
                                                                            />
                                                                        </Form.Group>
                                                                    </Form>
                                                                </Modal.Body>
                                                                <Modal.Footer>
                                                                    <Button variant="secondary" onClick={handleClose}>
                                                                        Close
                                                                    </Button>
                                                                    <Button variant="primary" onClick={() => approveFile(file.fileName)}>
                                                                        Approve
                                                                    </Button>
                                                                </Modal.Footer>
                                                            </Modal>
                                                            &nbsp;&nbsp;
                                                            <Button name='Declined' variant="danger" onClick={(e) => handleShow1}>Decline</Button>
                                                            <Modal show={show1} onHide={handleClose1}>
                                                                <Modal.Header closeButton>
                                                                    <Modal.Title>Reason</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    <Form>
                                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                            <Form.Label>Comment</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                name="comment"
                                                                                value={comment}
                                                                                onChange={(e) => setComment(e.target.value)}
                                                                                placeholder="Decline reason"
                                                                                autoFocus
                                                                            />
                                                                        </Form.Group>
                                                                    </Form>
                                                                </Modal.Body>
                                                                <Modal.Footer>
                                                                    <Button variant="secondary" onClick={handleClose1}>
                                                                        Close
                                                                    </Button>
                                                                    <Button variant="primary" onClick={() => declineFile(file.fileName)}>
                                                                        Decline
                                                                    </Button>
                                                                </Modal.Footer>
                                                            </Modal>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="container-fluid">
                    <div className="container-fluid col-8 offset-2 mt-5">
                        <div className="row g-0 col-12" style={{ padding: 0, margin: 0, boxSizing: "border-box" }}>
                            <div className="col-5">
                                <img src={require('../Images/welcome.jpg')} className="img-fluid" alt="Maker-Checker" style={{ height: '500px', width: '900px', borderTopLeftRadius: '17px', borderBottomLeftRadius: '17px' }} onClick={goHome} />
                            </div>
                            <div className="col-7 py-5">
                                <h2 className="ml-4" style={{ textAlign: "center", fontSize: '3rem', fontWeight: 700 }}>Login</h2>
                                <form>
                                    <div className="form-row py-3 pt-5">
                                        <div className="offset-1 col-lg-9">
                                            <input
                                                type="text"
                                                placeholder="Enter username"
                                                name="username"
                                                required
                                                value={username}
                                                className="form-control"
                                                onChange={(e) => { setUsername(e.target.value) }} />
                                        </div>

                                    </div>
                                    <div className="form-row">
                                        <div className="offset-1 py-3 col-lg-9">
                                            <input
                                                type="password"
                                                placeholder="Enter password"
                                                name="password"
                                                value={password}
                                                required
                                                className="form-control"
                                                onChange={(e) => { setPassword(e.target.value) }} />
                                        </div>
                                    </div>

                                    <div className="form-row py-3">
                                        <div className="offset-1 col-lg-10">
                                            <div>
                                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<button onClick={(e) => onLogin(e)} className="btn btn-success col-4" style={{ alignContent: "center" }}>Login</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                // <Login/>
            )}
        </>
    );
};

export default NewLogin;
