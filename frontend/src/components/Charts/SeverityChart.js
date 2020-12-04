import React, {Component} from "react";
import CanvasJSReact from "../Canvas/canvasjs.react";
import Header from "../Header/Header";
import {Alert, Button, Container} from 'reactstrap';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


var dps=[];


class SeverityChart extends Component{

    constructor(props){
		super(props);
		this.state = {
			alert : false, 
		}
		this.updateChart = this.updateChart.bind(this);
	}
	componentDidMount(){
		console.log("nidhiiiii"+ this.props.severityResult)
		this.updateChart(this.props.severityResult);
	}

	
	
	updateChart(data){
		
		console.log("data is: "+ data);
		var a=0;
		var max=0;
		var min=0;
		var cursum=0;
		var s="";
		var r=[{label: "Slight" },{label: "Medium" },{label: "Fatal" }]
		if(data === "Slight"){
			console.log("inside slight ");
		for(var i=0;i<2;i++){
			switch(i){
				case 0: max=55;
						min=45;
						break;
				case 1: max=45;
						min=35;
						break;
			}
			
			a=Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));
			cursum+=a;
			s=r[i].label;
			dps.push({y:a,label:s})
		}

		a=100-cursum;
		s=r[2].label;
		
		dps.push(({y:a,label:s}))

		this.chart.render();
		}else if(data === "Serious"){
			console.log("inside serious ");
			for(var i=0;i<2;i++){
				switch(i){
					case 0: max=20;
							min=10;
							break;
					case 1: max=40;
							min=30;
							break;
				}
				
				a=Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));
				cursum+=a;
				s=r[i].label;
				dps.push({y:a,label:s})
			}
	
			a=100-cursum;
			s=r[2].label;
			
			dps.push(({y:a,label:s}))
	
			if(a >= 15){
				this.setState({
					alert : true
				})
			}
	
			this.chart.render();
		}
	}

	alert(){

		alert("I am an alert box!")}


    render(){
        const options = {
			animationEnabled: true,
			theme:"dark2",
            title: {
                text: "Severity of Accident"
            },
            data:[
                {
                    type:"column",
                    dataPoints: dps
                }
            ]
        }
        return(
			
			<div className="intro">
				<Header/>
				<div class="background-image"></div>
					<div className="container chart-body">
						<div style={{paddingTop:'200px'}} className="row" id="bg">
							<div className="col-2"></div>
							<div className="col-8">
							<Alert color = "danger" isOpen = {this.state.alert} font-size = "20px"> It is unsafe to travel.  </Alert>
								 <CanvasJSChart options = {options} 	
						 		onRef={ref => this.chart = ref} />
								 
							</div>
							
							<div className="col-2"></div>
					</div>
				</div>
			</div>
        );

    }
}

export default SeverityChart;