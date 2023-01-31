import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import AppService from '../Service/AppService'

export default function AddStage () {
    const [no, setNo] = useState('')
    const [role, setRole] = useState('')
    const [previousStage, setPreviousStage] = useState('')
    const [nextStage, setNextStage] = useState('')
    const [dirName, setDirName] = useState('')
    const navigate = useNavigate()
    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: {"Authorization" : `Bearer ${localStorageToken}`} };

    const addStage = (event) => {
        event.preventDefault();
        const stage = {no, role, previousStage, nextStage, dirName}
        AppService.createStage(stage, header).then((response) => {
            if (response.status === 200) {
                toast.success('Add Stage')
                navigate('/admin')
            } else {
                toast.error("Failed")
            }
        })
    }

    return (
        <div className = "container mt-5">
            <div className = "row">
            <h2 style={{textAlign:'center'}}>Add Stage</h2> 
                <div className = "card col-md-6 offset-md-3 offset-md-3 mt-4">                   
                    <div className = "card-body">
                        <form>                           
                            <div className = "form-group mb-2">
                                <label className = "form-label"> Stage No : </label>
                                <input
                                    type = "text"
                                    required
                                    placeholder = "Enter stage number"
                                    name = "no"
                                    className = "form-control"
                                    value = {no}
                                    onChange = {(e) => setNo(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className = "form-group mb-2">
                                <label className = "form-label"> Stage Name : </label>
                                <input
                                    type = "text"
                                    required
                                    placeholder = "Enter stage name"
                                    name = "dirName"
                                    className = "form-control"
                                    value = {dirName}
                                    onChange = {(e) => setDirName(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className = "form-group mb-2">
                                <label className = "form-label"> Role : </label>
                                <input
                                    type = "text"
                                    required
                                    placeholder = "Enter role"
                                    name = "role"
                                    className = "form-control"
                                    value = {role}
                                    onChange = {(e) => setRole(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className = "form-group mb-2">
                                <label className = "form-label"> Previous Stage No : </label>
                                <input
                                    type = "text"
                                    required
                                    placeholder = "Enter previous stage number"
                                    name = "previousStage"
                                    className = "form-control"
                                    value = {previousStage}
                                    onChange = {(e) => setPreviousStage(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className = "form-group mb-2">
                                <label className = "form-label"> Next Stage No : </label>
                                <input
                                    type = "text"
                                    required
                                    placeholder = "Enter next stage number"
                                    name = "nextStage"
                                    className = "form-control"
                                    value = {nextStage}
                                    onChange = {(e) => setNextStage(e.target.value)}
                                >
                                </input>
                            </div>   
                            <div className='mt-3'>  
                                <button className = "btn btn-success" onClick = {(e) => addStage(e)}>Submit</button>
                                &nbsp;&nbsp;
                                <Link to="/admin" className="btn btn-danger">Cancel</Link>
                            </div>      
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}