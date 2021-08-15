import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import StatusBar from './components/StatusBar';
import TvShowName from './components/TvShowName';
import Hint from './components/Hint';
import TvShowInput from './components/TvShowInput';
import GuessFeedback from './components/GuessFeedback';
import GameOverDialog from './components/GameOverDialog';

import { ITvShow } from './models/ITvShow';
import { IStatistics } from './models/IStatistics';
import { IFeedback } from './models/IFeedback';
import { ITvShowsData } from './models/ITvShowsData';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		spinner: {
			marginTop: theme.spacing(4),
		},
	})
);

let currentPage: number = 1; // Specify which page to query from TMDB API
let totalPages: number; // Total number of pages that can be queried
let currentTvShowIndex: number = 0; // Current tv show to guess index

const App: React.FC = () => {
	const classes = useStyles();

	const [tvShowsData, setTvShowsData] = useState<ITvShowsData>({
		isFetched: false,
		tvShows: [],
		currentTvShow: { name: '', overview: '' },
	});

	const [feedback, setFeedback] = useState<IFeedback>({
		show: false,
		message: '',
		color: 'success',
	});

	const [statistics, setStatistics] = useState<IStatistics>({
		correctGuesses: 0,
		wrongGuesses: 0,
		numberOfHints: 0,
	});

	const [lives, setLives] = useState(3);
	const [score, setScore] = useState(0);
	const [showDialog, setShowDialog] = useState(false);

	useEffect(() => {
		// If tv shows data weren't fetched and set yet, fetch and set it
		if (
			!tvShowsData.isFetched &&
			!tvShowsData.tvShows.length &&
			!tvShowsData.currentTvShow.name &&
			!tvShowsData.currentTvShow.overview
		) {
			fetchAndSetTvShowsData(currentPage);
		}
	});

	const fetchAndSetTvShowsData = async (page: number) => {
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/tv/top_rated?api_key=11c53f1eaa3f6fae64f4dd64579ecff9&language=en-US&page=${page}`
			);

			if (response?.data?.results?.length) {
				if (!totalPages) totalPages = response?.data?.total_pages;

				const tvShows = response?.data?.results
					// Map the tv shows results to names and overviews only
					.map((tvShow: any) => {
						const name = tvShow?.name;
						const overview = tvShow?.overview;
						return { name, overview };
					})
					// Shuffle the mapped tv show array
					.sort((tvShowA: ITvShow, tvShow: ITvShow) => 0.5 - Math.random());

				setTvShowsData({
					isFetched: true,
					tvShows: tvShows,
					currentTvShow: tvShows[currentTvShowIndex],
				});
				currentTvShowIndex++;
			}
		} catch (error) {
			console.error(error);
		}
	};

	const setCurrentTvShow = (): void => {
		// If somehow the user guess correctly all tv shows (from all pages), start over by query page number 1 from TMDB API
		if (
			currentPage === totalPages &&
			currentTvShowIndex > tvShowsData.tvShows.length - 1
		) {
			currentPage = 1;
			currentTvShowIndex = 0;
			setTvShowsData({
				isFetched: false,
				tvShows: [],
				currentTvShow: { name: '', overview: '' },
			});
			return;
		}

		// If the user guess correctly all tv shows of current page, query the next page from TMDB API
		if (currentTvShowIndex > tvShowsData.tvShows.length - 1) {
			currentPage++;
			currentTvShowIndex = 0;
			setTvShowsData({
				isFetched: false,
				tvShows: [],
				currentTvShow: { name: '', overview: '' },
			});
			return;
		}

		setTvShowsData({
			...tvShowsData,
			currentTvShow: tvShowsData.tvShows[currentTvShowIndex],
		});
		currentTvShowIndex++;
	};

	const checkUserGuess = (guess: string): void => {
		// Correct guess
		if (guess.toLocaleLowerCase() === tvShowsData.currentTvShow.name.toLocaleLowerCase()) {
			setFeedback({
				show: true,
				message: 'Correct guess, moving on',
				color: 'success',
			});
			setStatistics({
				...statistics,
				correctGuesses: statistics.correctGuesses + 1,
			});
			setScore(score + 1);
			setCurrentTvShow();

			// Wrong guess
		} else {
			setFeedback({
				show: true,
				message: 'Wrong guess',
				color: 'error',
			});
			setStatistics({
				...statistics,
				wrongGuesses: statistics.wrongGuesses + 1,
			});
			setLives(lives - 1);
		}
	};

	const handleFeedbackClose = (): void => {
		setFeedback({ ...feedback, show: false });
	};

	const addHintToStatistics = (): void => {
		setStatistics({
			...statistics,
			numberOfHints: statistics.numberOfHints + 1,
		});
	};

	const showGameOverDialog = (): void => {
		setShowDialog(true);
	};

	const startNewGame = (): void => {
		setShowDialog(false);

		currentPage = 1;
		currentTvShowIndex = 0;
		setTvShowsData({
			isFetched: false,
			tvShows: [],
			currentTvShow: { name: '', overview: '' },
		});

		setFeedback({
			show: false,
			message: '',
			color: 'success',
		});

		setLives(3);
		setScore(0);
	};

	return (
		<div className="App">
			{!tvShowsData.isFetched &&
			!tvShowsData.tvShows.length &&
			!tvShowsData.currentTvShow.name &&
			!tvShowsData.currentTvShow.overview ? (
				<CircularProgress
					className={classes.spinner}
					size={80}
				></CircularProgress>
			) : (
				<Grid
					container
					direction="column"
					justifyContent="flex-start"
					className={classes.root}
					spacing={1}
				>
					<Grid item xs={12}>
						<StatusBar
							lives={lives}
							score={score}
							statistics={statistics}
							gameLost={showGameOverDialog}
						></StatusBar>
					</Grid>
					<Grid item xs={12}>
						<TvShowName tvShow={tvShowsData.currentTvShow}></TvShowName>
					</Grid>
					<Grid item xs={12}>
						<TvShowInput
							tvShow={tvShowsData.currentTvShow}
							submitGuess={checkUserGuess}
						></TvShowInput>
					</Grid>
					<Grid item xs={12}>
						<Grid container justifyContent="center">
							<Grid item>
								<Hint
									tvShow={tvShowsData.currentTvShow}
									onHintClick={addHintToStatistics}
								></Hint>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			)}
			<GuessFeedback
				feedback={feedback}
				onClose={handleFeedbackClose}
			></GuessFeedback>
			<GameOverDialog
				showDialog={showDialog}
				onClose={() => startNewGame()}
			></GameOverDialog>
		</div>
	);
};

export default App;
