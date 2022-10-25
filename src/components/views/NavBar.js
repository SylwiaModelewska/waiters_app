import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export const NavBar = () => {

  return(
    <Navbar bg="primary" variant="dark" className="rounded mt-3 mb-3" >
      <Container>
        <Navbar.Brand>Waiter.app</Navbar.Brand>
        <Nav className="me-1">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );

}
