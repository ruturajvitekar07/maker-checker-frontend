import React, { useEffect, useState } from 'react'
import AppService from '../Service/AppService';
import { Link, useNavigate } from 'react-router-dom'

export default function ApprovedFiles() {

    const [fileData, setFileData] = useState([]);
    const navigate = useNavigate()
    const email = sessionStorage.getItem('username');
    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

    const getPendigFileList = () => {
        AppService.getUserInfo(email, header)
            .then((response) => {
                console.log(response.data);
                console.log("==========stage no===========");
                console.log(response.data.stageNo);
                console.log("==========stage no===========");
                pendingFiles(response.data.stageNo)
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
                                <th className="table-primary">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                fileData.map((file) =>
                                    <tr>
                                        <td>{file.fileName}</td>
                                        <td>{file.timeStamp}</td>
                                        <td>Approved</td>
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
