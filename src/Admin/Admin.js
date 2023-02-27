import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import AppService from '../Service/AppService'
import Swal from 'sweetalert2';
import AdminNavbar from '../Navbars/AdminNavbar';

export default function Admin() {

  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const username = sessionStorage.getItem("username");
  const localStorageToken = sessionStorage.getItem("access_token");
  const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

  const getUserList = () => {
    AppService.getUserList(header)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch user data");
      });
    // .then((response) => {
    //   console.log(response.data)
    //   if (response.data != null) {
    //     setUsers(response.data)
    //   } else {
    //     toast.error("failed", { autoClose: 1000 })
    //   }
    // })
  }

  const deleteFile = () => {
    AppService.deleteStageFile(header)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'File deleted',
            showConfirmButton: false,
            timer: 1000
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Unable to delete file',
            text: 'Please try again later.'
          });
        }
      })
    // .then((response) => {
    //   console.log(response.data);
    //   if (response.status === 200) {
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'File deleted',
    //       showConfirmButton: false,
    //       timer: 1000
    //     });
    //   }
    // })
  }


  const deleteUser = (username) => {
    console.log(username);
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).
      then((response) => {
        if (response.value) {
          AppService.deleteUserAccount(username, header)
            .then(
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: `${username}'s data has been deleted.`,
                showConfirmButton: false,
                timer: 1500,
              })
            )
            .catch((error) => {
              toast.warning(error);
            })
        }
      }).catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    setUsers(users.filter(user => user.username !== username));
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
    <div className="imageBack">
      <div className="col">
        <div className='mt-3'>
          <AdminNavbar username={username} onClick={onLogout} />
          <hr />
        </div>
        <div className='mt-4'>
          <table className="table table-striped">
            <thead style={{ textAlign: 'center' }}>
              <tr>
                <th className="table-primary">Name</th>
                <th className="table-primary">Email</th>
                <th className="table-primary">Role</th>
                <th className="table-primary">Action</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
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