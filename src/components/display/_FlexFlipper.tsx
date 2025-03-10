import React, { HTMLAttributes } from 'react';
import { Theme, SxProps, Box } from '@mui/material';

const styles: { [key: string]: SxProps<Theme> } = {
    root: {
        display: 'flex',
    },
    xs: {
        xs: {
            display: 'block',
        },
    },
    sm: {
        sm: {
            display: 'block',
        },
    },
    md: {
        md: {
            display: 'block',
        },
    },
    lg: {
        lg: {
            display: 'block',
        },
    },
    xl: {
        xl: {
            display: 'block',
        },
    },
};

type FlexFlipperProps = HTMLAttributes<HTMLDivElement> & {
    flipAt?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};
export const FlexFlipper: React.FC<FlexFlipperProps> = (props) => {
    const { flipAt = 'sm', ...divProps } = props;
    return (
        <Box
            sx={
                {
                    ...styles.root,
                    ...styles[flipAt],
                } as SxProps<Theme>
            }
            {...divProps}
        ></Box>
    );
};
