import React from 'React';
import ContestPrev from './ContestPreview';

const ContestList = ({contests,onclickContest}) =>(
	<div className="ContestList">
	{Object.keys(contests).map(contestId =>
			<ContestPrev onclick={onclickContest} key={contestId} {...contests[contestId]} />	
		)}
	</div>
);

export default ContestList; 