import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket, faCheck} from "@fortawesome/free-solid-svg-icons";
import './Navbar.css'
import {useState, useEffect} from "react";
import {Button, Dropdown} from "react-bootstrap";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
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

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setSignedIn(false)
    localStorage.removeItem('user')
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if(loggedInUser == null) return

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setProfile(foundUser);
      setSignedIn(true);
    }
  }, []);

  useEffect(() => {
    if (user && !localStorage.getItem("user")) {
      const getUserInfo = async () => {
        try {
          const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setProfile(data);
            localStorage.setItem('user', JSON.stringify(data))
            setSignedIn(true);
          } else {
            setSignedIn(false);
          }
        } catch (error) {
          setSignedIn(false);
        }
      };

      getUserInfo().then(() => {
        const controller = new AbortController
        controller.abort()
      });
    }
  }, [user]);


  return (
    <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container className='navbar-container'>
        <Navbar.Brand className='navbar-brand' onClick={handleShow}><FontAwesomeIcon icon={faCheck} /> To Do Journal</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
            {signedIn === false ?
              <Button className={'navbar-button'} onClick={() => login()}>
                <FontAwesomeIcon icon={faArrowRightToBracket} /> Sign In with Google
              </Button>
              :
              <Dropdown drop='down-centered' align={{ lg: 'end' }}>
                <Dropdown.Toggle className={'navbar-button'} variant="success" id="dropdown-basic">
                  <img className='nav-bar-image' src={profile.picture} alt="user image" />
                </Dropdown.Toggle>

                <Dropdown.Menu className='nav-bar-logout' >
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