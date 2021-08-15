import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import { IStatistics } from '../models/IStatistics';

interface IProps {
	statistics: IStatistics;
}

const Statistics: React.FC<IProps> = (props: IProps) => {
	const [showDialog, setShowDialog] = useState(false);

	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				onClick={() => setShowDialog(true)}
			>
				Statistics
			</Button>
			<Dialog open={showDialog} onClose={() => setShowDialog(false)}>
				<DialogTitle>Statistics</DialogTitle>
				<DialogContent>
					<Typography gutterBottom variant="subtitle1">
						Correct Guesses: {props.statistics.correctGuesses}
					</Typography>
					<Typography gutterBottom variant="subtitle1">
						Wrong Guesses: {props.statistics.wrongGuesses}
					</Typography>
					<Typography gutterBottom variant="subtitle1">
						Times Use Hint: {props.statistics.numberOfHints}
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setShowDialog(false)} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Statistics;
