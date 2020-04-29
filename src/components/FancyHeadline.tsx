import React, { HTMLAttributes } from 'react';
import { makeStyles, createStyles, Typography, Theme } from '@material-ui/core';
import { Headline, SubHeading } from './Typography';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headline: {
            display: 'inline-flex',
            alignItems: 'center',
            textAlign: 'left',
            '&$jumbo':{
                [theme.breakpoints.down('sm')]: {
                    textAlign: 'center',
                },
            }
        },
        headlineIcon: {
            marginRight: 16,
            fontSize: 48,
        },
        smallHeadlineIcon: {
            marginRight: 4,
            fontSize: 24,
        },
        jumbo:{},
    })
);

type FancyHeadlineProps = HTMLAttributes<HTMLDivElement> & {
    headline: string;
    subheading?: string;
    icon?: JSX.Element;
    jumbo?: boolean;
};
export const FancyHeadline: React.FC<FancyHeadlineProps> = (props) => {
    const { jumbo, headline, subheading, icon, ...other } = props;
    const classes = useStyles();

    return !jumbo ? (
        <div className={classes.headline} {...other}>
            {icon && <div className={classes.smallHeadlineIcon}>{icon}</div>}
            <div style={{ marginBottom: 16 }}>
                <Typography variant={'h6'}>{headline}</Typography>
                {subheading && <Typography variant={'caption'}>{subheading}</Typography>}
            </div>
        </div>
    ) : (
        <div className={clsx(classes.headline, {[classes.jumbo]:!icon})} {...other}>
            {icon && <div className={classes.headlineIcon}>{icon}</div>}
            <div style={{ marginBottom: 16 }}>
                <Headline>{headline}</Headline>
                {subheading && <SubHeading>{subheading}</SubHeading>}
            </div>
        </div>
    );
};
