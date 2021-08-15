import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ITvShow } from '../models/ITvShow';

interface IProps {
    tvShow: ITvShow
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tvShowNameContainer: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        tvShowName: {
            letterSpacing: 4,
        },
    })
);

const TvShowPlaceholder: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();
    
    const [tvShowName, setTvShowName] = useState('');

    useEffect(() => {
        console.log(props.tvShow);
        console.log(props.tvShow.name);
        setTvShowNamePlaceholder();
    }, [props.tvShow]);

    const setTvShowNamePlaceholder = (): void  => {
        // Set number of max blank characters in tv show name
        const numberOfBlankCharacters: number = Math.round(props.tvShow.name.length / 3);

        // Set potential places of blank characters in tv show name
        const blankCharactersIndexesArray: Array<number> = [];
        for (let i = 1; i <= numberOfBlankCharacters; ) {
            const randomIndex = getRandomArbitrary(1, props.tvShow.name.length);
            if (!blankCharactersIndexesArray.includes(randomIndex)) {
                blankCharactersIndexesArray.push(randomIndex);
                i++;
            }
        }

        // Set blank characters in tv show name
        const tvShowNameString: string = props.tvShow.name;
        const tvShowNameArray: Array<string> = tvShowNameString.split('');
        blankCharactersIndexesArray.forEach((charIndx) => {
            if ((/[a-zA-Z]/).test(tvShowNameArray[charIndx]))
                tvShowNameArray[charIndx] = '_';
        });

        setTvShowName(tvShowNameArray.join(''));
    };

    const getRandomArbitrary = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    return (
        <div className={classes.tvShowNameContainer}>
            <Typography className={classes.tvShowName} variant="h5">
                {tvShowName}
            </Typography>
        </div>
    );
};

export default TvShowPlaceholder;
