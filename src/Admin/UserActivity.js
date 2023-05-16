import { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useTracking } from 'react-tracking';
import Swal from 'sweetalert2';
import useAuth from '../LogIn/auth';
import AdminNavbar from '../Navbars/AdminNavbar';
import AdminAppService from '../Service/AdminAppService';
import IdleTimeout from '../Utility/IdleTimeout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function UserActivity() {

    const [activity, setActivity] = useState([])
    const [additionalActivity, setAdditionalActivity] = useState([]);
    const { trackEvent } = useTracking();
    const { isSwalOpen, setIsSwalOpen, isLoggedIn, setIsLoggedIn } = useAuth();
    const [showAdditionalData, setShowAdditionalData] = useState(false);
    const username = sessionStorage.getItem("username");
    const access_token = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${access_token}` } };
    const { user } = useParams();
    const navigate = useNavigate();

    const toggleAdditionalData = () => {
        setShowAdditionalData(!showAdditionalData);
    };

    const { reset } = useIdleTimer({
        timeout: 1000 * 60 * 10,
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

    const getAdditionalActivityData = () => {
        const user1 = { user };
        AdminAppService.getTrackingData(user1, header)
            .then(response => {
                console.log(response.data);
                setAdditionalActivity(response.data)
            })
            .catch((error) => {
                console.log(error);
                if (error.message === 'Failed to fetch user data') {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to fetch user data',
                        icon: 'Error',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    toast.error('An error occurred', { autoClose: 1500 });
                }
            });
    }

    const getLoginLogoutInfo = () => {
        AdminAppService.getLoginLogoutDetails(user, header)
            .then(response => {
                console.log(response.data);
                setActivity(response.data)
            })
            .catch((error) => {
                console.log(error);
                if (error.message === 'Failed to fetch user data') {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to fetch user data',
                        icon: 'Error',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    toast.error('An error occurred', { autoClose: 1500 });
                }
            });
    }

    useEffect(() => {
        getLoginLogoutInfo();
        getAdditionalActivityData();
    })

    return (
        <div>
            <IdleTimeout />
            <AdminNavbar username={username} onLogout={handleLogout} />
            <h2 className='mt-3' style={{ textAlign: "center" }}>Activity Data</h2>
            <div className='container-fluid mt-4 px-5 col-8 offset-2'>
                {/* <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        placeholderText="Select a date"
                        dateFormat="dd/MM/yyyy"
                    />
                </div> */}
                <table className="table table-striped">
                    <thead style={{ textAlign: "center" }}>
                        <tr>
                            <th className="table-primary">Username</th>
                            <th className="table-primary">Activity</th>
                            <th className="table-primary">Time</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                        {
                            activity && activity.length > 0 ?
                                activity
                                    // .filter(act => selectedDate ? act.time.includes(selectedDate) : true)
                                    .map(act => (
                                        <tr key={act.time}>
                                            <td>{act.username}</td>
                                            <td>{act.activity}</td>
                                            <td>{act.time}</td>
                                        </tr>
                                    )) :
                                <tr>
                                    <td colSpan="3" style={{ textAlign: "center", fontWeight: "bold" }}>
                                        Activity data is not present for {user} user.
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className='mt-4'>
                <IdleTimeout />
                <div className='col-10 offset-1 text-center'>
                    <button className="btn btn-primary mb-2" onClick={toggleAdditionalData}>
                        {showAdditionalData ? 'Hide Additional Data' : 'Show Additional Data'}
                    </button>
                    {
                        showAdditionalData && (
                            <div className='mt-4'>
                                <h3>Additional Data</h3>
                                <table className="table table-striped">
                                    <thead style={{ textAlign: "center" }}>
                                        <tr>
                                            <th className="table-primary">Component</th>
                                            <th className="table-primary">Event</th>
                                            <th className="table-primary">User</th>
                                            <th className="table-primary">Time</th>
                                            <th className="table-primary">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ textAlign: "center" }}>
                                        {
                                            additionalActivity && additionalActivity.length > 0 ?
                                                additionalActivity
                                                    .map((act1, index) => (
                                                        <tr key={index}>
                                                            <td>{act1.component}</td>
                                                            <td>{act1.event}</td>
                                                            <td>{act1.user}</td>
                                                            <td>{act1.time}</td>
                                                            <td>{act1.status}</td>
                                                        </tr>
                                                    )) :
                                                <tr>
                                                    <td colSpan="5" style={{ textAlign: "center", fontWeight: "bold" }}>
                                                        Activity data is not present for {user} user.
                                                    </td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
