import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AppService from '../Service/AppService'
import styles from '../LogIn/myStyle.module.css';
import Navbars from "../Navbars/Navbars";
import Swal from 'sweetalert2';

const NewLogin = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [workflow, setWorkflow] = useState([])


    //==================Login====================

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
                        else if (username !== null) {
                            const localStorageToken = sessionStorage.getItem("access_token");
                            const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };
                            AppService.getUserInfo(header)
                                .then((response) => {
                                    if (response.status === 200) {
                                        console.log(response.data.role);
                                        // if (response.data.role === "developer") {
                                        setIsLoggedIn(true);
                                        console.log(response.data.role);
                                        setRole(response.data.role);
                                        // }
                                        // else {
                                        //     setIsLoggedIn(true);
                                        //     console.log(response.data.role);
                                        //     setRole(response.data.role);
                                        // }
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Something went wrong!',
                                            toast: true,
                                            footer: 'Please try again later',
                                            timer: 1500
                                        })
                                    }
                                })

                        }
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Invalid name or password', { autoClose: 1000 })
                })
        }
    };

    return (
        <>
            {isLoggedIn ? (
                <>
                    {role === 'developer' ? (
                        navigate("/user")
                    ) : (
                        navigate("/approver")
                    )}
                </>
            ) : (
                <div className='mt-1'>
                    <Navbars />
                    <section className={styles.backgroundRadialGradient}>
                        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                            <div className="row gx-lg-5 align-items-center mb-5">
                                <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                                    <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
                                        Welcome <br />
                                        <span style={{ color: 'hsl(218, 81%, 75%)' }}>back</span>
                                    </h1>
                                    <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
                                        It's going to be wonderful working with you again !! <br />
                                        Thanks for choosing us as your trusted platform. <br />
                                        We're glad to have you back. Ready to pick up where you left off ? <br />
                                        Welcome back! Please enter your login credentials to continue.
                                        <br />
                                        Let's get started !!
                                    </p>
                                </div>

                                <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                                    <div id={styles.radiusShape1} className="position-absolute rounded-circle shadow-5-strong"></div>
                                    <div id={styles.radiusShape2} className="position-absolute shadow-5-strong"></div>

                                    <div className={styles.bgGlass}>
                                        <div className="card-body px-4 py-5 px-md-5">
                                            <form>
                                                <div className="form-outline py-3 offset-1 col-lg-9">
                                                    <h2 style={{ fontSize: '3rem', fontWeight: 700, color: 'hsl(218, 41%, 20%)' }}>Login</h2>
                                                </div>

                                                <div className="form-row py-3">
                                                    <div className="form-outline offset-1 col-lg-9">
                                                        <label className="form-label" htmlFor='username'>Username : </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter username"
                                                            name="username"
                                                            id='username'
                                                            required
                                                            value={username}
                                                            className="form-control"
                                                            onChange={(e) => { setUsername(e.target.value) }} />
                                                    </div>

                                                </div>
                                                <div className="form-row">
                                                    <div className="form-outline offset-1 py-3 col-lg-9">
                                                        <label className="form-label" htmlFor='password'>Password : </label>
                                                        <input
                                                            type="password"
                                                            placeholder="Enter password"
                                                            name="password"
                                                            id='password'
                                                            value={password}
                                                            required
                                                            className="form-control"
                                                            onChange={(e) => { setPassword(e.target.value) }} />
                                                    </div>
                                                </div>

                                                <div className="form-row py-3">
                                                    <div className="offset-1 col-lg-10">
                                                        <div>
                                                            <button onClick={(e) => onLogin(e)} className="btn btn-primary btn-block mb-4" style={{ alignContent: "center" }}>Login</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};

export default NewLogin;
