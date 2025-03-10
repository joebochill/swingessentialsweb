import React from 'react';
import { useMediaQuery, Typography, TypographyProps } from '@mui/material';

export const Headline: React.FC<TypographyProps> = (props) => {
    const isSmall = useMediaQuery('(max-width:959px)');
    const { children, sx, ...others } = props;
    return (
        <Typography
            variant={isSmall ? 'h5' : 'h4'}
            sx={[{ fontWeight: 600 }, ...(Array.isArray(sx) ? sx : [sx])]}
            {...others}
        >
            {children}
        </Typography>
    );
};

export const SubHeading: React.FC<TypographyProps> = (props) => {
    const isSmall = useMediaQuery('(max-width:959px)');
    const { children, sx, ...others } = props;
    return (
        <Typography
            variant={isSmall ? 'caption' : 'body1'}
            sx={[{ fontWeight: 400 }, ...(Array.isArray(sx) ? sx : [sx])]}
            {...others}
        >
            {children}
        </Typography>
    );
};

export const Body: React.FC<TypographyProps> = (props) => {
    const isSmall = useMediaQuery('(max-width:959px)');
    const { children, sx, ...others } = props;
    return (
        <Typography
            variant={isSmall ? 'body1' : 'body2'}
            sx={[{ fontWeight: 400, lineHeight: 1.6 }, ...(Array.isArray(sx) ? sx : [sx])]}
            {...others}
        >
            {children}
        </Typography>
    );
};
