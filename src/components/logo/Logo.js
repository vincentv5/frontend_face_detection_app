import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import img from './img.png';

const Logo = () => {
	
	return (
		
<div className= 'ma4 mt0 pa0'>
	<Tilt className="Tilt br2 shadow-2" options={{ max : 30 }} style={{ height: 130, width: 130 }} >


 		<div className="Tilt-inner">
 
 			<img style ={{paddingTop: '15px',paddingLeft:"10px"}} alt ='' src={img}/> 
 
 		</div>
 
	</Tilt>
</div>
		
	);
}

export default Logo;