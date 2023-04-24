import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuditLogging } from '../Utility/useAuditLogging';

export default function AdminNavbar(props) {

    // const username = props.username;

    const navigate = useNavigate();
    const [view_users, setUser] = useAuditLogging();
    const [view_stages, _] = useAuditLogging();
    const [view_workflows, __] = useAuditLogging();
    const [add_workflows, ___] = useAuditLogging();
    const [add_users, ____] = useAuditLogging();
    const [view_history, _____] = useAuditLogging();
    // const onLogout = () => {
    //     sessionStorage.removeItem('access_token')
    //     localStorage.removeItem('access_token')
    //     sessionStorage.removeItem('username')
    //     localStorage.removeItem('username')
    //     navigate('/login')
    // }

    const viewUsers = () => {
        view_users('View users', 'success')
    }

    const viewStages = () => {
        view_stages('View stages', 'success')
    }

    const viewWorkflows = () => {
        view_workflows('View workflows', 'success')
    }

    const addWorkflows = () => {
        add_workflows('Add workflows', 'success')
    }

    const addUser = () => {
        add_users('Add user', 'success')
    }

    const viewHistory = () => {
        view_history('View history', 'success')
    }

    useEffect(() => {
        setUser({ name: props.username });
    }, [props.username, setUser]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark mt-0" style={{ backgroundColor: 'hsl(218, 41%, 30%)' }}>
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <a className="navbar-brand" style={{ fontSize: "18px" }} href="/admin">Welcome {props.username}</a>
                </div>
                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/admin" onClick={viewUsers}>View Users</a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/stagelist" onClick={viewStages}>View Stages</a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/workflows" onClick={viewWorkflows}>View Workflows</a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/workflow" onClick={addWorkflows}>Add Workflow</a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/adduser" onClick={addUser}>Add User</a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/history" onClick={viewHistory}>History</a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" style={{ cursor: 'pointer' }} onClick={props.onLogout}>Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}



