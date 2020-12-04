import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import SeverityChart from "./Charts/SeverityChart";
import Signup from "./Signup/Signup";
import Profile from "./Profile/Profile";

class Main extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isSearch: false,
        searchText: ""
      };
  
      this.handlesearchClick = this.handlesearchClick.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handlesearchClick = () => {
      this.setState({
        isSearch: true
      });
    };
  
    handleInputChange = event => {
      var target = event.target;
      var name = target.name;
      var value = target.value;
  
      this.setState({
        [name]: value
      });
    };
  
    render() {
      return (
        <div>
          {/** Render Different Components based on Route*/}
          <Route
            exact
            render={() => {
              return (
                <Home
                  handleInputChange={this.handleInputChange}
                  searchText={this.state.searchText}
                  isSearch={this.state.isSearch}
                  searchClick={this.handlesearchClick}
                />
              );
            }}
            path="/"
          />
          <Route
            render={() => {
              return (
                <Home
                  handleInputChange={this.handleInputChange}
                  searchText={this.state.searchText}
                  isSearch={this.state.isSearch}
                  searchClick={this.handlesearchClick}
                />
              );
            }}
            path="/home"
          />
          <Route path="/login" component={Login} />
          <Route path="/severity-chart" component={SeverityChart} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
        </div>
      );
    }
  }

  export default Main;