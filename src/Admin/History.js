import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppService from '../Service/AppService'

export default function History() {
  const [history, setHistory] = useState([])
  const localStorageToken = sessionStorage.getItem("access_token");
  const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

  const getHistory = () => {
    AppService.getAllHistory(header)
      .then((response) => {
        console.log(response.data);
        setHistory(response.data)
      })
  }

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
