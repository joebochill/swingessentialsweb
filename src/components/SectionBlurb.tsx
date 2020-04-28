import React, { HTMLAttributes } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
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
};
export const SectionBlurb: React.FC<SectionBlurbProps> = (props) => {
    const { headline, subheading, body, icon, ...other } = props;
    const classes = useStyles();

    return (
        <div className={classes.blurb} {...other}>
            <FancyHeadline icon={icon} headline={headline} subheading={subheading} />
            <Body>{body}</Body>
        </div>
    );
};
