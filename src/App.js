import React, {Component} from 'react';
import Nav from './components/nav/Nav';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import Face from './components/face/Face';
import Facerecognition from './components/facerecognition/Facerecognition';
import Particles from 'react-particles-js';
import Signin from './components/signin/Signin';
import Reg from './components/register/Reg';
import './App.css';
import Clarifai from 'clarifai';

// initialize with your api key. This will also work in your browser via http://browserify.org/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const app = new Clarifai.App({
	
	apiKey: 'd94933b56cc847f8a362eb7886a06ae6'

});


const particlesParam = {

	particles: {

		number: {

			value: 200,

			density: {

				enable: true,

				value_area: 700,
			}
		}
	}
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class App extends Component {
	
	constructor() {
		
		super();

		this.state = {
			input:'',
			imageurl:'',
			box:{},
			router:'signin',
			isSignedIn: false,
		}

		this.onInputChange = this.onInputChange.bind(this);
		this.onButtonSubmit = this.onButtonSubmit.bind(this);
		this.calculate = this.calculate.bind(this);
		this.displayBoundingBox = this.displayBoundingBox.bind(this);
		this.onRoutChange = this.onRoutChange.bind(this);
		
	}
	
	onRoutChange(val) {
		
		/*in order to display the appropriate navigtion on the top of each section.
		1st we check if the value sent to d state is equal to lougout, if so 
		we send the user to login page with the login and register navs.
		this happen when non of the value in state level is true;
		
		2nd if val equals home we will send the user to the min page with the logout nav on top
		*/
		if(val === 'logout') {
			
			this.setState({isSignedIn:false });
			
		} else if(val === 'home') {
		
			this.setState({isSignedIn: true });
		}
		// seting up the state for navigation purposes.
		this.setState({router:val});
		
	}
	
	
	
	
	
	calculate(data){
		//  we recieve data from the response from clarifai API,then do the manipultion to get all the neccesary data.
		const clarifai = data.outputs[0].data.regions[0].region_info.bounding_box;
		console.log(clarifai);
		
		//we do dom manipulation to get the width and height of our image in order to calculate the boundings.
		
		const img = document.getElementById('id');
		const width = Number(img.width);
		const height = Number(img.height);
		
		// we do our calculation below and return an object which we pass as value to the displayBoundingBox function to display set the state box obj to the return displayBoundingBox value
		return {
			leftCol : clarifai.left_col * width,
			topRow : clarifai.top_row * height,
			rightCol : width - (clarifai.right_col * width),
			bottomRow : height - (clarifai.bottom_row * height)
		}
	}
	
	
	// input function
	onInputChange(e){

		this.setState({
			input: e.target.value
		});


	}
	
	// function to update box object for usage
	displayBoundingBox(box){
	// this function is call by  onButtonSubmit that takes in the app.models.predict Api obj by passing in the composed funcs
	this.setState({box:box});
		
	}
	
	
	
	

	onButtonSubmit(){
		this.setState({imageurl: this.state.input});

		app.models.predict(

				Clarifai.FACE_DETECT_MODEL,
				this.state.input,
			)

			.then(response => 
				  // calling displayBoundingBoxfunc then calling calculatefunc. it goes from inner to outer func
				  this.displayBoundingBox
				  (this.calculate(response)))
		
			.catch(err => console.log(err));
	}

	
	// render function , all the magic hapens here!!!!
	render() {

		return ( 
			
			<div>

			<Particles className = 'particles' params={particlesParam}/>
			
			<Nav 
			isSignedIn={this.state.isSignedIn} 
			onRoutChange = {this.onRoutChange}
			/>
			
			<Logo />
			
			{ // checking for what is clicked in order to display the appropriate component!!!!	
			this.state.router === "home" 
			 //if the state.router equals home then login
			? <div>
			<Rank />
			<Face 
			onInputChange={this.onInputChange} 
			onButtonSubmit={this.onButtonSubmit}
			/>
			<Facerecognition 
			imageurl={this.state.imageurl} 
			box={this.state.box}
			/>	
			</div>
				/* else if the state.router equals signin then display 
				
				<Signin onRoutChange = {this.onRoutChange}/> else display 
				
				<Reg onRoutChange = {this.onRoutChange}/>*/
				
			: (this.state.router === "signin" 
			   
			 ? <Signin onRoutChange = {this.onRoutChange}/> 
			   
			 :<Reg onRoutChange = {this.onRoutChange}/>
				
				
			)
					
			}
			
			</div>
		);
	}
}

export default App;
