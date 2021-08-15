import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

interface IProps {
	showDialog: boolean;
	onClose: any;
}

const GameOverDialog: React.FC<IProps> = (props: IProps) => {
	return (
		<Dialog
			open={props.showDialog}
			onClose={props.onClose}
			fullWidth={true}
			maxWidth={'xs'}
		>
			<DialogTitle>Game Over</DialogTitle>
			<DialogContent>
				<Typography gutterBottom variant="subtitle1">
					You lost
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onClose} color="primary">
					Start New Game
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default GameOverDialog;
