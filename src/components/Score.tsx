import React from 'react';

import Typography from '@material-ui/core/Typography';

interface IProps {
	score: number;
}

const Score: React.FC<IProps> = (props: IProps) => {
	return <Typography variant="h6">Score: {props.score}</Typography>;
};

export default Score;
