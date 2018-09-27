import React from 'react';

const Nav = ({ onRoutChange, isSignedIn }) => {
	
	if(isSignedIn) {
		
	return (
		
	<nav style = {{display:'flex', justifyContent:'flex-end'}}>
		
		<p onClick = {() => onRoutChange("logout")} className = 'f3 link dim white underline pa3  pointer'>LOGOUT</p>
		
	</nav>
	);
		
} else {
	
	return (
		
	<nav style = {{display:'flex', justifyContent:'flex-end'}}>
		
		<p onClick = {()=> onRoutChange('signin')} className = 'f3 link dim white underline pa3  pointer'>SIGN IN</p>
		
		<p onClick = {()=> onRoutChange('register')} className = 'f3 link dim white underline pa3  pointer'>REGISTER</p>
		
	</nav>
		
	);
}
	
}


export default Nav;