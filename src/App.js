import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { AppContext } from "./libs/contextLib";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";

function App() {
  const history = useHistory();

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const [center, setCenter] = useState([44.772205, 17.19101]);
  const [zoom, setZoom] = useState(13);
  const [multiPolyline, setMultiPolyline] = useState([
    [44.7711, 17.191],
    [44.7722, 17.19202],
    [44.77222, 17.19302],
  ]);

  const [user, setUser] = useState({});

  function handleLogout() {
    setTimeout(() => {
      userHasAuthenticated(false);

      history.push("/login");
    });
  }

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Prointer challenge</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {isAuthenticated ? (
                <>
                  <Navbar.Brand>
                    <span
                      className="userName"
                      onClick={() => history.push("/user/" + user.id)}
                    >{`${user.firstName} ${user.lastName}`}</span>
                  </Navbar.Brand>
                  <NavItem onClick={handleLogout}>Logout</NavItem>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider
          value={{
            isAuthenticated,
            userHasAuthenticated,
            user,
            setUser,
            multiPolyline,
            setMultiPolyline,
            center,
            setCenter,
            zoom,
            setZoom,
          }}
        >
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;
