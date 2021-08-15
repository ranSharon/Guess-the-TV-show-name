import React, { useEffect, useState } from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';

interface IProps {
	lives: number;
	gameLost: Function;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		liveTitle: {
			paddingRight: theme.spacing(1),
		},
	})
);

const Lives: React.FC<IProps> = (props: IProps) => {
	const classes = useStyles();

	const [livesArray, setLiveArray] = useState<number[]>([]);

	useEffect(() => {
		if (props.lives === 0) props.gameLost();
		const livesArray = [];
		for (let i = 1; i <= props.lives; i++) livesArray.push(i);
		setLiveArray(livesArray);
	}, [props.lives]);

	return (
		<Grid container justifyContent="center" alignItems="center">
			<Grid item>
				<Typography className={classes.liveTitle} variant="h6">
					Lives:
				</Typography>
			</Grid>
			<Grid item sm={4} xs={3} md={2}>
				{livesArray.map((live) => (
					<FavoriteIcon key={live} color="error"></FavoriteIcon>
				))}
			</Grid>
		</Grid>
	);
};

export default Lives;
