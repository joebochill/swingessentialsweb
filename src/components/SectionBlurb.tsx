import React, { HTMLAttributes } from 'react';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import { Body } from './Typography';
import { FancyHeadline } from './FancyHeadline';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        blurb: {
            maxWidth: 512,
            [theme.breakpoints.down('sm')]: {
                marginBottom: 48,
                maxWidth: 'initial',
            },
        },
    })
);

type SectionBlurbProps = HTMLAttributes<HTMLDivElement> & {
    headline: string;
    subheading?: string;
    body: React.ReactNode;
    icon?: JSX.Element;
    jumbo?: boolean;
};
export const SectionBlurb: React.FC<SectionBlurbProps> = (props) => {
    const { headline, subheading, body, icon, jumbo, ...other } = props;
    const classes = useStyles();

    return (
        <div className={classes.blurb} {...other}>
            <FancyHeadline icon={icon} headline={headline} subheading={subheading} jumbo={jumbo} />
            {jumbo && <Body>{body}</Body>}
            {!jumbo && (
                <Typography variant={'h6'} style={{ lineHeight: 1.6, fontWeight: 400 }}>
                    {body}
                </Typography>
            )}
        </div>
    );
};
