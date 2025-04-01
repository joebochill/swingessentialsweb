import React, { JSX } from 'react';
import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';
import { FancyHeadline, FancyHeadlineProps } from './FancyHeadline';

type SectionBlurbProps = BoxProps & {
    headline: string;
    subheading?: string;
    body: React.ReactNode;
    icon?: JSX.Element;
    slotProps?: FancyHeadlineProps['slotProps'] & {
        body?: TypographyProps;
    };
};
export const SectionBlurb: React.FC<SectionBlurbProps> = (props) => {
    const { headline, sx, subheading, body, icon, slotProps = {}, ...other } = props;
    const { body: bodySlotProps, ...headlineSlotProps } = slotProps;
    return (
        <Box
            sx={[
                { maxWidth: { xs: 'initial', sm: 512, md: 900 }, color: 'text.primary', mb: 6 },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        >
            <FancyHeadline icon={icon} headline={headline} subheading={subheading} slotProps={headlineSlotProps} />
            <Typography
                variant={'h5'}
                fontWeight={400}
                lineHeight={1.6}
                {...bodySlotProps}
                sx={[
                    { textAlign: { xs: 'center', md: 'left' } },
                    ...(Array.isArray(bodySlotProps?.sx) ? bodySlotProps.sx : [bodySlotProps?.sx]),
                ]}
            >
                {body}
            </Typography>
        </Box>
    );
};
