import { Container, Navbar, Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const Content = (
    <div>
      <Navbar bg="primary" data-bs-theme="dark" className="mb-3">
        <Container>
          <Navbar.Brand>Test</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
  return Content;
};
export default Layout;
