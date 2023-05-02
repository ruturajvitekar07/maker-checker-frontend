import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AdminAppService from '../Service/AdminAppService'
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";
import AdminNavbar from '../Navbars/AdminNavbar';
import { useTracking } from 'react-tracking';

export default function UserActivity() {

    const [activity, setActivity] = useState([])
    const { trackEvent } = useTracking();

    const username = sessionStorage.getItem("username");
    const localStorageToken = sessionStorage.getItem("access_token");
    const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };
    const { user } = useParams();

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
        getLoginLogoutInfo()
    })


    return (
        <div>
            <AdminNavbar username={username} />
            <h2 className='mt-3' style={{ textAlign: "center" }}>Activity Data</h2>
            <div className='container-fluid mt-4 px-5 col-8 offset-2'>
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
                                activity.map(act => (
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
        </div>
    )
}
