import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from "axios";
import AppService from '../Service/AppService'
import Swal from 'sweetalert2';

export default function Signup() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

    const createUser = (event) => {
        event.preventDefault();
        const user = { firstName, lastName, email, role, password };
        if (user.firstName.length === 0 || user.lastName.length === 0 || user.email.length === 0 || user.role.length === 0 || user.password.length === 0) {
            toast.error("Enter information correctly")
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
                if(response.value){
                    axios.post("http://localhost:8080/admin/signup", user, header);
                    console.log(response.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Added!',
                        text: `${firstName} ${lastName}'s data has been Added.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/adduser')
                }    
            }).catch((error) => {
                toast.error("Signup failed", {autoClose:1000})
            })
        }
    }

    useEffect(() => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setRole("")
        setPassword("")
    }, [])

    return (
        <div className="container">
            <div className="row">
                <h2 style={{ textAlign: 'center' }} className="mt-5">Register</h2>
                <div className="card col-md-6 offset-md-3 offset-md-3 mt-4">
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
                                >
                                </input>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label"> Password : </label>
                                <input
                                    type="password"
                                    required
                                    placeholder="Enter password"
                                    name="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
