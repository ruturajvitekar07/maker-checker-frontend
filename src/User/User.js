import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import AppService from '../Service/AppService'
import axios from "axios";


export default function User() {

    const navigate = useNavigate()
    const [fileData, setFileData] = useState([])
    const [file, setFile] = useState(null);
    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

    const getPendigFileList = () => {
        AppService.getFileList("1", header)
            .then((response) => {
                console.log(response.data);
                setFileData(response.data);
            })
    }

    const handleFileInput = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        console.log(localStorageToken)
        formData.append('localStorageToken', localStorageToken);
        try {
            const response = await axios.post("http://localhost:8080/file/upload", formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorageToken}`
                    }
                });
            console.log(response.data);
            toast.success("File uploaded successfully", {autoClose:1000})
            getPendigFileList();
        } catch (error) {
            toast.error(error);
        }
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
                </div>
                <div className='my-lg-2'>
                    <button className='btn btn-primary' onClick={onLogout}>Logout</button>
                </div>
                <hr />
                <div className='col-4'>
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Upload File</label>
                        <input className="form-control" type="file" onChange={handleFileInput} id="formFile" />
                        <button className='btn btn-success mt-2' onClick={handleSubmit}>Upload</button>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="table-primary">File Name</th>
                            <th className="table-primary">Upload Date-Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fileData.map((file) =>
                                <tr>
                                    <td>{file.fileName}</td>
                                    <td>{file.timeStamp}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}