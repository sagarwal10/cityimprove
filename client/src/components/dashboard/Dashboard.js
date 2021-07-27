import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from "../../actions/authActions";
import { Alert, Container, Col, Row, Form, Button } from 'react-bootstrap';

class Dashboard extends Component { 
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }


  render() {
    const { user } = this.props.auth;

    return (
      <Container>
        <Row>
	  <Col xs={{span:8, offset:2}} >
	  <br/>
	    <h4>
	      <b>Hey there </b>{user.name.split(" ")[0]}
	      <p className="flow-text grey-text text-darker=1">
	  	You are logged into a full-stack{" "}
		<span style={{ fontFamily: "monospace"}}>MERN</span>app
	      </p>
	    </h4>
	    <br/>
            <Button type="submit"
                variant="primary"
		onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light
                                   hoverable blue accent-3">
                  Logout
              </Button>
	   </Col>
	  </Row>
	</Container>);
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
}); 

export default connect(
  mapStateToProps,
  { logoutUser}
)(Dashboard); 


	
