import './App.css';
import Home from './Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import NewLogin from './LogIn/NewLogin';
import Admin from './Admin/Admin';
import AddStage from './Admin/AddStage';
import ViewStage from './Admin/ViewStage';
import User from './User/User'
import Approver from './User/Approver';
import Signup from './Admin/Signup';
import UserInfo from './User/UserInfo';
import History from './Admin/History';
import Workflow from './Admin/Workflow';
import NewFooter from './Navbars/NewFooter';
import Workflows from './Admin/Workflows';
import track from 'react-tracking';
import UserActivity from './Admin/UserActivity';
import UserAppService from '../src/Service/UserAppService';

function App() {

  return (
    <React.Fragment>
      <Router basename='/maker-checker'>
        <Routes>
          <Route basename='/maker-checker' exact path="/" element={<Home />} />
          <Route basename='/maker-checker' path="/admin" element={<Admin />} />
          <Route basename='/maker-checker' path="/adduser" element={<Signup />} />
          <Route basename='/maker-checker' path="/addstage/:work" element={<AddStage />} />
          <Route basename='/maker-checker' path="/stagelist" element={<ViewStage />} />
          <Route basename='/maker-checker' path="/user" element={<User />} />
          <Route basename='/maker-checker' path='/approver' element={<Approver />} />
          <Route basename='/maker-checker' path='/profile' element={<UserInfo />} />
          <Route basename='/maker-checker' path='/history' element={<History />} />
          <Route basename='/maker-checker' path='/workflow' element={<Workflow />} />
          <Route basename='/maker-checker' path='/login' element={<NewLogin />} />
          <Route basename='/maker-checker' path='/workflows' element={<Workflows />} />
          <Route basename='/maker-checker' path="/activity/:user" element={<UserActivity />} />
        </Routes>
      </Router>
      <ToastContainer />
      <NewFooter></NewFooter>
    </React.Fragment>
  );
}

const localStorageToken = sessionStorage.getItem("access_token");
const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

// const TrackedApp = track({
//   // Your tracking data object goes here
//   app: 'Macker-Checker',
// })(
//   App
// );


const TrackedAndDispatchedApp = track(
  { app: 'Macker-Checker' },
  {
    // Your dispatch function goes here
    dispatch: (data) => {
      console.log(data);
      console.log(header);
      if(data){
        UserAppService.setUsersActivities(data, header)
        .then((response) => {
          console.log('Data sent to server');
          console.log(response.data);
        })
        .catch((error) => {
          console.log('Data not sent to server');
          console.log(error);
        })
      }  
    }
  }
)(App);

export default TrackedAndDispatchedApp;
// export default App;
