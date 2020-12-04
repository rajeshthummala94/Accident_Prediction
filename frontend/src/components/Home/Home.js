import React, { Component } from "react";
import "../../App.css";
import SeverityChart from "../Charts/SeverityChart";
import { Redirect } from "react-router";
import { Button, Dropdown, Row, Col, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";

class Home extends Component {
  constructor() {
    super();
    /*this.state = {
      Carriageway_Hazards: 0,
      Light_Conditions: 1,
      Day_of_Week: 0,
      Special_Conditions_at_Site: 0,
      "1st_Road_Class": 1,
      Junction_Detail: 1,
      Junction_Control: 1,
      Road_Surface_Conditions: 1,
      Road_Type: 1,
      Urban_or_Rural_Area: 0,
      Weather_Conditions: 1,
      Time: 0,
      Speed_limit: 0,
      validEntry: false,
      severityResult: null,

    };*/
    this.state = {
      Carriageway_Hazards: 0,
      Light_Conditions: 1,
      Day_of_Week: 0,
      Special_Conditions_at_Site: 0,
      "1st_Road_Class": 4,
      Junction_Detail: 1,
      Junction_Control: 1,
      Road_Surface_Conditions: 1,
      Road_Type: 1,
      Urban_or_Rural_Area: 0,
      Weather_Conditions: 1,
      Time: 0,
      Speed_limit: 0,
      validEntry: false,
      severityResult: null,

    };

    this.submitPredict = this.submitPredict.bind(this);
  }
  componentDidMount() {}

  profileChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  submitPredict = (e) => {
    console.log("hello "+this.state.Speed_limit);
    
    axios.defaults.withCredentials = true;

    let {Speed_limit,Weather_Conditions, Junction_Control, Road_Surface_Conditions,Day_of_Week,Road_Type  } = this.state;
    
    //make a post request with the user data
    axios
      .post("http://localhost:8080" + "/predict", this.state)
      .then((response) => {
        console.log("inside success", response);
        let severityResult = response.data.result
        let speedAllowedSlight = ["10.0","15.0", "20.0","30.0"];
        
        if(( Speed_limit === "70.0" || Speed_limit === "60.0") && (Weather_Conditions === "2" || Weather_Conditions === "3")){
          severityResult = "Serious"
        }else if((Junction_Control === "4") && (Road_Surface_Conditions === "3")){
          severityResult = "Serious"
        }else if((Day_of_Week === "0" && Weather_Conditions === "1" && Junction_Control === "3")){
          severityResult = "Slight"
        }else if(speedAllowedSlight.includes(Speed_limit) && Junction_Control === "3"){
          severityResult = "Slight"
        }else if(Road_Surface_Conditions === "1" && speedAllowedSlight.includes(Speed_limit)){
          severityResult = "Slight"
        }else if(Road_Type === "1" && Road_Surface_Conditions === "1"){
          severityResult = "Slight"
        }
        
        this.setState({
          validEntry : true,
          severityResult: severityResult
        })
      });
  };

  render() {
    console.log("valid entry: "+this.state.validEntry+" severity: "+this.state.severityResult);
    if(this.state.validEntry){
      return(
      <div>
        <SeverityChart 
          severityResult = {this.state.severityResult}
        />
      </div>
      )
    }
    return (
      <div>
        <Header />
        <div style={{ height: "860px" }} className="Hero-Image2">
          <Container>
            <Row>
              <Col>
                <div
                  style={{
                    paddingTop: "130px",
                  }}
                  className="container content"
                >
                  <div
                    style={{ height: "450px" }}
                    className="login-form-container col-lg-12 col-md-4 col-sm-12 border"
                  >
                    <div className="login-form-heading input-group pad-top-10 input-group-lg"></div>

                    <div class="form-group">
                      <label class="form-group entry-form-control">
                        Day of the Week{" "}
                      </label>
                      <select
                        style={{ paddingLeft: "-50" }}
                        name="Day_of_Week"
                        class="form-control entry-form-control"
                        onChange={this.profileChangeHandler}
                      >
                        <option color="green">Select</option>
                        <option value="1">Sunday</option>
                        <option value="0">Monday</option>
                        <option value="0">Tuesday</option>
                        <option value="0">Wednesday</option>
                        <option value="0">Thursday</option>
                        <option value="0">Friday</option>
                        <option value="1">Saturday</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-group entry-form-control">
                        Weather Conditions{" "}
                      </label>
                      <select
                        name="Weather_Conditions"
                        class="form-control entry-form-control"
                        onChange={this.profileChangeHandler}
                      >
                        <option color="green">Select</option>
                        <option value="1">Fine no high winds</option>
                        <option value="2">Raining no high winds</option>
                        <option value="3">Raining + high winds</option>
                        <option value="4">Fine + high winds</option>
                        <option value="5">Snowing no high winds</option>
                        <option value="6">Fog or mist</option>
                        <option value="7">Snowing + high winds</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-group entry-form-control">
                        Road Class{" "}
                      </label>
                      <select
                        name="1st_Road_Class"
                        class="form-control entry-form-control"
                        onChange={this.profileChangeHandler}
                      >
                        <option color="green">Select</option>
                        <option value="1">A</option>
                        <option value="2">B</option>
                        <option value="3">C</option>
                        <option value="4">Motorway</option>
                        <option value="1">Unclassified</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-group entry-form-control">
                        Junction Control{" "}
                      </label>
                      <select
                        name="Junction_Control"
                        class="form-control entry-form-control"
                        onChange={this.profileChangeHandler}
                      >
                        <option color="green">Select</option>
                        <option value="1">Give way or uncontrolled</option>
                        <option value="2">Auto traffic signal</option>
                        <option value="3">
                          Not at junction or within 20 metres
                        </option>
                        <option value="4">Stop sign</option>
                        <option value="5">Authorised person</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm="4">
                <div
                  style={{ paddingTop: "110px" }}
                  className="container content"
                >
                  <div
                    style={{ height: "470px" }}
                    className="login-form-container col-lg-12 col-md-4 col-sm-12 border"
                  >
                    <div className="login-form-heading input-group pad-top-10 input-group-lg">
                      Enter values to predict!
                    </div>
                    <hr />
                    <div class="form-group">
                      <label class="form-group entry-form-control">
                        Junction Details{" "}
                      </label>
                      <select
                        name="Junction_Detail"
                        style={{ paddingLeft: "-50" }}
                        class="form-control entry-form-control"
                        onChange={this.profileChangeHandler}
                      >
                        <option color="green">Select</option>
                        <option value="1">
                          Not at junction or within 20 metres
                        </option>
                        <option value="2">T or staggered junction</option>
                        <option value="3">Crossroads</option>
                        <option value="4">Roundabout</option>
                        <option value="5">Private drive or entrance</option>
                        <option value="6">Other junction</option>
                        <option value="7">Slip road</option>
                        <option value="8">
                          More than 4 arms (not roundabout)
                        </option>
                        <option value="9">Mini-roundabout</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-group entry-form-control">
                        Light Conditions{" "}
                      </label>
                      <select
                        name="Light_Conditions"
                        class="form-control entry-form-control"
                        onChange={this.profileChangeHandler}
                      >
                        <option color="green">Select</option>
                        <option value="1">Light present</option>
                        <option value="0">Darkness</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-group entry-form-control">
                        Hazardous Items{" "}
                      </label>
                      <select
                        name="Carriageway_Hazards"
                        class="form-control entry-form-control"
                        onChange={this.profileChangeHandler}
                      >
                        <option value="Select" color="green">
                          Select
                        </option>
                        <option value="1">Present</option>
                        <option value="0">None</option>
                      </select>
                    </div>

                    <div className="form-group login-form-control">
                      <button
                        className="btn-login col-md-12 col-sm-12"
                        // btn btn-login col-lg-12 col-md-12 col-sm-12
                        onClick={this.submitPredict}
                      >
                        Predict{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm="4">
                <div
                  style={{
                    paddingTop: "130px",
                  }}
                  className="container content"
                >
                  <div
                    style={{ height: "450px" }}
                    className="login-form-container col-lg-12 col-md-4 col-sm-12 border"
                  >
                    <div className="login-form-heading input-group pad-top-10 input-group-lg"></div>

                    <div class="form-group">
                      <label class="form-group entry-form-control">
                        Special_Conditions_at_Site{" "}
                      </label>
                      <select
                        name="Special_Conditions_at_Site"
                        style={{ paddingLeft: "-50" }}
                        class="form-control entry-form-control"
                        onChange={this.profileChangeHandler}
                      >
                        <option color="green">Select</option>
                        <option value="1">Auto signal part defective</option>
                        <option value="1">
                          Road sign or marking defective or obscured
                        </option>
                        <option value="1">Auto traffic signal - out</option>
                        <option value="1">Road surface defective</option>
                        <option value="1">Mud</option>
                        <option value="1">Oil or diesel</option>
                        <option value="1">Roadworks</option>
                        <option value="0">None</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-group entry-form-control">
                        Road surface conditions{" "}
                      </label>
                      <select
                        name="Road_Surface_Conditions"
                        class="form-control entry-form-control"
                        onChange={this.profileChangeHandler}
                      >
                        <option color="green">Select</option>
                        <option value="1">Dry</option>
                        <option value="2">Wet or damp</option>
                        <option value="3">Frost or ice</option>
                        <option value="4">Snow</option>
                        <option value="5">Flood over 3cm. deep</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-group entry-form-control">
                        Road_Type{" "}
                      </label>
                      <select
                        name="Road_Type"
                        class="form-control entry-form-control"
                        onChange={this.profileChangeHandler}
                      >
                        <option color="green">Select</option>
                        <option value="1">Single carriageway</option>
                        <option value="2">Dual carriageway</option>
                        <option value="3">Roundabout</option>
                        <option value="4">One way street</option>
                        <option value="5">Slip road</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-group entry-form-control">
                        Speed Limit{" "}
                      </label>
                      <select
                        name="Speed_limit"
                        class="form-control entry-form-control"
                        onChange={this.profileChangeHandler}
                      >
                        <option color="green">Select</option>
                        <option value="10.0">10.0</option>
                        <option value="15.0">15.0</option>
                        <option value="20.0">20.0</option>
                        <option value="30.0">30.0</option>
                        <option value="40.0">40.0</option>
                        <option value="50.0">50.0</option>
                        <option value="60.0">60.0</option>
                        <option value="70.0">70.0</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            {/* </div> */}
          </Container>
        </div>
      </div>
    );
  }
}
export default Home;
