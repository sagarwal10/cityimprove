import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Col, Row, Form } from 'react-bootstrap';

class AppNavbar extends Component {
  render() {
    return (
      <Container>
      <Navbar>
	  <Col xs={{span:4, offset:4}} >
            <Link to="/">
	      <h4 style={{color:"black"}}>
	      <i class="fas fa-caret-left"></i>&nbsp;
	      <i class="fas fa-caret-right"></i>&nbsp;
              MERN
	      </h4>
	    </Link>
	  </Col>
      </Navbar>
      </Container>
    );
  }
}

export default AppNavbar; 

