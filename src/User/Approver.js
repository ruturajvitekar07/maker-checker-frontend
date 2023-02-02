import React, { useEffect, useState } from 'react'
import AppService from '../Service/AppService';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function Approver() {

    const [folder, setFolder] = useState('')
    const [sNum, setSNum] = useState('')
    const [comment, setComment] = useState('')
    const [role, setRole] = useState('')
    const [user, setUser] = useState([])
    const [fileData, setFileData] = useState([])
    const navigate = useNavigate()
    const username = sessionStorage.getItem('username');
    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

    const [show, setShow] = useState(false); 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const getPendigFileList = () => {
        AppService.getUserInfo(username, header)
            .then((response) => {
                if (response.status === 200) {
                    setUser(response.data)
                    setRole(response.data.role)
                    if (response.data.role == "associate") {
                        setSNum("1")
                        pendingFiles()
                    }
                    else if (response.data.role == "team lead") {                    
                        setSNum("2")
                        pendingFiles()
                    }
                    else if (response.data.role == "manager") {                        
                        setSNum("3")
                        pendingFiles()
                    }
                } else {
                    toast.error("Data not stored", { autoClose: 1000 });
                }
            })

    }

    const pendingFiles = () => {
        console.log(sNum);
        AppService.getFileList(sNum, header)
            .then((response) => {
                setFileData(response.data);
            })
    }

    const approveFile = (file1) => {
        const status1 = "approved";
        console.log(role);
        console.log(file1);
        console.log(status1);
        console.log(comment);
        const decision = { file1, role, status1, comment }
        AppService.fileApproveDecline(decision, header)
            .then((response) => {
                console.log(response.data);
                toast.success("Approved", { autoClose: 1000 })
            })
        pendingFiles(folder)
    }

    const declineFile = (file1) => {
        const status1 = "declined";
        console.log(role);
        console.log(file1);
        console.log(status1);
        console.log(comment);
        const decision = { file1, role, status1, comment }
        AppService.fileApproveDecline(decision, header)
            .then((response) => {
                console.log(response.data);
                toast.success("Declined", { autoClose: 1000 })
            })
    }

    useEffect(() => {
        getPendigFileList()
    }, [])

    const downloadFile = (file1) => {
        // const fileObject1={username,stageno,filename};
        // AppService.downloadFile(fileObject1, header)
        // .then

    }


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
                </div>
                <div className='my-lg-2'>
                    <button className='btn btn-primary' style={{ marginLeft: 'auto' }} onClick={onLogout}>Logout</button>
                </div>
                <div className='mt-4'>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="table-primary">Filename</th>
                                <th className="table-primary">Date & Time</th>
                                <th className="table-primary">Download</th>
                                <th className="table-primary">Action</th>
                                {/* <th className="table-primary">Comment</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                fileData.map((file) =>
                                    <tr>
                                        <td>{file.fileName}</td>
                                        <td>{file.timeStamp}</td>
                                        <td>
                                            <button className='btn btn-info' onClick={() => downloadFile(file.fileName)}>Download</button>
                                        </td>
                                        <td>
                                            {/* <button className='btn btn-success' onClick={() => approveFile(file.fileName)} >Approve</button> */}
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
                                            {/* <button className='btn btn-danger' onClick={() => declineFile(file.fileName)} >Decline</button> */}
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
                                        {/* <td>
                                            <center>
                                                <div className="row g-3 align-items-center">
                                                    <div className="col-auto">
                                                        <label htmlFor="comment" className="col-form-label">Comment :</label>
                                                    </div>
                                                    <div className="col-auto">
                                                        <input type="text" placeholder="Enter reason" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} className="form-control" />
                                                    </div>
                                                </div>
                                            </center>
                                        </td> */}
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
