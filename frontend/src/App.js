import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import React, {useState} from "react";
import {Navbar, Nav, Container} from 'react-bootstrap'
import {Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Popular from './pages/Popular'
import SearchMovie from './pages/SearchMovie';
import Signin from './pages/Signin';
import Signout from './pages/Signout';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound'; // importing 404 component
import {auth} from "./firebase";

function App() {
  let [authCheck, setAuthCheck] = useState("");

  let getAuthCheck = () => {
      return authCheck
  }

  auth.onAuthStateChanged(user =>{
    if (user)
    {
        setAuthCheck(user.uid);
        console.log(user.uid);
        console.log(user);
    }
    else 
    {
        setAuthCheck(-1);
    }
  }) 
  return (
    <div>
      <Navbar className="custom-navbar" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>My Movie</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link as={Link} to='/'>Home</Nav.Link>
              <Nav.Link as={Link} to='/Popular'>Popular</Nav.Link>
              {getAuthCheck()!==-1 &&<Nav.Link as={Link} to='/SearchMovie'>Search</Nav.Link>}
              {getAuthCheck()!==-1 && <Nav.Link as={Link} to='/Favorites'>Favorites</Nav.Link>}
              {getAuthCheck()===-1 && <Nav.Link as={Link} to='/Signin'>Sign In</Nav.Link>}
              {getAuthCheck()!==-1 && <Nav.Link as={Link} to='/Signout'>Sign Out</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Routes>
        <Route path ="/" element={<Home />} />
        <Route path ="/Popular" element={<Popular />} />
        <Route path ="/SearchMovie" element={<SearchMovie />} />
        <Route path ="/Favorites" element={<Favorites />} />
        <Route path ="/Signin" element={<Signin />} />
        <Route path ="/Signout" element={<Signout />} />
        <Route path="*" element={NotFound} /> {/* adding the 404 Route */}
      </Routes>
    </div>
  );
}

export default App;
