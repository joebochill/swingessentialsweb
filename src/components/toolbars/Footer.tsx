import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import { ROUTES } from '../../constants/routes';
import { Twitter, Instagram, Facebook, Email } from '@material-ui/icons';
import { APP_VERSION } from '../../constants';
import { SimpleRouterLink } from '../navigation/SimpleLink';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        footer: {
            position: 'relative',
            padding: 64,
            background: theme.palette.primary.main,
            color: 'white',
            [theme.breakpoints.down('sm')]: {
                padding: `64px 5%`,
                flexDirection: 'column',
                textAlign: 'center',
            },
        },
        toolbar: {
            position: 'static',
            display: 'block',
            textAlign: 'center',
        },
        copyright: {
            flex: '1 1 0px',
            // marginBottom: 16,
        },
        version: {
            position: 'absolute',
            bottom: 16,
            left: 0,
            width: '100%',
            fontSize: 10,
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
                <SimpleRouterLink to={ROUTES.PRIVACY} label={'Privacy Policy'}></SimpleRouterLink>
                <SimpleRouterLink to={ROUTES.TERMS} label={'Terms of Use'}></SimpleRouterLink>
                <Typography variant={'caption'} className={classes.version}>{`v${APP_VERSION}`}</Typography>
            </Toolbar>
        </AppBar>
    );
};
