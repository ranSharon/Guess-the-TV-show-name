import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import Lives from "./components/Lives";
import Statistics from "./components/Statistics";
import Score from "./components/Score";
import Hint from "./components/Hint";
import TvShowInput from "./components/TvShowInput";
import TvShowPlaceholder from "./components/TvShowPlaceholder";

import { ITvShow } from "./models/ITvShow";
import { IStatistics } from "./models/IStatistics";
import { IFeedback } from "./models/IFeedback";
import { ITvShowsData } from "./models/ITvShowsData";

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

let currentPage: number = 98; // Specify which page to query from TMDB API
let totalPages: number; // Total number of pages that can be queried
let currentTvShowIndex: number = 19; // Current tv show to guess index

const App = () => {
    const classes = useStyles();

    const [tvShowsData, setTvShowsData] = useState<ITvShowsData>({
        isFetched: false,
        tvShows: [],
        currentTvShow: { name: "", overview: "" },
    });

    const [feedback, setFeedback] = useState<IFeedback>({
        show: false,
        message: "",
        color: "success",
    });

    const [statistics, setStatistics] = useState<IStatistics>({
        correctGuesses: 0,
        wrongGuesses: 0,
        numberOfHints: 0,
    });

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
                    .sort(
                        (tvShowA: ITvShow, tvShow: ITvShow) =>
                            0.5 - Math.random()
                    );

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
        if (currentPage === totalPages && currentTvShowIndex > tvShowsData.tvShows.length - 1) {
            currentPage = 1;
            currentTvShowIndex = 0;
            setTvShowsData({
                isFetched: false,
                tvShows: [],
                currentTvShow: { name: "", overview: "" },
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
                currentTvShow: { name: "", overview: "" },
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
        if (guess === tvShowsData.currentTvShow.name) {
            setFeedback({
                show: true,
                message: "Correct guess, moving on",
                color: "success",
            });
            setStatistics({
                ...statistics,
                correctGuesses: statistics.correctGuesses++,
            });
            setCurrentTvShow();
        } else {
            setFeedback({
                show: true,
                message: "Wrong guess",
                color: "error",
            });
            setStatistics({
                ...statistics,
                wrongGuesses: statistics.wrongGuesses++,
            });
        }
    };

    const handleFeedbackClose = (): void => {
        setFeedback({ ...feedback, show: false });
    };

    return (
        <div className="App">
            {!tvShowsData.isFetched &&
            !tvShowsData.tvShows.length &&
            !tvShowsData.currentTvShow.name &&
            !tvShowsData.currentTvShow.overview ? (
                <CircularProgress
                    onClick={() => fetchAndSetTvShowsData(1)}
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
                        <Grid container justifyContent="space-between">
                            <Grid item xs={4}>
                                <Lives></Lives>
                            </Grid>
                            <Grid item xs={4}>
                                <Score></Score>
                            </Grid>
                            <Grid item xs={4}>
                                <Statistics
                                    statistics={statistics}
                                ></Statistics>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            Guess the TV show name
                        </Typography>
                        <TvShowPlaceholder
                            tvShow={tvShowsData.currentTvShow}
                        ></TvShowPlaceholder>
                    </Grid>
                    <Grid item xs={12}>
                        <TvShowInput
                            tvShow={tvShowsData.currentTvShow}
                            submitGuess={checkUserGuess}
                        ></TvShowInput>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center">
                            <Grid item xs={6}>
                                <Hint tvShow={tvShowsData.currentTvShow}></Hint>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
            <Snackbar
                open={feedback.show}
                autoHideDuration={2000}
                onClose={handleFeedbackClose}
            >
                <Alert severity={feedback.color}>{feedback.message}</Alert>
            </Snackbar>
        </div>
    );
};

export default App;
