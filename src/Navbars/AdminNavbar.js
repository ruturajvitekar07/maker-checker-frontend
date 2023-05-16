import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracking } from 'react-tracking';


export default function AdminNavbar(props) {

    const { trackEvent } = useTracking();
    // const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark mt-0" style={{ backgroundColor: 'hsl(218, 41%, 30%)' }}>
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <a className="navbar-brand" style={{ fontSize: "18px" }} href="/admin">Welcome {props.username}</a>
                </div>
                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/admin"
                            onClick={() =>
                                trackEvent({
                                    component: 'Admin',
                                    event: 'Admin-Clicked',
                                    user: props.username,
                                    time: new Date().toLocaleString(),
                                    status: 'Success'
                                })}>
                            View Users
                        </a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/stagelist"
                            onClick={() =>
                                trackEvent({
                                    component: 'View Stages',
                                    event: 'View Stages-Clicked',
                                    user: props.username,
                                    time: new Date().toLocaleString(),
                                    status: 'Success'
                                })}>
                            View Stages
                        </a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/workflows"
                            onClick={() =>
                                trackEvent({
                                    component: 'View Workflows',
                                    event: 'View Workflows-Clicked',
                                    user: props.username,
                                    time: new Date().toLocaleString(),
                                    status: 'Success'
                                })}>
                            View Workflows
                        </a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/workflow"
                            onClick={() =>
                                trackEvent({
                                    component: 'Add Workflow',
                                    event: 'Add Workflow-Clicked',
                                    user: props.username,
                                    time: new Date().toLocaleString(),
                                    status: 'Success'
                                })}>
                            Add Workflow
                        </a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/adduser"
                            onClick={() =>
                                trackEvent({
                                    component: 'Add User',
                                    event: 'Add User-Clicked',
                                    user: props.username,
                                    time: new Date().toLocaleString(),
                                    status: 'Success'
                                })}>
                            Add User
                        </a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/history"
                            onClick={() =>
                                trackEvent({
                                    component: 'History',
                                    event: 'History-Clicked',
                                    user: props.username,
                                    time: new Date().toLocaleString(),
                                    status: 'Success'
                                })}>
                            History
                        </a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" style={{ cursor: 'pointer' }} onClick={props.onLogout}>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}



