import React from "react";
import AllBonds from "./components/AllBonds";
import AllMaturingBonds from "./components/AllMaturingBonds";
import Login from "./components/Login";
import NotAuthorized from "./components/NotAuthorized";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Route, Routes } from 'react-router-dom'
import Logout from "./components/Logout";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import MaturingBond from "./components/MaturingBond";
import MatureBondsWrapper from "./components/MatureBondsWrapper";

function App() {
  const auth = getAuth();
  const [authenticated, setAuthenticated] = useState(auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);

  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setAuthenticated(true);
      setIsLoading(false)
    } else {
      setAuthenticated(false);
      setIsLoading(false)
    }
  })

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">

              {authenticated &&
                <>
                  <Nav.Link href="/allbonds">All Bonds</Nav.Link>
                  <Nav.Link href="/bondsbymaturity">Bonds by Maturity</Nav.Link>
                  <Nav.Link href="/logout">Logout</Nav.Link>
                </>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={authenticated ? <AllBonds /> : <Login />} />
          <Route path="notauthorized" element={<NotAuthorized />} />
          <Route path="logout" element={<Logout />} />
          {!isLoading && authenticated && <>
            <Route path="/allbonds" element={<AllBonds />} />
            <Route path="/bondsbymaturity" element={<MatureBondsWrapper/>} />
            <Route path="/*" element={<AllBonds />} />
          </>}
          {!isLoading && !authenticated && <>
            <Route path="/*" element={<Login />} />
          </>}
          {isLoading &&
            <Route path="/*" element={<div />} />}
        </Routes>
      </Container>
    </>
  );
}

export default App;
