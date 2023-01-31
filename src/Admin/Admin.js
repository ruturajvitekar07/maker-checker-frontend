import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import AppService from '../Service/AppService'

export default function Admin() {

  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const localStorageToken = sessionStorage.getItem("access_token");
  const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

  const getUserList = () => {
    AppService.getUserList(header)
      .then((response) => {
        console.log(response.data)
        if (response.data != null) {
          setUsers(response.data)
        } else {
          toast.error("failed")
        }
      })
  }

  const deleteFile = () => {
    AppService.deleteStageFile(header)
      .then((response) => {
        console.log(response.data);
        toast.success("File deleted")
      })
  }

  const deleteUser = (username) => {
    console.log(username);
    AppService.deleteUserAccount(username,header)
      .then((response) => {
        console.log(response.data);
        toast.success("Account deleted")
        navigate('/admin')
      })
  }

  const onLogout = () => {
    sessionStorage.removeItem('access_token')
    localStorage.removeItem('access_token')
    sessionStorage.removeItem('username')
    localStorage.removeItem('username')
    navigate('/login')
  }

  useEffect(() => {
    getUserList()
  }, [])

  return (
    <div className="imageBack">
      <div className="col">
        <div className='mt-5'>
          <h2 className="title mt-5" style={{ textAlign: 'center' }}>Admin Console</h2>
          <div className='mt-4'>
            {/* <Link to="/userlist">
              <a className="btn btn-primary">View Users</a>
            </Link>
            &nbsp;
            &nbsp;
            <Link to="/addstage">
              <a className="btn btn-primary">Create Stage</a>
            </Link>
            &nbsp;
            &nbsp; */}
            <Link to="/stagelist">
              <a className="btn btn-primary">View Stages</a>
            </Link>
            &nbsp;
            &nbsp;
            <Link to="/adduser">
              <a className="btn btn-primary">Add User</a>
            </Link>
            &nbsp;
            &nbsp;
            {/* <button className='btn btn-primary' onClick={deleteFile}>Delete Stagefile</button> */}
            <div className='my-lg-2'>
              <button className='btn btn-primary' onClick={onLogout}>Logout</button>
            </div>
          </div>
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