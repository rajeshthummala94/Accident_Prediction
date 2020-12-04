import React, { Component } from "react";
import cookie from "react-cookies";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor() {
    super();

    //bind
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    axios.defaults.withCredentials = true;
    axios.post("http://localhost:3001/logout").then(response => {
      if (response.status === 200) {
        console.log("User logged out!");
      }
    });
  };

  render() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
          <a class="navbar logo-link" href="/home">Drive Safe</a>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <form class="form-inline my-2 my-lg-0 ml-auto">
      <a class="navbar navbar-link" href="/login">Logout</a>
    </form>
  </div>
</nav>
    );
  }
}

export default Header;
