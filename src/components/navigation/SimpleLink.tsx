import React from 'react';
import { Link, LinkProps, makeStyles, createStyles, Theme } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        navLink: {
            fontWeight: 400,
            cursor: 'pointer',
            textDecoration: 'none',
            color: '#ffffff',
            userSelect: 'none',
            '&:not(:nth-of-type(1))': {
                marginLeft: theme.spacing(2),
            },
        },
    })
);
type SimpleRouterLinkProps = LinkProps & {
    label: string;
    to: string;
};
export const SimpleRouterLink: React.FC<SimpleRouterLinkProps> = (props) => {
    const classes = useStyles();
    return (
        <Link component={RouterLink} to={props.to} color={'inherit'} className={clsx(classes.navLink, props.className)}>
            {props.label}
        </Link>
    );
};
type SimpleLinkProps = LinkProps & {
    label: string;
};
export const SimpleLink: React.FC<SimpleLinkProps> = (props) => {
    const classes = useStyles();
    return (
        <Link color={'inherit'} className={clsx(classes.navLink, props.className)} onClick={props.onClick}>
            {props.label}
        </Link>
    );
};
