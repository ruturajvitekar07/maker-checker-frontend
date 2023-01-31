import React, { useEffect, useState } from 'react'
import AppService from '../Service/AppService';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Approver() {

    const [folder, setFolder] = useState('')
    const [user, setUser] = useState([])
    const [fileData, setFileData] = useState([])
    const [role, setRole] = useState('')
    const navigate = useNavigate()
    const username = sessionStorage.getItem('username');
    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

    const getPendigFileList = () => {
        AppService.getUserInfo(username, header)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setUser(response.data)
                    if (response.data.role == "associate") {
                        pendingFiles("1")
                        console.log("Folder : " + folder);
                    }
                    else if (response.data.role == "team lead") {
                        pendingFiles("2")
                        console.log("Folder : " + folder);
                    }
                    else if (response.data.role == "manager") {
                        pendingFiles("3")
                        console.log("Folder : " + folder);
                    }
                    else if (response.data.role == "gmanager") {
                        pendingFiles("4")
                        console.log("Folder : " + folder);
                    }
                } else {
                    console.error("Data not stored");
                }
            })

    }

    const pendingFiles = (folder) => {
        AppService.getFileList(folder, header)
            .then((response) => {
                console.log(response.data);
                setFileData(response.data);
            })
    }

    const approveFile = (username) => {
        AppService.fileApproveDecline(username, "approved", header)
            .then((response) => {
                console.log(response.data);
                toast.success("Approved")
            })
    }

    const declineFile = (username) => {
        AppService.fileApproveDecline(username, "declined", header)
            .then((response) => {
                console.log(response.data);
                toast.success("Declined")
            })
    }

    useEffect(() => {
        getPendigFileList()
    }, [])

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
                <div className='my-lg-2'>
                    <button className='btn btn-primary' style={{ marginLeft: 'auto' }} onClick={onLogout}>Logout</button>
                </div>
                <div className='mt-4'>
                    <table className="table table-striped">
                        <thead style={{ textAlign: 'center' }}>
                            <tr>
                                <th className="table-primary">Filename</th>
                                <th className="table-primary">Action</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: 'center' }}>
                            {
                                fileData.map((file) =>
                                    <tr>
                                        <td>{file}</td>
                                        <td>
                                            <button className='btn btn-success' onClick={() => approveFile(user.email)}>Approve</button>
                                            &nbsp;&nbsp;
                                            <button className='btn btn-danger' onClick={() => declineFile(user.email)}>Decline</button>
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
