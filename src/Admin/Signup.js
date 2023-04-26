import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import AdminAppService from '../Service/AdminAppService'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AdminNavbar from '../Navbars/AdminNavbar';
import { useTracking } from 'react-tracking';


export default function Signup() {

    const { trackEvent } = useTracking();

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const navigate = useNavigate()
    const username = sessionStorage.getItem("username");

    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const createUser = (event) => {
        event.preventDefault();
        const user = { firstName, lastName, email, role, mobileNumber, password };
        if (!firstName || !lastName || !email || !role || !password || !mobileNumber) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill out all the required fields.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
        else {
            Swal.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: "Do you want to Add this record ?",
                showCancelButton: true,
                confirmButtonText: 'Yes, Add it!',
                cancelButtonText: 'No, cancel!',
            })
                .then(async (response) => {
                    try {
                        const response = await AdminAppService.creteUser(user, header)
                        if (response.status === 201) {
                            Swal.fire({
                                title: 'Success!',
                                text: `${firstName} ${lastName}'s data has been Added.`,
                                icon: 'success',
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            setFirstName('');
                            setLastName('');
                            setEmail('');
                            setRole('');
                            setPassword('');
                            setMobileNumber('');

                            navigate('/adduser')
                        } else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Signup failed.',
                                icon: 'error',
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 2000,
                            });
                        }
                    }
                    catch (error) {
                        if (error.response.status === 400) {
                            Swal.fire({
                                title: 'Error!',
                                text: 'User with this email already exists.',
                                icon: 'error',
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 2000,
                            });
                        } else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Signup failed.',
                                icon: 'error',
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 2000,
                            });
                        }
                    }
                }).catch((error) => {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Signup failed.',
                        icon: 'error',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                });
        }
    }

    return (
        <div className="">
            <AdminNavbar username={username} />
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3 mt-4">
                    <div className="card-body">
                        <h2 className="card-title mb-4" style={{ textAlign: 'center' }}>Registeration</h2>
                        <hr />
                        <form>
                            <div className="form-group mb-2">
                                <label htmlFor='firstName' className="form-label"> Firstname : </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter firstname"
                                    id='firstName'
                                    name="firstName"
                                    className="form-control"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor='lastName' className="form-label"> Lastname : </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter lastname"
                                    id='lastName'
                                    name="lastName"
                                    className="form-control"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor='mobileNumber' className="form-label"> Mobile Number : </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter mobile number"
                                    id='mobileNumber'
                                    name="mobileNumber"
                                    className="form-control"
                                    value={mobileNumber}
                                    pattern="[0-9]{10}"
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor='email' className="form-label"> Email : </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter email"
                                    id='email'
                                    name="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor='password' className="form-label"> Password : </label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        placeholder="Enter password"
                                        id='password'
                                        name="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            borderTopRightRadius: '0.25rem',
                                            borderBottomRightRadius: '0.25rem',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor='role' className="form-label"> Role : </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter role"
                                    id='role'
                                    name="role"
                                    className="form-control"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                </input>
                            </div>
                            <div className="mt-3">
                                <button className="btn btn-success"
                                    onClick={(e) => {
                                        createUser(e);
                                        trackEvent({
                                            component: "Signup",
                                            event: "Clicked on user signup button",
                                            user: username,
                                            time: new Date().toLocaleString(),
                                            status: "Success"
                                        });
                                    }}>
                                    Sign Up
                                </button>
                                &nbsp;&nbsp;
                                <Link to="/admin" className="btn btn-danger"
                                    onClick={() =>
                                        trackEvent({
                                            component: 'Signup',
                                            event: 'Clicked on user signup cancel button',
                                            user: username,
                                            time: new Date().toLocaleString(),
                                            status: 'Success'
                                        })}>
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
