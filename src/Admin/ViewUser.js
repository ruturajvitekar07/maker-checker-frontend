import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AppService from '../Service/AppService'


export default function ViewUser() {

  const [users, setUsers] = useState([])
  const username = sessionStorage.getItem('username');
  const localStorageToken = sessionStorage.getItem("access_token");
  const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

  const usersList = () => {
    AppService.getUserList().then((response) => {
      const result = response.data
      console.log(response.data)
      if (response.data != null) {
        setUsers(response.data)
      } else {
        toast.error("error")
      }
    })
  }

  const deleteAccount = (username) => {
    AppService.deleteAccount(username, header)
    .then((response) => {
      console.log(response.data);
      toast.success("Account deleted")
    })
  }

  useEffect(() => {
    usersList()
  }, [])

  return (
    <div
      className="imageBack">
      <div className="col">
        <div >
          <h2 class="title">Users</h2>
        </div>
        <br></br>
        <br></br>
        <div >
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="table-primary">User Name</th>
                <th className="table-primary">Email</th>
                <th className="table-primary">Role</th>
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
                      <button className='btn btn-success' onClick={(e) => deleteAccount(user.email)}>Delete</button>
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