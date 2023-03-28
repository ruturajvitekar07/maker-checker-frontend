import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import AdminAppService from '../Service/AdminAppService'
import Swal from 'sweetalert2';
import AdminNavbar from '../Navbars/AdminNavbar';

export default function Admin() {

  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const username = sessionStorage.getItem("username");
  const localStorageToken = sessionStorage.getItem("access_token");
  const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

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
      } else {
        toast.warning(error.message, { autoClose: 1500 });
      }
    }
  };


  useEffect(() => {
    getUserList()
  }, [])

  const onLogout = () => {
    sessionStorage.removeItem('access_token')
    localStorage.removeItem('access_token')
    sessionStorage.removeItem('username')
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <div className="">
      <div className="col">
        <div className='mt-3'>
          <AdminNavbar username={username} onClick={onLogout} />
          {/* <hr /> */}
        </div>
        <div className='mt-4 col-10 offset-1'>
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="table-primary">Name</th>
                <th className="table-primary">Email</th>
                <th className="table-primary">Role</th>
                <th className="table-primary">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user) =>
                  <tr key={user.email}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className='btn btn-danger col-7' onClick={(e) => deleteUser(user.email)}>Delete</button>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}