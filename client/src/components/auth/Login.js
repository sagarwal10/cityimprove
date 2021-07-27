import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from "../../actions/authActions";
import classnames from "classnames"; 
import { Alert, Container, Col, Row, Form, Button } from 'react-bootstrap'; 

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    }
  }

  componentDidMount() {
    // if logged in redirect to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  } 

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      // push user to dashboard when they login 
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
	errors:nextProps.errors
      });
    }
  } 

  onChange = e => {
    this.setState({ [e.target.id] : e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
  
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }

    this.props.loginUser(userData);
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
	   <Col xs={{span:8, offset:1}}>
	      <h4>
		<b>Login</b> below
	      </h4>
	   </Col>
	  </Row>
	  <br/>
	  <Row>
	    <Col xs={{span:8, offset:1}}>
	      <p className="grey-text text-darken-1" style={{fontSize:"0.8em"}}>
		Don't have an account? <Link to="/register">Register</Link>
              </p>
	    </Col>
	  </Row>
	  <Row>
	  <Col xs={{span:8, offset:1}}>
	  <Form onSubmit={this.onSubmit}>
	    <Form.Group onChange={this.onChange} controlId="email" style={{fontSize:"0.8em"}}>
	      <Form.Label>Email</Form.Label>
	      <Form.Control type="email" placeholder="Enter Email" 
	         className={classnames("", { invalid: errors.email || errors.emailnotfound})} />
		{ errors.email || errors.emailnotfound ?    
		  (<Alert variant="danger">{errors.email || errors.emailnotfound} </Alert>):"" 
		} 
	     </Form.Group>
	     <Form.Group onChange={this.onChange} controlId="password" style={{fontSize:"0.8em"}}>
	       <Form.Label>Password</Form.Label>
	       <Form.Control type="password" placeholder="Enter password"
		  className={classnames("", { invalid: errors.password ||
							errors.passwordincorrect })} />
		{ errors.password || errors.passwordincorrect ? 
		  (<Alert variant="danger">{errors.password || errors.passwordincorrect}</Alert>):""
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
} 

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login); 

