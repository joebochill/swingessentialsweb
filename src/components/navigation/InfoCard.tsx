import React, { CSSProperties, JSX } from 'react';
import { Typography, Box, BoxProps } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';

const getTopPaddingForAspectRatio = (ratio: AspectRatio | undefined): string => {
    switch (ratio) {
        case '1x1':
            return '100%';
        case '2x1':
            return '50%';
        case '3x2':
            return '66.67%';
        case '4x3':
            return '75%';
        case '16x9':
        default:
            return '56.25%';
    }
};
type AspectRatio = '16x9' | '4x3' | '3x2' | '2x1' | '1x1';
type InfoCardProps = BoxProps & {
    src: string;
    aspectRatio?: AspectRatio;
    backgroundPosition?: CSSProperties['backgroundPosition'];
    title: string;
    description: string;
};

export const InfoCard: React.FC<InfoCardProps> = (props): JSX.Element => {
    const { src, aspectRatio = '2x1', backgroundPosition, title, description, sx, ...other } = props;
    return (
        <Box
            sx={[
                {
                    height: '100%',
                    cursor: props.onClick ? 'pointer' : 'default',
                    '&:hover': props.onClick
                        ? {
                              backgroundColor: 'rgba(0,0,0,0.05)',
                          }
                        : {},
                    p: 6,
                },
                (theme) =>
                    theme.applyStyles('dark', {
                        '&:hover': props.onClick
                            ? {
                                  backgroundColor: 'action.hover',
                              }
                            : {},
                    }),
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        >
            <Box
                sx={{
                    backgroundImage: `url(${src})`,
                    pt: getTopPaddingForAspectRatio(aspectRatio),
                    backgroundPosition: backgroundPosition,
                    width: '100%',
                    position: 'relative',
                    backgroundSize: 'cover',
                    mb: 2,
                    fontSize: 48,
                }}
            >
                <ChevronRight
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'white',
                        opacity: 0.7,
                    }}
                    fontSize={'inherit'}
                />
            </Box>
            <Typography variant={'h5'} sx={{ fontWeight: 600 }} noWrap>
                {title}
            </Typography>
            <Typography variant={'h6'} sx={{ fontWeight: 400, mt: 1 }}>
                {description}
            </Typography>
        </Box>
    );
};
InfoCard.displayName = 'InfoCard';
