import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminAppService from '../Service/AdminAppService'
import Swal from 'sweetalert2';

export default function History() {
  const [history, setHistory] = useState([])
  const localStorageToken = sessionStorage.getItem("access_token");
  const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };


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
        if (error.response && error.response.status === 400) {
          Swal.fire({
            icon: 'Error',
            title: 'Error',
            toast: true,
            position: 'top-end',
            text: 'Unable to retrieve history data',
            timer: 3000
          });
        }
      });
  };

  useEffect(() => {
    getHistory()
  }, [])

  return (
    <div className="container">
      <div className='mt-5'>
        <h2 style={{ textAlign: 'center' }}>History</h2>
      </div>
      <hr />
      <div className='mt-4'>
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
            {
              history.map((hdata) =>
                <tr key={hdata.timestamp}>
                  <td>{hdata.fileName}</td>
                  <td>{hdata.timeStamp}</td>
                  <td>{hdata.stageName}</td>
                  <td>{hdata.status}</td>
                  <td>{hdata.userName}</td>
                  <td>{hdata.roleOfChecker}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <div className='my-lg-2' style={{ alignContent: 'center', alignItems: 'center' }}>
        <Link to="/admin">
          <a className="btn btn-danger" style={{ float: 'right' }}>Back</a>
        </Link>
      </div>
    </div>
  )
}
