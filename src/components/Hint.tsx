import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ITvShow } from "../models/ITvShow";

interface IProps {
    tvShow: ITvShow,
    onHintClick: Function,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        hintContainer: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
    })
);

const Hint: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        setShowHint(false);
    }, [props.tvShow]);

    const handleHintClick = () => {
        setShowHint(true)
        props.onHintClick();
    };

    return (
        <div className={classes.hintContainer}>
            {showHint ? (
                <Typography variant="subtitle1" gutterBottom>
                    {props.tvShow.overview}
                </Typography>
            ) : (
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleHintClick()}
                >
                    Hint
                </Button>
            )}
        </div>
    );
};

export default Hint;
