import React, { HTMLAttributes } from 'react';
import { makeStyles, createStyles, Typography } from '@material-ui/core';
import { Headline, SubHeading } from './Typography';

const useStyles = makeStyles(() =>
    createStyles({
        headline: {
            display: 'inline-flex',
            alignItems: 'center',
            textAlign: 'left',
        },
        headlineIcon: {
            marginRight: 16,
            fontSize: 48,
        },
        smallHeadlineIcon: {
            marginRight: 4,
            fontSize: 24,
        },
    })
);

type FancyHeadlineProps = HTMLAttributes<HTMLDivElement> & {
    headline: string;
    subheading?: string;
    icon?: JSX.Element;
    small?: boolean;
};
export const FancyHeadline: React.FC<FancyHeadlineProps> = (props) => {
    const { small, headline, subheading, icon, ...other } = props;
    const classes = useStyles();

    return small ? (
        <div className={classes.headline} {...other}>
            {icon && <div className={classes.smallHeadlineIcon}>{icon}</div>}
            <div style={{ marginBottom: 16 }}>
                <Typography variant={'h6'}>{headline}</Typography>
                {subheading && <Typography variant={'caption'}>{subheading}</Typography>}
            </div>
        </div>
    ) : (
        <div className={classes.headline} {...other}>
            {icon && <div className={classes.headlineIcon}>{icon}</div>}
            <div style={{ marginBottom: 16 }}>
                <Headline>{headline}</Headline>
                {subheading && <SubHeading>{subheading}</SubHeading>}
            </div>
        </div>
    );
};
