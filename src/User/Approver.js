import React, { useEffect, useState } from 'react'
import AppService from '../Service/AppService';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import UserNavbar from '../Navbars/UserNavbar'
import Swal from 'sweetalert2';

export default function Approver() {

    const [comment, setComment] = useState('')
    const [fileData, setFileData] = useState([])
    const [role, setRole] = useState('')
    const [status, setStatus] = useState('')
    const [workflowName, setWorkflowName] = useState('')
    const navigate = useNavigate()
    const username = sessionStorage.getItem('username');
    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

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

    const getPendigFileLists = () => {
        AppService.getUserInfo(username, header)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setRole(response.data.role);
                    setWorkflowName(response.data.workflows[0].version)
                    pendingFiles(response.data.previousStage);
                    // if (response.data.role == "associate") {
                    //     pendingFiles(response.data.previousStage)
                    // }
                    // else if (response.data.role == "team lead") {
                    //     pendingFiles(response.data.previousStage)
                    // }
                    // else if (response.data.role == "manager") {
                    //     pendingFiles(response.data.previousStage)
                    // }
                } else {
                    toast.error("Data not stored", { autoClose: 1000 });
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Data not stored.',
                        toast: true,
                        position: 'top-end',
                        timer: 1500
                    });
                }
            })
    }


    const pendingFiles = (stageName) => {
        console.log("==========stage===========");
        console.log(stageName);
        console.log("===========stage==========");
        AppService.getFileList(stageName, header)
            .then((response) => {
                console.log(response.data)
                setFileData(response.data);
            })
    }

    const fileDecision = (fileName) => {
        console.log(role);
        console.log(fileName);
        console.log(status);
        console.log(comment);
        console.log(workflowName);
        const decision = { fileName, role, status, comment, workflowName }
        AppService.fileApproveDecline(decision, header)
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: `${status}`,
                        text: 'File decision saved successfully',
                        toast: true,
                        position: 'top-end',
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to save file decision',
                        text: 'Please try again later',
                        toast: true,
                        position: 'top-end',
                        timer: 1500
                    });
                }
                console.log(response.data);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to save file decision',
                    text: error.message,
                    toast: true,
                    position: 'top-end',
                    timer: 1500
                });
            });
    }

    useEffect(() => {
        getPendigFileLists()
    }, [])



    // {
    //     "workflowName":"A1",
    //     "stageName":"upload",
    //     "filename":"download.jpg"
    // }

    const downloadFile1 = async (filename) => {
        // console.log(username);
        // console.log(stageno);
        console.log(filename);
        const fileObj = { filename };
        // const fileObj = { email, stageno, filename };
        try {
            const response = await axios.post('http://localhost:8080/file/download',
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

    const onLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        navigate('/login')
    }

    return (
        <div className='container'>
            <div className='mt-5'>
                <h2 className='text-center'>Approver Dashboard</h2>
                <UserNavbar username={username} onClick={onLogout} />
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
                                            <Button name='Approved' variant="success" onClick={(e) => handleShow('APPROVED')}>Approve</Button>
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
                                                    <Button variant="primary" onClick={() => fileDecision(file.fileName)}>
                                                        Approve
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                            &nbsp;&nbsp;
                                            <Button name='Declined' variant="danger" onClick={(e) => handleShow1('DECLINED')}>Decline</Button>
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
                                                    <Button variant="primary" onClick={() => fileDecision(file.fileName)}>
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
    )
}
