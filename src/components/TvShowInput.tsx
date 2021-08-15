import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ITvShow } from '../models/ITvShow';

interface IProps {
    tvShow: ITvShow,
    submitGuess: Function,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        gridContainer: {
            flexGrow: 1,
        },
        input: {
            height: 80
        },
    })
);

const TvShowInput: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();

    const [guess, setGuess] = useState('');
    const [helperText, setHelperText] = useState('');
    const [inputError, setInputError] = useState(false);

    useEffect(() => {
        setGuess('');
    }, [props.tvShow]);

    const handleGuessSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        console.log(guess);

        if (!guess) {
            setInputError(true);
            setHelperText('Please enter your guess');
            return;
        }

        if (guess && guess.length < props.tvShow.name.length) {
            setInputError(true);
            setHelperText(`Guess should be ${props.tvShow.name.length + 1} characters`);
            return;
        }

        if (guess.length === props.tvShow.name.length) {
            setInputError(false);
            setHelperText('');
            props.submitGuess(guess);
        }

    };

    return (
        <form noValidate autoComplete="off" onSubmit={handleGuessSubmit}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                className={classes.gridContainer}
                spacing={3}
            >
                <Grid item>
                    <TextField
                        className={classes.input}
                        error={inputError}
                        label="Your Guess"
                        helperText={helperText}
                        variant="outlined"
                        size="medium"
                        inputProps={{maxLength: props.tvShow.name.length}}
                        onChange={(e) => setGuess(e.target.value)}
                        value={guess}
                    ></TextField>
                </Grid>
                <Grid item>
                    <Button variant="contained" size="large" type="submit">Try Your Guess</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default TvShowInput;
