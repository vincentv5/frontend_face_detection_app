import React from 'react';
import './facerecognition.css';

const Facerecognition = ({imageurl, box}) => {


	return (

		<div className = 'center ma' >
		
		<div className = 'mt2 absolute' >
		<img id = 'id' alt = ''
		src = {imageurl}
		style = {
			{
				width: "500px",
				height: 'auto'
			}
		}
		/> 
		
		<div className = 'bounding-box' style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}}></div>
		</div> 
	</div>

	);

}

export default Facerecognition;
