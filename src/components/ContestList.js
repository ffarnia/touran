import React from 'React';
import ContestPrev from './ContestPreview';

const ContestList = ({contests}) =>(
	<div className="ContestList">
	{contests.map(contest =>
			<ContestPrev key={contest.id} {...contest} />	
		)}
	</div>
);

export default ContestList; 