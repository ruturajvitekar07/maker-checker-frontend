import {ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import AppService from '../Service/AppService'


export default function User() {

    const navigate = useNavigate()
    const [fileData, setFileData] = useState([])
    const username = sessionStorage.getItem('username');

    const getPendigFileList = () => {
        const localStorageToken = sessionStorage.getItem("access_token");
        const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };
        AppService.getFileList("upload", header)
        .then((response) => {
            console.log(response.data);
            setFileData(response.data);
        })
    }

    const onLogout = () => {
        sessionStorage.removeItem('access_token')
        localStorage.removeItem('access_token')
        sessionStorage.removeItem('username')
        localStorage.removeItem('username')
        navigate('/login')
    }

    useEffect(() => {
        getPendigFileList()
    }, [])

    return (
        <div className="container">
            <div className='mt-5'>
                <h2 className="title mt-5" style={{ textAlign: 'center' }}>User Console</h2>
                <div className='mt-4'>
                    <Link to="/profile">
                        <a className="btn btn-primary">Profile</a>
                    </Link>
                    &nbsp;
                    &nbsp;
                    <Link to="/addstage">
                        <a className="btn btn-primary">History</a>
                    </Link>
                    &nbsp;
                    &nbsp;
                    <button className="btn btn-primary" onClick={onLogout}>
                        Logout
                    </button>
                    &nbsp;
                    &nbsp;
                </div>
                <div className='my-lg-2'>
                    <button className='btn btn-primary' onClick={onLogout}>Logout</button>
                </div>
                <hr/>
                <div className='col-4'>
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Upload File</label>
                        <input className="form-control" type="file" id="formFile"/>
                        <button className='btn btn-success mt-2'>Upload</button>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <table className="table table-striped">
                    <thead style={{ textAlign: 'center' }}>
                        <tr>
                            <th className="table-primary">File Name</th>
                            <th className="table-primary">History</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        {
                            fileData.map((file) =>
                                <tr>
                                    <td>{file}</td>
                                    {/* <td>
                                    <button className='btn btn-success' onClick={approveFile(user.email)}>Approve</button>
                                    &nbsp;&nbsp;
                                    <button className='btn btn-danger' onClick={declineFile(user.email)}>Decline</button>
                                </td> */}
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}