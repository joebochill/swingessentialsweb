import React, { HTMLAttributes } from 'react';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        infoBox: {
            padding: theme.spacing(2),
            background: theme.palette.primary.main,
            textAlign: 'center',
            marginBottom: theme.spacing(2),
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
