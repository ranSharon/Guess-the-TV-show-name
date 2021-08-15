import React from 'react';

import Typography from '@material-ui/core/Typography';

import TvShowPlaceholder from './TvShowPlaceholder';

import { ITvShow } from '../models/ITvShow';

interface IProps {
	tvShow: ITvShow;
}

const TvShowName: React.FC<IProps> = (props: IProps) => {

	return (
		<div>
			<Typography variant="h4" gutterBottom>
				Guess the TV show name
			</Typography>
			<TvShowPlaceholder tvShow={props.tvShow}></TvShowPlaceholder>
		</div>
	);
};

export default TvShowName;
