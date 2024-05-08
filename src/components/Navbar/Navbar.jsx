// import React, { useContext } from "react";
import { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  FaShoppingCart,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { userContext } from "../../Context/TokenContext";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/cartContext";
// import { counterContext } from "../../Context/counter";

export default function AppNavbar() {
  let {cartNumber ,getCart ,setCartNumber} =useContext(cartContext)
  let { userToken,setUserToken } = useContext(userContext);
  // let {counter} = useContext(counterContext);

  let navigate = useNavigate()
  function logOut ()
  {
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/signin')
  }
  useEffect (()=>{
    (async()=>{
      let {data} = await getCart();
      setCartNumber(data.numOfCartItems);

    })()
  },[])
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand to="#home">
          <FaShoppingCart style={{ color: "#0aad0a" }} />
          <span className="fw-bold"> FreshCart </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {userToken !== null ? (
            <Nav className="me-auto">
              <Link to="home" className="nav-link">Home </Link>
              <Link to="product" className="nav-link">Product</Link>
              <Link to="category" className="nav-link">Category</Link>
              <Link to="brands" className="nav-link">Brand</Link>
            </Nav>
          ) : (
            ""
          )}
          {userToken === null ? (
            <Nav className="ms-auto">
              <Link to="signup" className="nav-link">Register</Link>
              <Link to="signin" className="nav-link">Log in</Link>
            </Nav>
          ) : (
            ""
          )}

          <Nav className="ml-auto">
            {userToken !== null ? (
              <>
                <Link to="https://www.facebook.com" className="nav-link">
                  <FaFacebook color="white" />
                </Link>
                <Link to="https://www.twitter.com" className="nav-link">
                  <FaTwitter color="white" />
                </Link>
                <Link to="https://www.instagram.com" className="nav-link">
                  <FaInstagram color="white" />
                </Link>
                <Link to="https://www.linkedin.com" className="nav-link">
                  <FaLinkedin color="white" />
                </Link>
                  <Link to="cart" className="nav-link"> 
                  <i className="fa-solid fa-shopping-cart" style={{ color: "#0aad0a", fontSize: '20px'}}> </i>

                    <span className="badge text-light" style={{fontSize:'15px'}}>{cartNumber}</span>
                     </Link>
                    

                <Link  onClick={()=>logOut()} className="nav-link">Log Out</Link>
              </>
            ) : (
              ""
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
