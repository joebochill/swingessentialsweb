import React, { HTMLAttributes } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Headline, SubHeading, Body } from './Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        blurb: {
            maxWidth: 512,
            [theme.breakpoints.down('sm')]: {
                marginBottom: 48,
                maxWidth: 'initial',
            },
        },
        headline: {
            display: 'inline-flex',
            alignItems: 'center',
        },
        headlineIcon: {
            marginRight: 16,
            fontSize: 48,
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
            <div className={classes.headline}>
                {icon && <div className={classes.headlineIcon}>{icon}</div>}
                <div style={{ marginBottom: 16 }}>
                    <Headline>{headline}</Headline>
                    {subheading && <SubHeading>{subheading}</SubHeading>}
                </div>
            </div>
            <Body>{body}</Body>
        </div>
    );
};
