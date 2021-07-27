import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types"; 
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames"; 
import { Alert, Container, Col, Row, Form, Button } from 'react-bootstrap';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      zipcode: "",
      errors: {}
    }
  }

  componentDidMount() {
    // If logged in, redirect user to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  } 

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    } else {
      this.setState({
        errors: {}
      });
    }
  } 

  onChange = e => {
    this.setState({ [e.target.id] : e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
  
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      zipcode: this.state.zipcode
    }

    this.props.registerUser(newUser, this.props.history); 

  } 

  render() {
    
    const { errors } = this.state;

    return(
      <Container>
        <Row>
	  <Col xs={{span:8, offset:1}} >
            <Link style={{color:"black", fontSize:"0.8em"}} to="/" className="btn-flat waves-effect">
              <i class="fas fa-long-arrow-alt-left"></i>
                  &nbsp; BACK TO HOME
            </Link>
            </Col>
	 </Row>
	 <br/>
	 <Row>
	   <Col xs={{span:8, offset:1}} >
	      <h4>
		<b>Register</b> below
	      </h4>
	      <p className="grey-text text-darken-1" style={{fontSize:"0.8em"}}>
		Already have an account? <Link to="/login">Log in</Link>
              </p>
	    </Col>
	  </Row>
	  <Row>
          <Col xs={{span:8, offset:1}}>
          <Form onSubmit={this.onSubmit}>
	    <Form.Group onChange={this.onChange} controlId="name"  style={{fontSize:"0.8em"}}>
	      <Form.Label>Name</Form.Label>
	      <Form.Control type="text" placeholder="Enter Name"
	  	className={classnames("", { invalid: errors.name })} />
		{ errors.name ?
                  (<Alert variant="danger">{errors.name} </Alert>):""
                }
	    </Form.Group>
	    <Form.Group 
		  onChange={this.onChange}
		  controlId="email"
		  style={{fontSize:"0.8em"}}>
	      <Form.Label>Email</Form.Label>
	      <Form.Control type="email" placeholder="Enter Email"
		  className={classnames("", { invalid: errors.email })} />
		{ errors.email ?
                  (<Alert variant="danger">{errors.email} </Alert>):""
                }
	    </Form.Group>
	    <Form.Group 
		  onChange={this.onChange}
		  controlId="password"
		  style={{fontSize:"0.8em"}}>
		<Form.Label>Password</Form.Label>
		<Form.Control type="password" placeholder="Enter Password"
                  className={classnames("", { invalid: errors.password  })} />
		{ errors.password ?
                  (<Alert variant="danger">{errors.password} </Alert>):""
                }
	     </Form.Group>
	     <Form.Group
		  onChange={this.onChange}
		  controlId="password2"
		  style={{fontSize:"0.8em"}}>
		<Form.Label>Confirm Password</Form.Label>
		<Form.Control type="password" placeholder="Confirm Password"
		  className={classnames("", { invalid: errors.password2  })} />
		{ errors.password2 ?
                  (<Alert variant="danger">{errors.password2} </Alert>):""
                }
	     </Form.Group>
	     <Form.Group
		  onChange={this.onChange}
		  controlId="zipcode"
		  style={{fontSize:"0.8em"}}>
		<Form.Label>Zipcode</Form.Label>
		<Form.Control placeholder="Your zipcode"
		  className={classnames("", { invalid: errors.zipcode  })} />
		{ errors.zipcode ?
                  (<Alert variant="danger">{errors.zipcode} </Alert>):""
                }
	     </Form.Group>
	     <Button type="submit"
                variant="primary"
                className="btn btn-large waves-effect waves-light
                                   hoverable blue accent-3">
                  Sign Up
              </Button>
	    </Form>
	  </Col>
	</Row>
      </Container>
    )
  }
} 

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
}); 

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}; 

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
