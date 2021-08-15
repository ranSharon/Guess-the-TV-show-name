import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ITvShow } from "../models/ITvShow";
import { Grid } from "@material-ui/core";

interface IProps {
    tvShow: ITvShow;
}

const Hint: React.FC<IProps> = (props: IProps) => {
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        setShowHint(false);
    }, [props.tvShow]);

    return showHint ? (
        <Grid direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                    {props.tvShow.overview}
                </Typography>
            </Grid>
        </Grid>
    ) : (
        <Button
            variant="contained"
            size="large"
            onClick={() => setShowHint(true)}
        >
            Hint
        </Button>
    );
};

export default Hint;
