import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/features/user/userSlice";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function Appnav() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Link to="/" className="navbar-brand fw-lighter">
          file share
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {isLoggedIn ? (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(logout())}
                className="nav-link"
              >
                Logout
              </span>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <span className="nav-link">
                <LoginModal />
              </span>
              <span className="nav-link">
                <RegisterModal />
              </span>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default Appnav;
