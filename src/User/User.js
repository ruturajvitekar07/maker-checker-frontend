import { useEffect, useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useNavigate } from 'react-router-dom';
import { useTracking } from 'react-tracking';
import Swal from 'sweetalert2';
import { UPLOAD_CSV, UPLOAD_PDF } from '../Constants/constants';
import useAuth from '../LogIn/auth';
import UserNavbar from '../Navbars/UserNavbar';
import UserAppService from '../Service/UserAppService';
import IdleTimeout from '../Utility/IdleTimeout';
import { useIdleTimer } from 'react-idle-timer';

export default function User() {

    const navigate = useNavigate()
    const { trackEvent } = useTracking();
    const [role, setRole] = useState('');
    const [fileDatas, setFileDatas] = useState([])
    const [currentStatus, setCurrentStatus] = useState([])
    const [file, setFile] = useState(null);
    const username = sessionStorage.getItem("username");
    const access_token = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${access_token}` } };
    const { isSwalOpen, setIsSwalOpen, isLoggedIn, setIsLoggedIn } = useAuth();

    const { reset } = useIdleTimer({
        timeout: 1000 * 60 * 5, // 10 minutes
    });

    const handleLogout = () => {
        trackEvent({
            component: "User",
            event: "Clicked on logout button",
            user: username,
            time: new Date().toLocaleString(),
            status: "Success"
        });
        UserAppService.signoff(header);
        setIsLoggedIn(false);
        console.log('User has been logged out');
        reset();
        sessionStorage.clear();
        localStorage.clear();
        navigate('/login')
    };

    const getPendingFilesList = () => {
        UserAppService.getPendingFilesList(header)
            .then((response) => {
                if (response.status === 200) {
                    const sortedData = response.data.sort((a, b) =>
                        a.fileName.localeCompare(b.fileName)
                    );
                    setFileDatas(sortedData);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error occurred',
                        text: 'Failed to fetch file list.',
                        toast: true,
                        position: 'top-end',
                        timer: 4000
                    });
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error occurred',
                        text: error.response.data.message || 'Please try again later',
                        toast: true,
                        position: 'top-end',
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error occurred',
                        text: error.message || 'Please try again later',
                        toast: true,
                        position: 'top-end',
                        timer: 1500
                    });
                }
            });
    }

    useEffect(() => {
        getPendingFilesList();
    })

    const handleFileInput = (event) => {
        setFile(event.target.files[0]);
    };

    const ViewHistory = async (filename) => {
        try {
            const response = await UserAppService.getFileHistory(filename, header);
            if (response.status === 200) {
                setCurrentStatus(response.data);
            } else {
                console.log("Error occurred");
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to get file history.",
                    toast: true,
                    position: "top-end",
                    timer: 2500,
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response.data.message,
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2500,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.message,
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2500,
                });
            }
            throw error;
        }
    };

    const handleSubmitPdf = async (e) => {
        // e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('event', UPLOAD_PDF)
        formData.append('localStorageToken', access_token);
        console.log(access_token);
        if (file != null) {
            if (file.type === 'application/pdf') {
                // handle PDF file
                try {
                    const response = await UserAppService.uploadSpecificFile(formData, header);
                    console.log(response.data);
                    if (response.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: "PDF File uploaded successfully",
                            toast: true,
                            position: "top-end",
                            footer: response.message,
                            showConfirmButton: false,
                            timer: 2500,
                        });
                    }
                    setFile('')
                    getPendingFilesList();
                } catch (error) {
                    console.log(error);
                    if (error.response && error.response.status === 400) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error.response.data.message,
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 2500
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Failed to upload PDF file',
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }
                }
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Invalid file type',
                    toast: true,
                    position: 'top-end',
                    text: 'Please upload a PDF file',
                    timer: 3000
                });
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'File not found',
                toast: true,
                position: 'top-end',
                text: 'Please upload a file',
                timer: 3000
            });
        }
    };

    const handleSubmitCsv = async (e) => {
        // e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('event', UPLOAD_CSV)
        formData.append('localStorageToken', access_token);
        if (file != null) {
            if (file.type === 'text/csv') {
                // handle CSV file
                try {
                    const response = await UserAppService.uploadSpecificFile(formData, header);
                    console.log(response.data); if (response.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'CSV file uploaded successfully',
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }
                    setFile('')
                    getPendingFilesList();
                } catch (error) {
                    console.log(error);
                    if (error.response && error.response.status === 400) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error.response.data.message,
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 2500
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Failed to upload CSV file',
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }
                }
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Invalid file type',
                    toast: true,
                    position: 'top-end',
                    text: 'Please upload a CSV file',
                    timer: 3000
                });
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'File not found',
                toast: true,
                position: 'top-end',
                text: 'Please upload a file',
                timer: 3000
            });
        }
    };

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">History</Popover.Header>
            <Popover.Body>
                {currentStatus.map((update, index) => {
                    return (
                        <p key={index}>
                            {update.fileName} {update.status} by {update.roleOfChecker} <br />
                            Pending for stage {update.nextStage}
                        </p>
                    );
                })}
            </Popover.Body>
        </Popover>
    );

    window.addEventListener('popstate', function (event) {
        if (isLoggedIn) {
            window.history.go(-(window.history.length - 1));

            Swal.fire({
                title: 'Warning',
                text: 'You cannot go back. Please logout first.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Logout and return to login page',
                cancelButtonText: 'Stay on this page'
            }).then((result) => {
                if (result.isConfirmed) {
                    handleLogout();
                } else {
                    console.log(window.location.href);
                    window.history.pushState(null, null, window.location.href);
                }
            });
        }
    });

    return (
        <div className="">
            <IdleTimeout/>
            <UserNavbar username={username} onLogout={handleLogout} />
            <div className='container-fluid col-10 offset-1'>
                <div className='mt-3'>
                    <div className='row mt-3'>
                        <div className='col-4'>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Upload File</label>
                                <input className="form-control" type="file" onChange={handleFileInput} id="formFile" />
                                <div className='mt-2' style={{ display: 'flex', gap: '16px' }}>
                                    <button className='btn btn-success'
                                        // onClick={handleSubmitPdf} 
                                        onClick={() => {
                                            handleSubmitPdf();
                                            trackEvent({
                                                component: "User",
                                                event: "Clicked on upload pdf file button",
                                                user: username,
                                                time: new Date().toLocaleString(),
                                                status: "Success"
                                            });
                                        }}
                                    >
                                        Upload PDF
                                    </button>
                                    <button className='btn btn-success'
                                        // onClick={handleSubmitCsv} 
                                        onClick={() => {
                                            handleSubmitCsv();
                                            trackEvent({
                                                component: "User",
                                                event: "Clicked on upload csv file button",
                                                user: username,
                                                time: new Date().toLocaleString(),
                                                status: "Success"
                                            });
                                        }}
                                    >
                                        Upload CSV
                                    </button>
                                </div>
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
                                <th className="table-primary">Next Stage</th>
                                <th className="table-primary">History</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: 'center' }}>
                            {fileDatas && fileDatas.length > 0 ? (
                                fileDatas.map((file) =>
                                    <tr key={file.timeStamp}>
                                        <td>{file.fileName}</td>
                                        <td>{file.timeStamp}</td>
                                        <td>{file.status} by {file.roleOfChecker}</td>
                                        <td>{file.nextStage}</td>
                                        <td>
                                            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                                                <button className="btn bg-transparent" style={{ padding: 0, margin: 0 }}
                                                    // onClick={(e) => { ViewHistory(file.fileName) }}
                                                    onClick={(e) => {
                                                        ViewHistory(file.fileName);
                                                        trackEvent({
                                                            component: "User",
                                                            event: "Clicked on history i button",
                                                            user: username,
                                                            time: new Date().toLocaleString(),
                                                            status: "Success"
                                                        });
                                                    }}
                                                >
                                                    <i className="bi bi-info-circle-fill" style={{ fontSize: '21px' }}></i>
                                                </button>
                                            </OverlayTrigger>
                                        </td>
                                    </tr>
                                )
                            ) : (
                                <tr>
                                    <td colSpan="5">No file is uploaded, Please upload a file</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}