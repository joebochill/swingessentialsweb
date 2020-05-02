import React, { HTMLAttributes } from 'react';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        errorBox: {
            padding: 20,
            background: theme.palette.error.main,
            color: 'white',
            textAlign: 'center',
            marginBottom: 16,
        },
    })
);
type ErrorBoxProps = HTMLAttributes<HTMLDivElement> & {
    show?: boolean;
    message?: string;
};
export const ErrorBox: React.FC<ErrorBoxProps> = (props) => {
    const { show = true, message, ...other } = props;
    const classes = useStyles(props);

    if (!message || message === '' || !show) return null;
    return (
        <div className={classes.errorBox} {...other}>
            <Typography>{message}</Typography>
        </div>
    );
};
