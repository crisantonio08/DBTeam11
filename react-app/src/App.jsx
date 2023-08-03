import React from "react";
import AllBonds from "./components/pets/AllBonds";
import AllMaturingBonds from "./components/pets/AllMaturingBonds";
import Login from "./components/pets/Login";
import NotAuthorized from "./components/pets/NotAuthorized";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Route, Routes } from 'react-router-dom'
import Logout from "./components/pets/Logout";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const auth = getAuth();
  const [authenticated, setAuthenticated] = useState(auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading)
  console.log(authenticated)

  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      console.log("user state updated to not null")
      setAuthenticated(true);
      setIsLoading(false)
    } else {
      console.log("user state updated to null")
      setAuthenticated(false);
      setIsLoading(false)
    }
  })

  return (
      <>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">

                {authenticated &&
                  <>
                    <Nav.Link href="/logout">Logout</Nav.Link>
                    <Nav.Link href="/allbonds">All Bonds</Nav.Link>
                    <Nav.Link href="/bondsbymaturity">Bonds by Maturity</Nav.Link>
                  </>}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-3">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={authenticated ? <AllBonds /> : <Login/>} />
            <Route path="notauthorized" element={<NotAuthorized />} />
            <Route path="logout" element={<Logout />} />
            {!isLoading && authenticated && <>
            <Route path="/allbonds" element={<AllBonds />} />
            <Route path="/bondsbymaturity" element={<AllMaturingBonds />} />
            </>}
          </Routes>
        </Container>
      </>
  );
}

export default App;
