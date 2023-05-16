import React, { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useNavigate } from 'react-router-dom';
import { useTracking } from 'react-tracking';
import Swal from 'sweetalert2';
import useAuth from '../LogIn/auth';
import UserNavbar from '../Navbars/UserNavbar';
import UserAppService from '../Service/UserAppService';
import IdleTimeout from '../Utility/IdleTimeout';

export default function UserInfo() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const username = sessionStorage.getItem("username");
    const access_token = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${access_token}` } };
    const { isSwalOpen, setIsSwalOpen, isLoggedIn, setIsLoggedIn } = useAuth();
    const { trackEvent } = useTracking();
    const navigate = useNavigate();

    const { reset } = useIdleTimer({
        timeout: 1000 * 60 * 5
    });

    const handleLogout = () => {
        trackEvent({
            component: "Admin",
            event: "Clicked on logout button",
            user: username,
            time: new Date().toLocaleString(),
            status: "Success"
        });
        setIsLoggedIn(false);
        console.log('User has been logged out');
        reset();
        sessionStorage.clear();
        localStorage.clear();
        navigate('/login')
    };

    useEffect(() => {
        UserAppService.getUserInfo(header)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                    setRole(response.data.role);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Unable to fecth data",
                        toast: true,
                        position: "top-end",
                        timer: 1500,
                    });
                }
            }).catch((error) => {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred while fetching user info.",
                    toast: true,
                    position: "top-end",
                    timer: 1500,
                });
            })

    }, [])

    return (
        <div>
            <IdleTimeout/>
            <UserNavbar username={username} onLogout={handleLogout} />
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3 mt-4">
                    <div className="card-body">
                        <h2 className="card-title mb-4" style={{ textAlign: 'center' }}>Profile</h2>
                        <hr />
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
