import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserAppService from '../Service/UserAppService'

export default function UserInfo() {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    useEffect(() => {
        const localStorageToken = sessionStorage.getItem("access_token");
        const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };
        UserAppService.getUserInfo(header)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setFirstName(response.data.firstName)
                    setLastName(response.data.lastName)
                    setEmail(response.data.email)
                    setRole(response.data.role)
                } else {
                    toast.error("Data not stored", { autoClose: 1000 });
                }
            })
    }, [])


    return (
        <div className="container">
            <div className="row">
                <h2 style={{ textAlign: 'center' }} className="mt-5">Profile</h2>
                <hr />
                <div className="card col-md-6 offset-md-3 offset-md-3 mt-3">
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label"> Firstname : </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter firstname"
                                    name="firstName"
                                    className="form-control"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    disabled
                                >
                                </input>
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label"> Lastname : </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter lastname"
                                    name="lastName"
                                    className="form-control"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    disabled
                                >
                                </input>
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label"> Email : </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter email"
                                    name="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled
                                >
                                </input>
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label"> Role : </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter role"
                                    name="role"
                                    className="form-control"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    disabled
                                >
                                </input>
                            </div>
{/* 
                            <div>
                                <button className='btn btn-danger' onClick={() => navigate("/user")}>Back</button>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
