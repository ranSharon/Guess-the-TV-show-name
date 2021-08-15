import React, { useEffect, useState } from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Lives from './Lives';
import Statistics from './Statistics';
import Score from './Score';

import { IStatistics } from '../models/IStatistics';

interface IProps {
	lives: number;
	gameLost: Function;
	score: number;
    statistics: IStatistics;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		statusBar: {
			marginTop: theme.spacing(2),
			height: 150,
		},
		statusBarItem: {
			paddingTop: theme.spacing(1),
			paddingBottom: theme.spacing(1),
		},
	})
);

const StatusBar: React.FC<IProps> = (props: IProps) => {
	const classes = useStyles();
	
	return (
		<Grid
			className={classes.statusBar}
			container
			justifyContent="space-between"
		>
			<Grid className={classes.statusBarItem} item sm={4} xs={12}>
				<Lives lives={props.lives} gameLost={props.gameLost}></Lives>
			</Grid>
			<Grid className={classes.statusBarItem} item sm={4} xs={12}>
				<Score score={props.score}></Score>
			</Grid>
			<Grid className={classes.statusBarItem} item sm={4} xs={12}>
				<Statistics statistics={props.statistics}></Statistics>
			</Grid>
		</Grid>
	);
};

export default StatusBar;
