import React from 'react';

import './face.css';



const Face = ({
	onInputChange,
	onButtonSubmit
}) => {

	return (

		<div>

		<p className = 'f3 tc'> {'face recognition machine yo can give it a try !!'} </p>



		<div className = 'form center' >

		<div className = "center pa4  br3 shadow-2" >

		<input className = 'f4 pa2 w-70 center'
		type = 'text'
		onChange = {
			onInputChange
		}
		/>

		<button 
		className = 'w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
		onClick = {
			onButtonSubmit
		} >
		detect 
		</button>

		</div>

		</div>

		</div>


	);
}


export default Face;
