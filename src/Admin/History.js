import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import AppService from '../Service/AppService'
import 'react-toastify/dist/ReactToastify.css';

export default function History() {
  const [history, setHistory] = useState([])
  const [filename, setFilename] = useState('')
  const [stageName, setStageName] = useState('')
  const [modifiedDate, setModifiedDate] = useState('')
  const username = sessionStorage.getItem('username');
  const localStorageToken = sessionStorage.getItem("access_token");
  const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

  const getHistory = () => {
    AppService.getHistory(header)
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
        <h2 style={{ textAlign: 'center' }} >History</h2>
      </div>
      <div className='mt-4'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="table-primary">Filename</th>
              <th className="table-primary">Last Modified</th>
              <th className="table-primary">Stage Name</th>
            </tr>
          </thead>
          <tbody>
            {
              history.map((hdata) =>
                <tr key={hdata.timestamp}>
                  <td>{hdata.filename}</td>
                  <td>{hdata.modifiedDate}</td>
                  <td>{hdata.stageName}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <div className='my-lg-2' style={{ alignContent: 'center', alignItems: 'center' }}>
        {/* <Link to="/addstage">
          <a className="btn btn-primary">Add Stage</a>
        </Link>
        &nbsp;
        &nbsp;
        <Link to="/admin">
          <a className="btn btn-danger">Back</a>
        </Link> */}
        <Link to="/admin">
          <a className="btn btn-danger">Back</a>
        </Link>
      </div>
    </div>
  )
}
