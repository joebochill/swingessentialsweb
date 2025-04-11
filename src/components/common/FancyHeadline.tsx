import React, { JSX } from 'react';
import { Box, Stack, StackProps, Typography, TypographyProps } from '@mui/material';

export type FancyHeadlineProps = StackProps & {
    headline: string;
    subheading?: string;
    icon?: JSX.Element;
    slotProps?: {
        headline?: TypographyProps;
        subheading?: TypographyProps;
    };
};
export const FancyHeadline: React.FC<FancyHeadlineProps> = (props) => {
    const { headline, subheading, icon, sx, slotProps = {}, ...other } = props;

    return (
        <Stack
            className={'fancyHeader'}
            sx={[
                {
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    textAlign: { xs: 'center', md: 'left' },
                    mb: 2,
                    gap: 2,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        >
            {icon && (
                <Box
                    sx={{
                        fontSize: 48,
                        display: 'inline-block',
                        lineHeight: 0,
                    }}
                >
                    {icon}
                </Box>
            )}

            <Stack>
                <Typography variant={'h4'} fontWeight={600} {...slotProps.headline}>
                    {headline}
                </Typography>
                {subheading && (
                    <Typography variant={'subtitle2'} fontWeight={400} {...slotProps.subheading}>
                        {subheading}
                    </Typography>
                )}
            </Stack>
        </Stack>
    );
};
