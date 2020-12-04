import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Header/Header";
import { Button, Dropdown, Row, Col, Container } from "react-bootstrap";

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      FirstName: "",
      Email: "",
      Password: "",
      isNewUserCreated: false,
      validationError: false,
      errorRedirect: false
    };

    //bind
    this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.signup = this.signup.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  firstNameChangeHandler = e => {
    this.setState({
      FirstName: e.target.value
    });
  };

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

  submitLogin = e =>{
      window.location = "/login";
  }

  signup = e => {
    if (
      this.state.FirstName === "" ||
      this.state.Email === "" ||
      this.state.Password === ""
    ) {
      this.setState({
        validationError: true
      });
    } else {
      var data = {
        FirstName: this.state.FirstName,
        Email: this.state.Email,
        Password: this.state.Password,
        Accounttype: 1
      };

      e.preventDefault();

      axios.defaults.withCredentials = true;

      axios.post("http://localhost:3001/signup", data).then(response => {
        if (response.status === 200) {
          this.setState({
            isNewUserCreated: true
          });
        } else {
          this.setState({
            isNewUserCreated: false
          });
        }
      });
    }
    window.location = "/login";
  };

  render() {
    let redirectVar = null;
    if (this.state.isNewUserCreated === true) {
      redirectVar = <Redirect to="/login" />;
    }

    if (this.state.errorRedirect === true) {
      redirectVar = <Redirect to="/error" />;
    }

    let errorAlert = null;
    if (this.state.validationError) {
      errorAlert = (
        <div>
          <div className="alert alert-danger" role="alert">
            <strong>Error!</strong> Fill all the fields to proceed!
          </div>
        </div>
      );
    }

    return (
      <div>
          <div style={{height:'950px'}} className="Hero-Image2">
          <Container>
          <div style={{paddingTop:'200px'}} className="container content">
              <div className="login-form-container col-lg-6 col-md-6 col-sm-12 offset-lg-3 offset-md-3 border">
               <div className="login-form-heading input-group pad-top-10 input-group-lg">
               Sign me Up!
                </div>
                <hr />
                <div className="form-group login-form-control pad-top-20">
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    className="form-control form-control-lg"
                    placeholder="First Name"
                    onChange={this.firstNameChangeHandler}
                    required
                  />
                </div>
                <div className="form-group login-form-control">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
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
                    className="btn-login col-lg-12 col-md-12 col-sm-12"
                    onClick={this.signup}
                  >
                    Signup{" "}
                  </button>
                </div>
                <div className="form-group login-form-control">
                  <button
                    className="btn-login col-lg-12 col-md-12 col-sm-12"
                    onClick={this.submitLogin}
                  >
                    Login{" "}
                  </button>
                </div>
                <hr />
              </div>
            </div>
          </Container>
          </div> 
        </div>
      
    );
  }
}

export default Signup;
