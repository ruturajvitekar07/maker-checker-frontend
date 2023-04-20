import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import AdminAppService from '../Service/AdminAppService'
import Swal from 'sweetalert2';
import AdminNavbar from '../Navbars/AdminNavbar';
import { useIdleTimer } from 'react-idle-timer';
import withReactContent from 'sweetalert2-react-content';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ACTIVE, INACTIVE } from '../Constants/constants'

const MySwal = withReactContent(Swal);

export default function Admin() {

  const [users, setUsers] = useState([])
  const [status, setStatus] = useState("")
  const navigate = useNavigate()
  const username = sessionStorage.getItem("username");
  const localStorageToken = sessionStorage.getItem("access_token");
  const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isSwalOpen, setIsSwalOpen] = useState(false);

  const getTooltipText = (status) => {
    if (status === ACTIVE) {
      return 'Click to set user as Active';
    } else {
      return 'Click to set user as Inactive';
    }
  };

  const tooltip = (status) => (
    <Tooltip>{getTooltipText(status)}</Tooltip>
  );

  const { getRemainingTime, reset } = useIdleTimer({
    timeout: 1000 * 60 * 10,     // 10 minutes
    onIdle: () => {
      console.log('User is idle');
      handleLogout();     // call the logout function when the user is idle
    },
  });

  const handleOnIdle = () => {
    const remainingTime = getRemainingTime();
    if (!isSwalOpen && remainingTime < 1000 * 60 * 1 && isLoggedIn) {           // show a warning message to the user when they have 1 minute left before being logged out
      MySwal.fire({
        title: 'You have been idle for a while!',
        text: `You will be logged out in ${remainingTime / 1000} seconds`,
        showCancelButton: true,
        confirmButtonText: 'Stay logged in',
        cancelButtonText: 'Log out',
        cancelButtonColor: '#dc3545',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('User wants to stay');
          setIsSwalOpen(false);
          reset(); // reset the idle timer when the user wants to stay logged in
        } else {
          handleLogout();
        }
      });
      setIsSwalOpen(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log('User has been logged out');
    reset();                               // reset the idle timer when the user logs out
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login')
  };

  useEffect(() => {
    let intervalId;
    if (isLoggedIn) {
      intervalId = setInterval(() => {
        handleOnIdle(); // check for idle state every second
      }, 1000);
    }
    return () => clearInterval(intervalId); // clear the interval when the component unmounts or when the user logs out
  }, [isLoggedIn]);

  const getUserList = () => {
    AdminAppService.getUserList(header)
      .then((response) => {
        if (response.status === 200) {
          const sortedData = response.data.sort((a, b) => {
            if (a.firstName < b.firstName) {
              return -1;
            } else if (a.firstName > b.firstName) {
              return 1;
            } else {
              return 0;
            }
          });
          setUsers(sortedData);
        } else if (response.status === 400) {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to fetch user data',
            icon: 'Warning',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
          });
        }
      })
      .catch((error) => {
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
  };

  const deleteFile = () => {
    AdminAppService.deleteStageFile(header)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'File deleted',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000
          });
        } else if (response.status === 400) {
          Swal.fire({
            title: 'Unable to delete file',
            text: 'Please try again later.',
            icon: 'Warning',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          throw new Error('An error occurred');
        }
      })
      .catch((error) => {
        if (error.message === 'Unable to delete file') {
          toast.error('Unable to delete file', { autoClose: 1500 });
        } else {
          toast.error('An error occurred', { autoClose: 1500 });
        }
      });
  }

  const setUserStatus = async (userEmail, status) => {
    const newStatus = status === ACTIVE ? ACTIVE : INACTIVE; // Get the new status
    console.log(userEmail);
    console.log(status);
    const statusRequest = { userEmail, status };
    try {
      const response = await Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: `Do you want to change the status of ${userEmail} to ${newStatus}?`,
        showCancelButton: true,
        confirmButtonText: `Yes, change it to ${newStatus}!`,
        cancelButtonText: 'No, cancel!',
      });

      if (response.isConfirmed) {
        console.log(header);
        const result = await AdminAppService.setStatusInactive(statusRequest, header);

        if (result.status === 200) {
          getUserList();
          Swal.fire({
            icon: 'success',
            title: 'Status Changed!',
            text: `${userEmail}'s status has been changed to ${newStatus}.`,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: `Something went wrong! Failed to change the user status to ${newStatus}.`,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Bad Request! Failed to change the user status to ${newStatus}.`,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }


  // const setUserStatus = async (userEmail, status) => {
  //   const statusRequest = { userEmail, status };
  //   try {
  //     const response = await Swal.fire({
  //       icon: 'warning',
  //       title: 'Are you sure ?',
  //       text: `Do you want to change the ${userEmail} status ?`,
  //       showCancelButton: true,
  //       confirmButtonText: 'Yes, change it!',
  //       cancelButtonText: 'No, cancel!',
  //     });

  //     if (response.isConfirmed) {
  //       const result = await AdminAppService.setStatusInactive(statusRequest, header);
  //       if (result.status === 200) {
  //         getUserList();
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Status Changed!',
  //           text: `${userEmail}'s status has been changed to ${status}.`,
  //           toast: true,
  //           position: 'top-end',
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       } else {
  //         Swal.fire({
  //           icon: 'warning',
  //           title: 'Oops...',
  //           text: 'Something went wrong! Failed to change the user status to inactive',
  //           toast: true,
  //           position: 'top-end',
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 400) {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: 'Bad Request! Failed to change the user status to inactive',
  //         toast: true,
  //         position: 'top-end',
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     }
  //   }
  // }


  const deleteUser = async (username) => {
    try {
      const response = await Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      });

      if (response.isConfirmed) {
        const deleteResponse = await AdminAppService.deleteUserAccount(username, header);
        if (deleteResponse.status === 200) {
          getUserList();
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: `${username}'s data has been deleted.`,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Something went wrong! Failed to delete user',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Bad Request! Failed to delete user',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  useEffect(() => {
    getUserList()
  }, [])

  return (
    <div className=''>
      <AdminNavbar username={username} onLogout={handleLogout} />
      <div className='container-fluid mt-4 px-5'>
        <table className="table table-striped">
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th className="table-primary">Name</th>
              <th className="table-primary">Email</th>
              <th className="table-primary">Mobile</th>
              <th className="table-primary">Role</th>
              <th className="table-primary">Status</th>
              <th className="table-primary">Created Time</th>
              <th className="table-primary">Actions</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {
              users.map((user) =>
                <tr key={user.email}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileNumber}</td>
                  <td>{user.role}</td>
                  <td>{user.accountStatus}</td>
                  <td>{user.accountCreatedOn}</td>
                  <td>
                    <button className='btn btn-danger col-4' onClick={(e) => deleteUser(user.email)}>Delete</button> &nbsp;
                    <OverlayTrigger placement="right" overlay={tooltip(user.status)}>
                      {user.status === ACTIVE ?
                        <button className="btn btn-success col-5" onClick={(e) => setUserStatus(user.email, ACTIVE)}>
                          Active
                        </button>
                        :
                        <button className="btn btn-warning col-5" onClick={(e) => setUserStatus(user.email, INACTIVE)}>
                          Inactive
                        </button>
                      }
                    </OverlayTrigger>
                    {/* <button
                      className={`btn ${user.status === ACTIVE ? 'btn-success' : 'btn-warning'} col-5`}
                      onClick={(e) => setUserStatus(user.email, user.status === ACTIVE ? INACTIVE : ACTIVE)}
                    >
                      {user.status === ACTIVE ? 'Active' : 'Inactive'}
                    </button> */}
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}