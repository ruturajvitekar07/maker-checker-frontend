import React, { useEffect, useState } from "react";
import UserAppService from "../Service/UserAppService";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import UserNavbar from "../Navbars/UserNavbar";
import Swal from "sweetalert2";
import { APPROVED, DECLINED, Workflow_CSV, Workflow_PDF } from "../Constants/constants";
import { useIdleTimer } from 'react-idle-timer';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function Approver() {
    const [comment, setComment] = useState("");
    const [fileData, setFileData] = useState([]);
    const [role, setRole] = useState("");
    const [fileName, setFileName] = useState("");
    const [status, setStatus] = useState("");
    const [workflowName, setWorkflowName] = useState("");
    const [stageName, setStageName] = useState("");
    const navigate = useNavigate();
    const username = sessionStorage.getItem("username");
    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: { Authorization: `Bearer ${localStorageToken}` } };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (file1) => {
        setShow(true);
        setStatus(APPROVED);
        setFileName(file1);
    };
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = (file1) => {
        setShow1(true);
        setStatus(DECLINED);
        setFileName(file1);
    };

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isSwalOpen, setIsSwalOpen] = useState(false);

    const { getRemainingTime, reset } = useIdleTimer({
        timeout: 1000 * 60 * 10,     // 5 minutes
        onIdle: () => {
            console.log('User is idle');
            handleLogout();     // call the logout function when the user is idle
        },
    });

    const handleOnIdle = () => {
        const remainingTime = getRemainingTime();
        if (!isSwalOpen && remainingTime < 1000 * 60 * 1 && isLoggedIn) {           // show a warning message to the user when they have 1 minute left before being logged out
            MySwal.fire({
                title: 'You have been idle for a while!',
                text: `You will be logged out in ${remainingTime / 1000} seconds`,
                showCancelButton: true,
                confirmButtonText: 'Stay logged in',
                cancelButtonText: 'Log out',
                cancelButtonColor: '#dc3545',
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log('User wants to stay');
                    setIsSwalOpen(false);
                    reset(); // reset the idle timer when the user wants to stay logged in
                } else {
                    handleLogout();
                }
            });
            setIsSwalOpen(true);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        console.log('User has been logged out');
        reset(); // reset the idle timer when the user logs out
        sessionStorage.clear();
        localStorage.clear();
        navigate('/login')
    };

    useEffect(() => {
        let intervalId;
        if (isLoggedIn) {
            intervalId = setInterval(() => {
                handleOnIdle(); // check for idle state every second
            }, 1000);
        }
        return () => clearInterval(intervalId); // clear the interval when the component unmounts or when the user logs out
    }, [isLoggedIn]);

    const getPendigFileLists = () => {
        UserAppService.getUserInfo(header)
            .then((response) => {
                if (response.status === 200) {
                    setRole(response.data.role);
                } else if (response.status === 400) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Bad request. Please check your input.",
                        toast: true,
                        position: "top-end",
                        timer: 1500,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Data not stored.",
                        toast: true,
                        position: "top-end",
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong. Please try again later.",
                    toast: true,
                    position: "top-end",
                    timer: 1500,
                });
            });
        UserAppService.getUserWorkflowList(header)
            .then((response) => {
                if (response.status === 200) {
                    const data = response.data;
                    console.log(data);
                    const stage = data[0]?.stages[0]?.stage[0];
                    const ver = data[0]?.version;
                    console.log(ver);
                    setWorkflowName(ver);
                    setStageName(stage.previousStage);
                    pendingFiles(ver, stage.previousStage);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to get user workflow list.",
                        toast: true,
                        position: "top-end",
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to get user workflow list.",
                    toast: true,
                    position: "top-end",
                    timer: 1500,
                });
            });
    };

    const pendingFiles = (v1, stageName1) => {
        UserAppService.getFileList(v1, stageName1, header)
            .then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                    const sortedData = response.data.sort((a, b) => {
                        if (a.fileName < b.fileName) {
                            return -1;
                        } else if (a.fileName > b.fileName) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    setFileData(sortedData);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to get file list",
                        text: "Please try again later",
                        toast: true,
                        position: "top-end",
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Failed to get file list",
                    text:
                        error.response.data.message ||
                        error.message ||
                        "Please try again later",
                    toast: true,
                    position: "top-end",
                    timer: 1500,
                });
            });
    };

    const fileDecision = (fileName) => {

        if (!comment) {
            Swal.fire({
                icon: "warning",
                title: "Comment is required",
                text: "Please enter a comment before submitting your decision",
                toast: true,
                position: "top-end",
                timer: 4500,
            });
            return;
        }

        const decision = { fileName, role, status, workflowName, comment };
        UserAppService.fileApproveDecline(decision, header)
            .then((response) => {
                if (response.status === 200) {
                    if (status === APPROVED) {
                        Swal.fire({
                            icon: "success",
                            title: "File is approved",
                            text: "File decision saved successfully",
                            toast: true,
                            position: "top-end",
                            timer: 4500,
                        });
                    } else if (status === DECLINED) {
                        Swal.fire({
                            icon: "warning",
                            title: "File is declined",
                            text: `File is declined with reason ${comment}`,
                            footer: "Please read comment and try again",
                            toast: true,
                            position: "top-end",
                            timer: 4500,
                        });
                    }
                    setComment("");
                    handleClose()
                    handleClose1()
                    getPendigFileLists();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to save file decision",
                        text: "Please try again later",
                        toast: true,
                        position: "top-end",
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to save file decision",
                        text: "Bad request. Please check your input.",
                        toast: true,
                        position: "top-end",
                        timer: 1500,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to save file decision",
                        text:
                            error.response.data.message ||
                            error.message ||
                            "Please try again later",
                        toast: true,
                        position: "top-end",
                        timer: 1500,
                    });
                }
            });
    };

    const downloadFile = async (filename) => {
        const fileObj = { workflowName, stageName, filename };
        try {
            const response = await UserAppService.downloadFile(fileObj, header);
            if (response.status === 200) {
                let url = window.URL.createObjectURL(new Blob([response.data]));
                let link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", filename);
                document.body.appendChild(link);
                link.click();
                URL.revokeObjectURL(url);
                Swal.fire({
                    icon: "success",
                    title: "file downloaded",
                    timer: 2000,
                    toast: true,
                    position: "top-end",
                    timerProgressBar: true,
                    timerProgressBarColor: "red",
                    showConfirmButton: false,
                });
            } else {
                throw new Error("Failed to download file");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to download file. Please try again later.",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
            });
            console.error(error);
        }
    };

    useEffect(() => {
        getPendigFileLists();
    }, []);

    return (
        <div className="">
            <UserNavbar username={username} onLogout={handleLogout} />
            <div className="container-fluid">
                <div className="col-10 offset-1 mt-4">
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
                            {fileData && fileData.length > 0 ? (
                                fileData.map((file, index) => (
                                    <tr key={index}>
                                        <td>{file.fileName}</td>
                                        <td>{file.timeStamp}</td>
                                        <td>
                                            <button
                                                className="btn btn-secondary"
                                                type="submit"
                                                onClick={() => downloadFile(file.fileName)}
                                            >
                                                Download
                                            </button>
                                        </td>
                                        <td>
                                            <Button
                                                name="Approved"
                                                variant="success"
                                                onClick={(e) => handleShow(file.fileName)}
                                            >
                                                Approve
                                            </Button>
                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Reason</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form>
                                                        <Form.Group
                                                            className="mb-3"
                                                            controlId="exampleForm.ControlInput1"
                                                        >
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
                                                    <Button
                                                        variant="primary"
                                                        onClick={() => fileDecision(fileName)}
                                                    >
                                                        Approve
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                            &nbsp;&nbsp;
                                            <Button
                                                name="Declined"
                                                variant="danger"
                                                onClick={(e) => handleShow1(file.fileName)}
                                            >
                                                Decline
                                            </Button>
                                            <Modal show={show1} onHide={handleClose1}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Reason</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form>
                                                        <Form.Group
                                                            className="mb-3"
                                                            controlId="exampleForm.ControlInput1"
                                                        >
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
                                                    <Button
                                                        variant="primary"
                                                        onClick={() => fileDecision(fileName)}
                                                    >
                                                        Decline
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        style={{ textAlign: "center", fontWeight: "bold" }}
                                    >
                                        {fileData
                                            ? "No files pending for approve or decline"
                                            : "Data not present"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
