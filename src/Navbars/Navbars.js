import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';
import { useTracking } from 'react-tracking';

export default function Navbars() {

  const { trackEvent } = useTracking();

  const location = useLocation();

  return (
    <Navbar variant="dark" style={{ backgroundColor: 'hsl(218, 41%, 30%)' }}>
      <Container>
        <Navbar.Brand href="/">Maker-checker</Navbar.Brand>
        <Nav>
          &nbsp;
          {location.pathname === '/login' && <Nav.Link href="/"
          // onClick={() =>
          //   trackEvent({
          //     component: 'Home',
          //     event: 'Clicked on home page link',
          //     user: 'Unknown',
          //     time: new Date().toLocaleString(),
          //     status: 'Success'
          //   })}
          >
            Home
          </Nav.Link>}
          &nbsp;
          {location.pathname === '/' && <Nav.Link href="/login"
          // onClick={() =>
          //   trackEvent({
          //     component: 'Login',
          //     event: 'Clicked on login page link',
          //     user: 'Unknown',
          //     time: new Date().toLocaleString(),
          //     status: 'Success'
          //   })}
          >
            Login
          </Nav.Link>}
          &nbsp;
        </Nav>
      </Container>
    </Navbar >
  );
}