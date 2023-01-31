import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AppService from '../Service/AppService'


export default function ViewStage() {

  const [stages, setStages] = useState([])
  const localStorageToken = localStorage.getItem("access_token");
  const header = { headers: {"Authorization" : `Bearer ${localStorageToken}`} };

  const getStages = () => {
    AppService.getStageList(header).then((response) => {
      console.log(response.data)
      if (response.data != null) {
        setStages(response.data)
      } else {
        toast.error("Failed")
      }
    })
  }


  useEffect(() => {
    getStages()
  }, [])

  return (
    <div className="imageBack">
      <div className="col">
        <div className='mt-5'>
          <h2 style={{textAlign:'center'}} >Stages</h2> 
        </div>
        <div className='mt-4'>
          <table className="table table-striped">
              <thead style={{textAlign:'center'}}>
                <tr>
                  <th className="table-primary">Stage No</th>
                  <th className="table-primary">Name</th>
                  <th className="table-primary">Role</th>
                  <th className="table-primary">Previous Stage</th>
                  <th className="table-primary">Next Stage</th>
                </tr>
              </thead>
              <tbody style={{textAlign:'center'}}>
                {
                  stages.map( (stage) => 
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
      </div>
   </div>
  )
}