import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Lives from "./components/Lives";
import Statistics from "./components/Statistics";
import Score from "./components/Score";
import Hint from "./components/Hint";
import TvShowInput from "./components/TvShowInput";
import TvShowPlaceholder from "./components/TvShowPlaceholder";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ITvShow } from "./models/ITvShow";

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

function App() {
    const classes = useStyles();
    const [dataFetched, setDataFetched] = useState(false);
    const [tvShows, setTvShows] = useState([]);

    useEffect(() => {
        if (dataFetched) return;
        fetchAndSetData(1);
        console.log(tvShows);
    });

    const fetchAndSetData = async (page: number) => {
        try {
            const response = await axios.get(
                "https://api.themoviedb.org/3/tv/top_rated?api_key=11c53f1eaa3f6fae64f4dd64579ecff9&language=en-US&page=1"
            );

            if (response?.data?.results?.length) {
                setTvShows(
                    response?.data?.results.map((tvShow: any) => {
                        const name = tvShow?.name;
                        const overview = tvShow?.overview;
                        return { name, overview };
                    })
                );
                setDataFetched(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getTvShow = (): ITvShow => {
        return tvShows[0];
    };

    return (
        <div className="App">
            {!dataFetched ? (
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
                        <Grid container justifyContent="space-between">
                            <Grid item xs={4}>
                                <Lives></Lives>
                            </Grid>
                            <Grid item xs={4}>
                                <Score></Score>
                            </Grid>
                            <Grid item xs={4}>
                                <Statistics></Statistics>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            Guess the TV show name
                        </Typography>
                        <TvShowPlaceholder tvShow={getTvShow()}></TvShowPlaceholder>
                    </Grid>
                    <Grid item xs={12}>
                        <TvShowInput></TvShowInput>
                    </Grid>
                    <Grid item xs={12}>
                        <Hint tvShow={getTvShow()}></Hint>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

export default App;
