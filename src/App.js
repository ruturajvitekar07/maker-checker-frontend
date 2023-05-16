import './App.css';
import Home from './Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adduser" element={<Signup />} />
          <Route path="/addstage/:work" element={<AddStage />} />
          <Route path="/stagelist" element={<ViewStage />} />
          <Route path="/user" element={<User />} />
          <Route path='/approver' element={<Approver />} />
          <Route path='/profile' element={<UserInfo />} />
          <Route path='/history' element={<History />} />
          <Route path='/workflow' element={<Workflow />} />
          <Route path='/login' element={<NewLogin />} />
          <Route path='/workflows' element={<Workflows />} />
          <Route path="/activity/:user" element={<UserActivity />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      <NewFooter></NewFooter>
    </React.Fragment>
  );
}

const localStorageToken = sessionStorage.getItem("access_token");
const header = { headers: { "Authorization": `Bearer ${localStorageToken}` } };

const TrackedApp = track({
  // Your tracking data object goes here
  app: 'Macker-Checker',
})(
  App
);


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
