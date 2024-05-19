import { Typography } from "@mui/material";
import {
    Navbar,
    Nav,
    Container,
    NavDropdown,
    Badge,
    Form,
    DropdownButton,
    Dropdown,
    Button,
    InputGroup,
  } from "react-bootstrap";
  
  import { LinkContainer } from "react-router-bootstrap";
  import { Link } from "react-router-dom";
import { loggedUser, selectIsAdmin, selectIsAuthenticated } from "../../redux/store/slices/authSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import ProfileDialog from "../../pages/user/model/ProfileModel";
  
  const Header = () => {
const [open,setOpen] = useState(false)
const [selectedValue,setSelected] = useState("")
    const isAdminAuth = useSelector(selectIsAdmin)
    const isUserAuthenticated = useSelector(selectIsAuthenticated)
    const userData = useSelector(loggedUser)
const handleProfileModel =()=>{
  setOpen(true)
}

const handleClose = () => {
  setOpen(false);
};
    console.log("userData",userData);
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand  href="/"><Typography sx={{margin:"5px"}}>BEST ONLINE SHOP</Typography></Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
             {
              !isAdminAuth ? <InputGroup>
              <DropdownButton id="dropdown-basic-button" title="All">
                <Dropdown.Item>Electronics</Dropdown.Item>
                <Dropdown.Item>Cars</Dropdown.Item>
                <Dropdown.Item>Books</Dropdown.Item>
              </DropdownButton>
              <Form.Control type="text" placeholder="Search in shop ..." />
              <Button variant="warning">
                <i className="bi bi-search text-dark"></i>
              </Button>
            </InputGroup>:null
             }
            </Nav>
            <Nav>
              {
                isAdminAuth? <LinkContainer to="/admin/orders">
                <Nav.Link>
                  Admin
                  <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
                </Nav.Link>
              </LinkContainer>:null
              }
             {
              !isAdminAuth && isUserAuthenticated?   <NavDropdown title={userData.name} id="collasible-nav-dropdown">
              <NavDropdown.Item
                eventKey="/user/my-orders"
                as={Link}
                to="/user/my-orders"
              >
                My orders
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleProfileModel}>
                My profile
              </NavDropdown.Item>
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>:null
             }
           {
            isAdminAuth || isUserAuthenticated ? <LinkContainer to="/logout">
            <Nav.Link>Logout</Nav.Link>
          </LinkContainer>: <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
           }
             
              {/* <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer> */}
          {
            !isAdminAuth && isUserAuthenticated ?    <LinkContainer to="/cart">
            <Nav.Link>
              <Badge pill bg="danger">
                2
              </Badge>
              <i className="bi bi-cart-dash"></i>
              <span className="ms-1">CART</span>
            </Nav.Link>
          </LinkContainer>:null 
          }
            </Nav>
          </Navbar.Collapse>
        </Container>
        {open?<ProfileDialog
         selectedValue={selectedValue}
         open={open}
         onClose={handleClose}
        />:null}
      </Navbar>
    );
  };
  
  export default Header;
  
  