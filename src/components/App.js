import React from 'react';
import Header from './Header';
import ContestList from './ContestList';
import axios from 'axios';
import Contest from './Contest';
import * as api from '../api';


const routeState = (obj,url) => window.history.pushState(obj,'',url);
const onPopState = handler => {
	window.onpopstate = handler;
}

class App extends React.Component{

	state = 
	{
		content: []
	};


	componentDidMount(){
		axios.get('/api/contests')
		.then(resp => {
			this.setState({
				content: resp.data.contests
			});

		})
		.catch(console.error);

		onPopState((event)=>{
			this.setState({
				currentContestId: (event.state || {}).currentContestId
			});
		});
	};


fetStatus=(contestId)=>{
	routeState({currentContestId: contestId},`/contest/${contestId}`);	
	api.fetchContest(contestId).then( contest => {
		this.setState({
		currentContestId : contest.id,
		content: {
			...	this.state.content,
			[contest.id]: contest
			
		}
	});
}
		);
	
};
fetStatusList=()=>{
	routeState({
		currentContestId: null},'/');	
		api.fetchContestList().then( contestList => {
		this.setState({
		currentContestId : null,
		contestList	
		});
}
		);
	
};

pageHeader(){
	if (this.state.currentContestId) {
		return this.currentContest().contestName;
	}
	return	'Naming Contests';
}

currentContest(){
	return this.state.content[this.state.currentContestId];
}

fetchNames=(nameIds)=>{
	if (nameIds.length === 0) {
		return;
	}
	api.fetchNames(nameIds).then(names=>{
		this.setState({
			names
		});
	});
}

lookupNames = (nameId) => {
	if (!this.state.names || !this.state.names[nameId]) {
		return {
			name:'...'
		};
	}
	return this.state.names[nameId];
}

currentContent(){
	if (this.state.currentContestId){ 
		return <Contest  onClickContestList={this.fetStatusList} 
		fetchNames={this.fetchNames}
		lookupNames={this.lookupNames}
		 {...this.currentContest()}/>;
		}
	
	return	<ContestList onclickContest={this.fetStatus} contests={this.state.content} />;

}

 render(){
	return(
	<div>
	<Header message={this.pageHeader()}/>
	{this.currentContent()}
	</div>

	)
	 }

}

export default App;