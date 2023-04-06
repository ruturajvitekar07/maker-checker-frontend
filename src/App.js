import './App.css';
import Home from './Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react'
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
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import Workflows from './Admin/Workflows';

function App() {

  // const [basename, setBasename] = useState('/maker-checker')

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('access_token');
      const tokenExpiration = localStorage.getItem('expires_in');
      const now = new Date().getTime() / 1000;

      if (token && tokenExpiration && now > tokenExpiration) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        Swal.fire({
          icon: 'warning',
          title: 'Session Expired',
          text: 'Please log in again.',
        }).then(() => {
          window.location.href = '/login';
        });
      }
    };
    checkTokenExpiration();
  }, []);

  return (
    <React.Fragment>
      <BrowserRouter>
        {/* <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/adduser">Signup</Link></li>
          <li><Link to="/addstage/work">Add Stage</Link></li>
          <li><Link to="/stagelist">View Stage</Link></li>
          <li><Link to="/user">User</Link></li>
          <li><Link to="/approver">Approver</Link></li>
          <li><Link to="/profile">User Info</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/workflow">Workflow</Link></li>
          <li><Link to="/login">New Login</Link></li>
          <li><Link to="/workflows">Workflows</Link></li>
        </ul> */}
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
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      <NewFooter></NewFooter>
    </React.Fragment>
  );
}

export default App;
