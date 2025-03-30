import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, LinkProps } from '@mui/material';

type SimpleRouterLinkProps = LinkProps & {
    label: string;
    to: string;
};
export const SimpleRouterLink: React.FC<SimpleRouterLinkProps> = (props) => {
    const { to, ...other } = props;

    return (
        <SimpleLink
            component={RouterLink}
            // @ts-expect-error to prop does exist when component is RouterLink
            to={to}
            {...other}
        />
    );
};
type SimpleLinkProps = LinkProps & {
    label: string;
};
export const SimpleLink: React.FC<SimpleLinkProps> = (props) => {
    const { label, sx, ...other } = props;
    return (
        <Link
            color={'inherit'}
            sx={[
                {
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    userSelect: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        >
            {label}
        </Link>
    );
};
