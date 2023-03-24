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
import { useEffect } from 'react';
import Swal from 'sweetalert2';

function App() {

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
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/adduser" element={<Signup />} />
            <Route path="/addstage" element={<AddStage />} />
            <Route path="/stagelist" element={<ViewStage />} />
            <Route path="/user" element={<User />} />
            <Route path='/approver' element={<Approver />} />
            <Route path='/profile' element={<UserInfo />} />
            <Route path='/history' element={<History />} />
            <Route path='/workflow' element={<Workflow />} />
            <Route path='/login' element={<NewLogin />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />     
      </div>
      <NewFooter></NewFooter>
    </React.Fragment>
  );
}

export default App;
