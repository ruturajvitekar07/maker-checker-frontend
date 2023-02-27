import React from 'react'

export default function UserNavbar(props) {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mt-3 me-auto" style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/user">Welcome {props.username}</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                        <li className="nav-item">
                            <a className="nav-link" href='/profile'>Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={props.onClick}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
