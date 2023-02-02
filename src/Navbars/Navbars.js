import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
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
          </Nav>
        </Container>
      </Navbar>
    </div> 
  );
}