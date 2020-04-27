import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import { NavLink } from './Toolbar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        footer: {
            padding: 100,
            background: theme.palette.primary.main,
            color: 'white',
            [theme.breakpoints.down('sm')]: {
                padding: `100px 5%`,
                flexDirection: 'column',
                textAlign: 'center',
            },
        },
        toolbar: {
            display: 'block',
            textAlign: 'center',
        },
        copyright: {
            flex: '1 1 0px',
            marginBottom: 16,
        },
    })
);

export const Footer: React.FC = () => {
    const classes = useStyles();
    return (
        <AppBar position={'static'} className={classes.footer} elevation={0}>
            <Toolbar variant={'dense'} className={classes.toolbar}>
                <Typography variant={'subtitle1'} align={'center'} className={classes.copyright}>
                    {`Copyright © ${new Date().getFullYear()} Swing Essentials, LLC.`}
                </Typography>
                <NavLink to={'/privacy'} title={'Privacy Policy'}></NavLink>
                <NavLink to={'/terms'} title={'Terms of Use'}></NavLink>
            </Toolbar>
        </AppBar>
    );
};
