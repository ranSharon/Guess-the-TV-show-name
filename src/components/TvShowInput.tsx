import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        gridContainer: {
            flexGrow: 1
        }
    })
);

const TvShowInput: React.FC = (props) => {
    const classes = useStyles();

    const [guess, setGuess] = useState('');
    const [helperText, setHelperText] = useState('');
    const [inputError, setInputError] = useState(false);

    const handleGuessSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        console.log(guess);
        if (!guess) {
            setInputError(true);
            setHelperText('Please enter your guess');
        }
    };

    return (
        <form className={classes.form} noValidate autoComplete="off" onSubmit={handleGuessSubmit}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className={classes.gridContainer}
                spacing={3}
            >
                <Grid item>
                    <TextField
                        error={inputError}
                        label="Your Guess"
                        helperText={helperText}
                        variant="outlined"
                        size="medium"
                        onChange={(e) => setGuess(e.target.value)}
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
