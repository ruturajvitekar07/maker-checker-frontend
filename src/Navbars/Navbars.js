import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';
import { useAuditLogging } from '../Utility/useAuditLogging';

export default function Navbars() {

  const location = useLocation();
  const [clickHome, setUser] = useAuditLogging();
  const [clickLogin, _] = useAuditLogging();

  const handleHomeClick = () => {
    setUser()
    clickHome('Visited the Home page', 'success');
  }

  const handleLoginClick = () => {
    setUser()
    clickLogin('Visited the Login page', 'success');
  }

  return (
    <Navbar variant="dark" style={{ backgroundColor: 'hsl(218, 41%, 30%)' }}>
      <Container>
        <Navbar.Brand href="/">Maker-checker</Navbar.Brand>
        <Nav>
          &nbsp;
          {location.pathname === '/login' && <Nav.Link href="/" onClick={handleHomeClick}>Home</Nav.Link>}
          &nbsp;
          {location.pathname === '/' && <Nav.Link href="/login" onClick={handleLoginClick}>Login</Nav.Link>}
          &nbsp;
        </Nav>
      </Container>
    </Navbar>
  );
}