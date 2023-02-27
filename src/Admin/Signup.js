import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from "axios";
import Swal from 'sweetalert2';

export default function Signup() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const navigate = useNavigate()
    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

    const createUser = (event) => {
        event.preventDefault();
        const user = { firstName, lastName, email, role, password, mobileNumber };
        if (user.firstName.length === 0 || user.lastName.length === 0 || user.email.length === 0 || user.role.length === 0 || user.password.length === 0 || user.mobileNumber.length === 0) {
            toast.error("Enter information correctly", { autoClose: 1000 })
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: "Do you want to Add this record ?",
                showCancelButton: true,
                confirmButtonText: 'Yes, Add it!',
                cancelButtonText: 'No, cancel!',
            })
                .then((response) => {
                    if (response.value) {
                        axios.post("http://localhost:8080/admin/signup", user, header)
                            .then((response) => {
                                if (response.status === 200) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Added!',
                                        text: `${firstName} ${lastName}'s data has been Added.`,
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
                                    toast.error("Signup failed", { autoClose: 1000 })
                                }
                            })
                            .catch((error) => {
                                toast.error("Signup failed", { autoClose: 1000 })
                            })
                    }
                }).catch((error) => {
                    toast.error("Signup failed", { autoClose: 1000 })
                })
        }
    }

    return (
        <div className="container">
            <div className="row">
                <h2 style={{ textAlign: 'center' }} className="mt-5">Register</h2>
                <hr />
                <div className="card col-md-6 offset-md-3 offset-md-3 mt-4">
                    <div className="card-body">
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
                                <input
                                    type="password"
                                    required
                                    placeholder="Enter password"
                                    id='password'
                                    name="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                </input>
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
                                <button className="btn btn-success" onClick={(e) => createUser(e)} >Sign Up</button>
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
