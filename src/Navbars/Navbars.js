import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Navbars() {
  return (
     <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Maker-checker</Navbar.Brand>
          <Nav className="ml-lg-2">
            &nbsp;
            &nbsp;
            <Nav.Link href="/">Home</Nav.Link>
            &nbsp;
            &nbsp;
            <Nav.Link href="/login">Login</Nav.Link>
            &nbsp;
            &nbsp;
            <Nav.Link href="/adduser">Sign Up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div> 
      
    // <div className='container p-2'>
    //   <div className='mx-auto'>
    //   <nav className="navbar navbar-dark bg-primary">
    //     <div class="container">
    //       <a class="navbar-brand" href="/">Maker-Checker</a>
    //     </div>
    //     <form className="form-inline">
    //       <Link to="/adduser" className="btn btn-outline-success my-2 my-sm-0" >Sign Up</Link>
    //     </form>
    //   </nav>
    //   </div>
    // </div>
  );
}