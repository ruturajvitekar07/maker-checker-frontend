import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function UserNavbar(props) {

    // const navigate = useNavigate()

    // const onLogout = () => {
    //     sessionStorage.clear();
    //     localStorage.clear();
    //     navigate('/login')
    // }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark me-auto ml-lg-2" style={{ backgroundColor: 'hsl(218, 41%, 30%)' }}>
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <a className="navbar-brand" style={{ fontSize: "18px" }} href="/user">Welcome {props.username}</a>
                </div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                    <li className="nav-item">
                        <a className="nav-link" href='/profile'>Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" style={{cursor: 'pointer'}} onClick={props.onLogout}>Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
