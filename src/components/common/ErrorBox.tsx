import React from 'react';
import { BoxProps, Typography } from '@mui/material';
import { Box } from '@mui/material';

type ErrorBoxProps = BoxProps & {
    show?: boolean;
    message?: string;
};
export const ErrorBox: React.FC<ErrorBoxProps> = (props) => {
    const { show = true, message, sx, ...other } = props;

    if (!message || message === '' || !show) return null;
    return (
        <Box
            sx={[
                {
                    p: 2,
                    backgroundColor: 'error.main',
                    color: 'error.contrastText',
                    textAlign: 'center',
                    mb: 2,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        >
            <Typography>{message}</Typography>
        </Box>
    );
};
