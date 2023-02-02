import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import AppService from '../Service/AppService'

export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    const onLogin = (e) => {
        e.preventDefault();
        const userCredentials = { username, password }
        if (username.length == 0) {
            toast.warning('Please Enter username', { autoClose: 1000 })
        } else if (password.length == 0) {
            toast.warning('Please Enter Password', { autoClose: 1000 })
        } else {
            AppService.signin(userCredentials)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success('Welcome to my Application', { autoClose: 1000 })
                        const access_token = response.data.access_token
                        const username = response.data.username
                        sessionStorage.setItem("access_token", access_token);
                        sessionStorage.setItem("username", username)
                        sessionStorage['access_token'] = access_token
                        sessionStorage['username'] = username
                        if (username == "ADMIN")
                            navigate('/admin')
                        else {
                            const localStorageToken = sessionStorage.getItem("access_token");
                            const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };
                            AppService.getUserInfo(username, header)
                                .then((response) => {
                                    if (response.status === 200) {
                                        if (response.data.role === "developer") {
                                            navigate('/user')
                                        }
                                        else {
                                            navigate('/approver')
                                        }
                                        console.log("Data stored into user");
                                    } else {
                                        toast.error("Data not stored", { autoClose: 1000 });
                                    }
                                })
                        }
                    }
                    else {
                        toast.error('Invalid name or password', { autoClose: 1000 })
                    }
                })
        }
    }

    const goHome = () => {
        navigate('/')
    }

    return (
        <div className="container-fluid col-8 offset-2 mt-5">
            <div className="row g-0 col-12" style={{ padding: 0, margin: 0, boxSizing: "border-box"}}>
                <div className="col-5">
                    <img src={require('../Images/welcome.jpg')} className="img-fluid" alt="Maker-Checker" style={{ height: '500px', width: '900px', borderTopLeftRadius: '17px', borderBottomLeftRadius: '17px' }} onClick={goHome}/>
                </div>
                <div className="col-7 py-5">
                    <h2 className="ml-4" style={{ textAlign: "center", fontSize: '4rem', fontWeight: 700 }}>Login</h2>
                    {/* <form> */}
                    <div className="form-row py-3 pt-5">
                        <div className="offset-1 col-lg-10">
                            <input
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                required
                                value={username}
                                className="form-control"
                                onChange={(e) => { setUsername(e.target.value) }} />
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="offset-1 py-3 col-lg-10">
                            <input
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={password}
                                required
                                className="form-control"
                                onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                    </div>

                    <div className="form-row py-3">
                        <div className="offset-1 col-lg-10">
                            <div>
                                {/* <p>Don't have an account? Register <Link to={"/adduser"}>here</Link></p> */}
                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; <button onClick={(e) => onLogin(e)} className="btn btn-success col-4" style={{ alignContent: "center" }}>Login</button>
                            </div>
                        </div>
                    </div>
                    {/* </form> */}
                </div>
            </div>
        </div>
    )
}