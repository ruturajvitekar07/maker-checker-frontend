import React, { useEffect, useState } from 'react'
import AppService from '../Service/AppService';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export default function Approver() {

    const [stageno, setStageno] = useState('')
    const [comment, setComment] = useState('')
    const [role, setRole] = useState('')
    const [fileData, setFileData] = useState([])
    const navigate = useNavigate()
    const email = sessionStorage.getItem('username');
    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };
    const responseType = { responseType: 'blob' };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const getPendigFileList = () => {
        AppService.getUserInfo(email, header)
            .then((response) => {
                if (response.status === 200) {
                    setRole(response.data.role)
                    if (response.data.role == "associate") {
                        pendingFiles("1")
                        setStageno("1")
                    }
                    else if (response.data.role == "team lead") {
                        pendingFiles("2")
                        setStageno("2")
                    }
                    else if (response.data.role == "manager") {
                        pendingFiles("3")
                        setStageno("3")
                    }
                } else {
                    toast.error("Data not stored", { autoClose: 1000 });
                }
            })

    }


    const pendingFiles = (stageno) => {
        console.log(stageno);
        AppService.getFileList(stageno, header)
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
        pendingFiles(stageno)
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
        pendingFiles(stageno)
    }


    useEffect(() => {
        getPendigFileList()
    }, [])

    const downloadFile = (filename) => {
        const fileObj = { email, stageno, filename }
        console.log(email)
        console.log(stageno)
        console.log(filename)
        AppService.downloadFile(fileObj, header, responseType)
            .then((response) => {
                console.log(response.data)
                toast.success("downloaded", { autoClose: 1000 })
            })
    };

    const downloadFile1 = async (filename) => {
        console.log(email);
        console.log(stageno);
        console.log(filename);
        const fileObj = { email, stageno, filename };
        try {
            const response = await axios.post('http://localhost:8080/file/download-file-byte1',
                fileObj, header, { responseType: 'blob' }
            );
            let url = window.URL.createObjectURL(new Blob([response.data]));
            let link = document.createElement('a');
            link.href = link;
            link.setAttribute('download', filename);
            link.click();
            toast.success("downloaded", { autoClose: 1000 })
        } catch (error) {
            toast.error(error);
        }
    };

    // const file = new Blob(response, { type: 'text/plain'});
    // const element = document.createElement("a");
    // element.href = URL.createObjectURL(file);
    // element.download = "download-" + Date.now() + ".txt";
    // document.body.appendChild(element); // Required for this to work in FireFox
    // element.click();

    const onLogout = () => {
        sessionStorage.removeItem('access_token')
        localStorage.removeItem('access_token')
        sessionStorage.removeItem('username')
        localStorage.removeItem('username')
        navigate('/login')
    }

    return (
        <div className='container'>
            <div className='mt-5'>
                <h2 className='text-center'>Approver Dashboard</h2>
                <div className='mt-4'>
                    <Link to="/profile">
                        <a className="btn btn-primary">Profile</a>
                    </Link>
                    &nbsp;
                    &nbsp;
                    <button className='btn btn-primary' style={{ float: 'right' }} onClick={onLogout}>Logout</button>
                </div>
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
                                            <Button variant="success" onClick={handleShow}>Approve</Button>
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
                                            <Button variant="danger" onClick={handleShow1}>Decline</Button>
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
    )
}
