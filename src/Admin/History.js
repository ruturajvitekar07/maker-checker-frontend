import React, { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useNavigate } from 'react-router-dom';
import { useTracking } from 'react-tracking';
import Swal from 'sweetalert2';
import useAuth from '../LogIn/auth';
import AdminNavbar from '../Navbars/AdminNavbar';
import AdminAppService from '../Service/AdminAppService';
import IdleTimeout from '../Utility/IdleTimeout';

export default function History() {

  const { trackEvent } = useTracking();
  const [history, setHistory] = useState([])
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const access_token = sessionStorage.getItem("access_token");
  const header = { headers: { "Authorization": `Bearer ${access_token}` } };

  const { isSwalOpen, setIsSwalOpen, isLoggedIn, setIsLoggedIn } = useAuth();

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

  const getHistory = () => {
    AdminAppService.getAllHistory(header)
      .then((response) => {
        if (response.status === 200) {
          setHistory(response.data);
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Error',
            toast: true,
            position: 'top-end',
            text: 'Failed to get history data',
            timer: 3000
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        if (error.response && error.response.status === 400) {

          Swal.fire({
            icon: 'Error',
            title: 'Error',
            toast: true,
            position: 'top-end',
            text: error.response.data.message,
            timer: 3000
          });
        }
      });
  };

  useEffect(() => {
    getHistory()
  }, [])

  return (
    <div className="">
      <IdleTimeout/>
      <AdminNavbar username={username} onLogout={handleLogout} />
      <div className='mt-3'>
        <h2 style={{ textAlign: 'center' }}>History</h2>
      </div>
      <hr />
      <div className='mt-4 col-10 offset-1'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="table-primary">Filename</th>
              <th className="table-primary">Last Modified</th>
              <th className="table-primary">Stage</th>
              <th className="table-primary">Status</th>
              <th className="table-primary">Checker Name</th>
              <th className="table-primary">Checker Role</th>
            </tr>
          </thead>
          <tbody>
            {history && history.length > 0 ?
              history.map((hdata) =>
                <tr key={hdata.timestamp}>
                  <td>{hdata.fileName}</td>
                  <td>{hdata.timeStamp}</td>
                  <td>{hdata.stageName}</td>
                  <td>{hdata.status}</td>
                  <td>{hdata.userName}</td>
                  <td>{hdata.roleOfChecker}</td>
                </tr>
              ) :
              <tr>
                <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>
                  History is not present
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
