import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import { NavLink } from './Toolbar';
import { ROUTES } from '../constants/routes';
import { Twitter, Instagram, Facebook, Email } from '@material-ui/icons';

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
            // marginBottom: 16,
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
                <div>
                    <IconButton
                        title={'@swingessentials'}
                        color={'inherit'}
                        onClick={(): void => {
                            window.open('https://twitter.com/SwingEssentials', '_blank');
                        }}
                    >
                        <Twitter />
                    </IconButton>
                    <IconButton
                        title={'swingessentials'}
                        color={'inherit'}
                        onClick={(): void => {
                            window.open('https://www.facebook.com/swingessentials/', '_blank');
                        }}
                    >
                        <Facebook />
                    </IconButton>
                    <IconButton
                        title={'@swingessentials'}
                        color={'inherit'}
                        onClick={(): void => {
                            window.open('https://www.instagram.com/swingessentials/', '_blank');
                        }}
                    >
                        <Instagram />
                    </IconButton>
                    <IconButton
                        title={'info@swingessentials.com'}
                        color={'inherit'}
                        onClick={(): void => {
                            window.open('mailto: info@swingessentials.com', '_blank');
                        }}
                    >
                        <Email />
                    </IconButton>
                </div>
                <NavLink to={ROUTES.PRIVACY} title={'Privacy Policy'}></NavLink>
                <NavLink to={ROUTES.TERMS} title={'Terms of Use'}></NavLink>
            </Toolbar>
        </AppBar>
    );
};
