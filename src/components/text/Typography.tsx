import React from 'react';
import { useMediaQuery, Typography, TypographyProps } from '@material-ui/core';

export const Headline: React.FC<TypographyProps> = (props) => {
    const isSmall = useMediaQuery('(max-width:959px)');
    const { children, style, ...others } = props;
    return (
        <Typography variant={isSmall ? 'h5' : 'h4'} style={Object.assign({ fontWeight: 600 }, style)} {...others}>
            {children}
        </Typography>
    );
};

export const SubHeading: React.FC<TypographyProps> = (props) => {
    const isSmall = useMediaQuery('(max-width:959px)');
    const { children, style, ...others } = props;
    return (
        <Typography
            variant={isSmall ? 'caption' : 'body1'}
            style={Object.assign({ fontWeight: 400 }, style)}
            {...others}
        >
            {children}
        </Typography>
    );
};

export const Body: React.FC<TypographyProps> = (props) => {
    const isSmall = useMediaQuery('(max-width:959px)');
    const { children, style, ...others } = props;
    return (
        <Typography
            variant={isSmall ? 'h6' : 'h5'}
            style={Object.assign({ lineHeight: 1.6, fontWeight: 400 }, style)}
            {...others}
        >
            {children}
        </Typography>
    );
};
