import React from 'react';
import Header from './Header';
import ContestList from './ContestList';
import axios from 'axios';

class App extends React.Component{

	state = 
	{
		headerMessage:'salam',
		content: []
	};

	componentDidMount(){
		axios.get('/api/contests')
		.then(resp => {
			this.setState({
				content: resp.data.contestsList
			});
			console.log(resp);

		})
		.catch(console.error);

	/*	this.setState({
			content: data.contests
		});*/
	}

 render(){
	return(
	<div>
	<Header message={this.state.headerMessage}/>
	<ContestList contests={this.state.content} />
	</div>

	)
	 }

}

export default App;