import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Header from "../Header/Header";
import { Button, Dropdown, Row, Col, Container } from "react-bootstrap";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      Email: "",
      Password: "",
      formValidationFailure: false,
      isValidationFailure: true,
      errorRedirect: false
    };

    //Bind events
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.signup = this.signup.bind(this);
  }

  emailChangeHandler = e => {
    this.setState({
      Email: e.target.value
    });
  };

  passwordChangeHandler = e => {
    this.setState({
      Password: e.target.value
    });
  };

  submitLogin = e => {
    e.preventDefault();

    var username = "admin";
    var password = "admin";
    var username1 = "admin1";
    var password1 = "admin1";

    var data = {
      Email: this.state.Email,
      Password: this.state.Password,
    };

    if (this.state.Email === username && this.state.Password === password) {
      this.setState({
        formValidationFailure: true,
        authFlag:true
      });
      localStorage.setItem("authFlag", this.state.authFlag);
      window.location = "/home";
    } 
  };

  signup = e =>{
    window.location = "/signup";
  }

  render() {
    let redrirectVar = null;
    if (this.state.authFlag) {
      redrirectVar = <Redirect to="/home" />;
    }

    if (this.state.errorRedirect) {
      redrirectVar = <Redirect to="/error" />;
    }

    let errorPanel = null;
    if (!this.state.isValidationFailure) {
      errorPanel = (
        <div>
          <div className="alert alert-danger" role="alert">
            <strong>Validation Error!</strong> Username and Password doesn't
            match!
          </div>
        </div>
      );
    }
    let formErrorPanel = null;
    console.log("FormvalidationFailure", this.state.formValidationFailure);
    if (this.state.formValidationFailure) {
      formErrorPanel = (
        <div>
          <div className="alert alert-danger" role="alert">
            <strong>Validation Error!</strong> Username and Password are
            required!
          </div>
        </div>
      );
    }
    return (
      <div>
        <div style={{height:'950px'}} className="Hero-Image2">
        <Container>
        
          <div style={{paddingTop:'200px'}}className="container content">
            {/* <div className="login-container">
              <div>
                <p font-size>Log in to DriveSafe</p>
                <p>
                  Need an account? <a href="/sign-up">Sign Up</a>
                </p>
              </div> */}
              <div className="login-form-container col-lg-4 col-md-4 col-sm-12 offset-lg-4 offset-md-4 border">
                <div className="login-form-heading input-group pad-top-10 input-group-lg">
                  Login to DriveSafe
                </div>
                <hr />
                
                <div className="form-group login-form-control">
                  
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    onChange={this.emailChangeHandler}
                    required
                  />
                </div>
                <div className="form-group login-form-control">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    onChange={this.passwordChangeHandler}
                    required
                  />
                </div>
               
        
                <div className="form-group login-form-control">
                  <button
                    className="btn-login col-md-12 col-sm-12"
                    // btn btn-login col-lg-12 col-md-12 col-sm-12
                    onClick={this.submitLogin}
                  >
                    Login{" "}
                  </button>
                </div>
                <div className="form-group login-form-control">
                  <button
                    className="btn-login col-md-12 col-sm-12"
                    // btn btn-login col-lg-12 col-md-12 col-sm-12
                    onClick={this.signup}>
                    <a href="/sign-up"></a> 
                    Signup{" "}
                  </button>
                </div>
                <hr />
              </div>
            </div> 
          {/* </div> */}
      </Container>&nbsp;
      </div>
      </div>
      
    );
  }
}
export default Login;
