import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';

export default function Navbars() {

  const location = useLocation();

  return (
    <Navbar variant="dark" style={{ backgroundColor: 'hsl(218, 41%, 30%)' }}>
      <Container>
        <Navbar.Brand href="/">Maker-checker</Navbar.Brand>
        <Nav>
          &nbsp;
          {location.pathname === '/login' && <Nav.Link href="/">Home</Nav.Link>}
          &nbsp;
          {location.pathname === '/' && <Nav.Link href="/login">Login</Nav.Link>}
          &nbsp;
        </Nav>
      </Container>
    </Navbar>
  );
}