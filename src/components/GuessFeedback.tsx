import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { IFeedback } from '../models/IFeedback';

interface IProps {
	feedback: IFeedback;
	onClose: any;
}

const GuessFeedback: React.FC<IProps> = (props: IProps) => {
	return (
		<Snackbar
			open={props.feedback.show}
			autoHideDuration={2000}
			onClose={props.onClose}
		>
			<Alert severity={props.feedback.color}>{props.feedback.message}</Alert>
		</Snackbar>
	);
};

export default GuessFeedback;
