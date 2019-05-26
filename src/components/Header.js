import React from 'react';


const color=Math.random() < 0.5 ? 'green' : 'blue';


const Header=({message})=>{
	return(
<h2 style={{color:color}} className="text-center">{message} --SAlamamamamam-- {Math.random()}</h2>	
)
};

export default Header;