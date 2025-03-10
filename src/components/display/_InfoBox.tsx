import React, { HTMLAttributes } from 'react';
import { Theme, Typography } from '@mui/material';
import { Box, SxProps } from '@mui/material';

const styles: { [key: string]: SxProps<Theme> } = {
    infoBox: {
        p: 2,
        background: 'primary.main',
        textAlign: 'center',
        mb: 2,
    },
};
type InfoBoxProps = HTMLAttributes<HTMLDivElement> & {
    message: string;
    show: boolean;
};
export const InfoBox: React.FC<InfoBoxProps> = (props) => {
    const { show, message, ...other } = props;

    if (!show || !message) return null;
    return (
        <Box sx={styles.infoBox} {...other}>
            <Typography>{message}</Typography>
        </Box>
    );
};
