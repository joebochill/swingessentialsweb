import React from 'react';
import { Box, BoxProps } from '@mui/material';
import iphone from '../../assets/images/screenshot/iphone16-pro-frame.svg';

type ScreenShotProps = BoxProps & {
    src: string;
    alt: string;
};
export const ScreenShot: React.FC<ScreenShotProps> = (props) => {
    const { src, alt, sx, ...other } = props;
    return (
        <Box
            sx={[
                {
                    width: 240,
                    maxWidth: '100%',
                    overflow: 'hidden',
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <Box
                sx={[
                    {
                        position: 'relative',
                        width: '100%',
                        paddingTop: '206.87%',
                    },
                ]}
                {...other}
            >
                <Box
                    component={'img'}
                    src={src}
                    alt={alt}
                    sx={{
                        position: 'absolute',
                        left: '3.75%',
                        top: '1.5%',
                        width: '92.5%',
                        zIndex: 99,
                        borderRadius: '7%',
                    }}
                />
                <Box
                    component={'img'}
                    src={iphone}
                    alt={'Iphone device frame'}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 100,
                    }}
                    width={'100%'}
                />
            </Box>
        </Box>
    );
};
