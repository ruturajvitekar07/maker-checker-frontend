import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';

export default function Navbars() {

  const location = useLocation();

  return (
     <div>
      <Navbar variant="dark" style={{backgroundColor:'hsl(218, 41%, 30%)'}}>
        <Container>
          <Navbar.Brand href="/">Maker-checker</Navbar.Brand>
          <Nav className="ml-lg-2">
            &nbsp;
            &nbsp;
            {location.pathname === '/login' && <Nav.Link href="/">Home</Nav.Link>}
            &nbsp;
            &nbsp;
            {location.pathname === '/' && <Nav.Link href="/login">Login</Nav.Link>}
            &nbsp;
            &nbsp;
            <Nav.Link href="/about">About Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div> 
  );
}