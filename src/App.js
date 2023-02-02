import './App.css';
import Home from './Home/Home';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import LogIn from './LogIn/Login';
import Admin from './Admin/Admin';
import ViewUser from './Admin/ViewUser';
import AddStage from './Admin/AddStage';
import ViewStage from './Admin/ViewStage';
import User from './User/User'
import Approver from './User/Approver';
import Signup from './Admin/Signup';
import UserInfo from './User/UserInfo';
import History from './Admin/History';


function App() {
  return (
    <React.Fragment>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<LogIn/>} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/adduser" element={<Signup/>} />
            <Route path="/userlist" element={<ViewUser/>} />
            <Route path="/addstage" element={<AddStage/>} />
            <Route path="/stagelist" element={<ViewStage/>} />
            <Route path="/user" element={<User/>}></Route>
            <Route path='/approver' element={<Approver/>}></Route>
            <Route path='/profile' element={<UserInfo/>}></Route>
            <Route path='/history' element={<History/>}></Route>
          </Routes>
        </BrowserRouter>  
        <ToastContainer/>    
      </div>
    </React.Fragment>
  );
}

export default App;
