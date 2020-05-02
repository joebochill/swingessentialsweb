import React, { HTMLAttributes } from 'react';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        infoBox: {
            padding: 20,
            background: theme.palette.primary.main,
            // color: 'white',
            textAlign: 'center',
            marginBottom: 16,
        },
    })
);
type InfoBoxProps = HTMLAttributes<HTMLDivElement> & {
    message: string;
    show: boolean;
};
export const InfoBox: React.FC<InfoBoxProps> = (props) => {
    const { show, message, ...other } = props;
    const classes = useStyles(props);

    if (!show || !message) return null;
    return (
        <div className={classes.infoBox} {...other}>
            <Typography>{message}</Typography>
        </div>
    );
};
