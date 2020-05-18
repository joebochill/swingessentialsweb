import React from 'react';
import { TWITTER_URL, FACEBOOK_URL, INSTAGRAM_URL, CONTACT_EMAIL } from '../../constants';
import { ROUTES } from '../../constants/routes';
import { SimpleRouterLink } from '../navigation/SimpleLink';
import { AppBar, Toolbar, Typography, makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import { Twitter, Instagram, Facebook, Email } from '@material-ui/icons';
import packageJSON from '../../../package.json';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        footer: {
            position: 'relative',
            padding: theme.spacing(8),
            background: theme.palette.primary.main,
            color: 'white',
            [theme.breakpoints.down('sm')]: {
                padding: `${theme.spacing(8)}px 5%`,
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
        },
        version: {
            position: 'absolute',
            bottom: theme.spacing(2),
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
                            window.open(TWITTER_URL, '_blank');
                        }}
                    >
                        <Twitter />
                    </IconButton>
                    <IconButton
                        title={'swingessentials'}
                        color={'inherit'}
                        onClick={(): void => {
                            window.open(FACEBOOK_URL, '_blank');
                        }}
                    >
                        <Facebook />
                    </IconButton>
                    <IconButton
                        title={'@swingessentials'}
                        color={'inherit'}
                        onClick={(): void => {
                            window.open(INSTAGRAM_URL, '_blank');
                        }}
                    >
                        <Instagram />
                    </IconButton>
                    <IconButton
                        title={'info@swingessentials.com'}
                        color={'inherit'}
                        onClick={(): void => {
                            window.open(`mailto: ${CONTACT_EMAIL}`, '_blank');
                        }}
                    >
                        <Email />
                    </IconButton>
                </div>
                <SimpleRouterLink to={ROUTES.PRIVACY} label={'Privacy Policy'}></SimpleRouterLink>
                <SimpleRouterLink to={ROUTES.TERMS} label={'Terms of Use'}></SimpleRouterLink>
                <Typography variant={'caption'} className={classes.version}>{`v${packageJSON.version}`}</Typography>
            </Toolbar>
        </AppBar>
    );
};
