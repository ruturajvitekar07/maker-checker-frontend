import React from 'react'

export default function AdminNavbar(props) {

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary mt-3 me-auto">
            <div class="container-fluid">
                <a class="navbar-brand" href="/admin">{props.username}</a>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="/history">History</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/stagelist">View Stages</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/workflow">Add Workflow</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/addstage">Add Stage</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/adduser">Add User</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onClick={props.onClick}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
