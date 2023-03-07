import './App.css';
import Home from './Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import Login1 from './LogIn/Login1';
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
import Example from './Home/Exampe';
import ApprovedFiles from './User/ApprovedFiles';
import NewFooter from './Navbars/NewFooter';
import Demo from './Home/Demo'
import Form1 from './Home/Form1';
import Carousel from './Home/Carousel';

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            {/* <Route path="/login" element={<LogIn/>} /> */}
            <Route path="/admin" element={<Admin/>} />
            <Route path="/adduser" element={<Signup/>} />
            <Route path="/addstage" element={<AddStage/>} />
            <Route path="/stagelist" element={<ViewStage/>} />
            <Route path="/user" element={<User/>}/>
            <Route path='/approver' element={<Approver/>}/>
            <Route path='/profile' element={<UserInfo/>}/>
            <Route path='/history' element={<History/>}/>
            <Route path='/workflow' element={<Workflow/>}/>
            <Route path='/example' element={<Example/>}/>
            <Route path='/demo' element={<Demo/>}/>
            <Route path='/login' element={<NewLogin/>}/>
            {/* <Route path='/login1' element={<Login1/>}/> */}
            <Route path='/approvedfiles' element={<ApprovedFiles/>}/>
            {/* <Route path='/form1' element={<Form1/>}/> */}
            {/* <Route path='/car' element={<Carousel/>}/> */}
          </Routes>
        </BrowserRouter>  
        <ToastContainer/>
        <NewFooter></NewFooter>    
      </div>
    </React.Fragment>
  );
}

export default App;
