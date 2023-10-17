import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket, faCheck} from "@fortawesome/free-solid-svg-icons";
import './Navbar.css'
import {useState, useEffect} from "react";
import {Button, Dropdown} from "react-bootstrap";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Canvas from "./OffCanvas";

const NavbarSignIn = () => {
  const [signedIn, setSignedIn] = useState(false)
  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
    () => {
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile(res.data);
            setSignedIn(true)
          })
          .catch(() => {
            setSignedIn(false)
          });
      }
    },
    [ user ]
  );

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setSignedIn(false)
  };

  return (
    <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container className='navbar-container'>
        <Navbar.Brand className='navbar-brand' onClick={handleShow}><FontAwesomeIcon icon={faCheck} /> To Do List</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {signedIn === false ?
            <Button className={'navbar-button'} onClick={() => login()}>
              <FontAwesomeIcon icon={faArrowRightToBracket} /> Sign In with Google
            </Button>
          :
            <Dropdown drop='down-centered'>
              <Dropdown.Toggle className={'navbar-button'} variant="success" id="dropdown-basic">
                  <img className='nav-bar-image' src={profile.picture} alt="user image" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => logOut()}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }
        </Navbar.Collapse>
      </Container>
      <Canvas show={show} handleclose={handleClose}/>
    </Navbar>
  );
}

export default NavbarSignIn;