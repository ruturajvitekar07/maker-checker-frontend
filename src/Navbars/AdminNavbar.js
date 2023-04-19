import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function AdminNavbar(props) {

    const navigate = useNavigate()

    // const onLogout = () => {
    //     sessionStorage.removeItem('access_token')
    //     localStorage.removeItem('access_token')
    //     sessionStorage.removeItem('username')
    //     localStorage.removeItem('username')
    //     navigate('/login')
    // }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark mt-0" style={{ backgroundColor: 'hsl(218, 41%, 30%)' }}>
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <a className="navbar-brand" style={{ fontSize: "18px" }} href="/admin">Welcome {props.username}</a>
                </div>
                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/admin">View Users</a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/stagelist">View Stages</a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/workflows">View Workflows</a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/workflow">Add Workflow</a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/adduser">Add User</a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/history">History</a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" style={{ cursor: 'pointer' }} onClick={props.onLogout}>Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}



