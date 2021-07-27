import React, { Component } from "react";
import { Link, Router } from "react-router-dom";
import { Container, Col, Row, Form, Button } from 'react-bootstrap';

class Landing extends Component {
  render() {
    return (
      <Container>
	<div><br /></div>
        <Row>
	  <Col xs={{span:8, offset:1}}>
	    <h4>
              <b>Build</b> a login/auth app with the{" "}
              <span style={{ fontFamily: "monospace" }}>MERN</span>
              stack from scratch
            </h4>
            <p style={{ fontSize: "0.8em" }} >
               Create a full stack app with user authentication via passport and JWTs
            </p>
            <br />
	    </Col>
	  </Row>
	  <Row>
	    <Col xs={{span:4, offset:4}}>
	      <Button href="/register" type="submit"
                variant="primary">
	        Register
	      </Button>
	    </Col>
	   </Row>
	   <br/>
	   <Row>
	   <Col xs={{span:4, offset:4}}>
	     <Button type="submit" href="/login"
                variant="primary">
	        Log In
	     </Button>
	   </Col>
	  </Row>
      </Container>
    );
  }
}
export default Landing;
