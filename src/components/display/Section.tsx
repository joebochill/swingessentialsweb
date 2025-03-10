import React, { JSX } from 'react';
import { Stack, StackProps } from '@mui/material';

type SectionProps = StackProps & {};
export const Section: React.FC<SectionProps> = (props): JSX.Element => {
    const { sx, ...other } = props;

    return (
        <Stack
            component={'section'}
            sx={[
                {
                    py: 8,
                    px: { xs: '10%', md: 8 },
                    backgroundColor: 'background.paper',
                    '&:nth-of-type(even)': {
                        backgroundColor: 'background.default',
                    },
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: { xs: 'stretch', md: 'center' },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        >
            {props.children}
        </Stack>
    );
};
