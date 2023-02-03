import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AppService from '../Service/AppService'
import { Link } from 'react-router-dom'


export default function ViewStage() {

  const [stages, setStages] = useState([])
  const localStorageToken = sessionStorage.getItem("access_token");
  const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

  const getStages = () => {
    AppService.getStageList(header).then((response) => {
      console.log(response.data)
      if (response.data != null) {
        setStages(response.data)
      } else {
        toast.error("Failed", { autoClose: 1000 })
      }
    })
  }

  useEffect(() => {
    getStages()
  }, [])

  return (
    <div className="container">
      <div className='mt-5'>
        <h2 style={{ textAlign: 'center' }} >Stages</h2>
      </div>
      <hr/>
      <div className='mt-4'>
        <table className="table table-striped">
          <thead style={{ textAlign: 'center' }}>
            <tr>
              <th className="table-primary">Stage No</th>
              <th className="table-primary">Name</th>
              <th className="table-primary">Role</th>
              <th className="table-primary">Previous Stage</th>
              <th className="table-primary">Next Stage</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: 'center' }}>
            {
              stages.map((stage) =>
                <tr key={stage.no}>
                  <td>{stage.no}</td>
                  <td>{stage.name}</td>
                  <td>{stage.role}</td>
                  <td>{stage.previousStage}</td>
                  <td>{stage.nextStage}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <div className='my-lg-2' style={{ alignContent: 'center', alignItems: 'center' }}>
        <Link to="/addstage">
          <a className="btn btn-primary">Add Stage</a>
        </Link>
        &nbsp;
        &nbsp;
        <Link to="/admin">
          <a className="btn btn-danger">Back</a>
        </Link>
      </div>
    </div>
  )
}