import React, { HTMLAttributes } from 'react';
import { makeStyles, createStyles, Typography, Theme } from '@material-ui/core';
import { Headline, SubHeading } from './Typography';
import clsx from 'clsx';
import { Spacer } from '@pxblue/react-components';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headline: {
            display: 'inline-flex',
            alignItems: 'center',
            textAlign: 'left',
            marginBottom: theme.spacing(2),
            [theme.breakpoints.down('sm')]: {
                textAlign: 'center',
                display: 'block',
            },
            '&$jumbo': {
                [theme.breakpoints.down('sm')]: {
                    textAlign: 'center',
                },
            },
        },
        headlineIcon: {
            fontSize: 48,
            display: 'inline-flex',
        },
        smallHeadlineIcon: {
            display: 'inline-flex',
            marginRight: theme.spacing(0.5),
            fontSize: 24,
        },
        jumbo: {},
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
            <div>
                <Typography variant={'h6'}>{headline}</Typography>
                {subheading && <Typography variant={'caption'}>{subheading}</Typography>}
            </div>
        </div>
    ) : (
        <div className={clsx(classes.headline, { [classes.jumbo]: !icon })} {...other}>
            {icon && (
                <>
                    <div className={classes.headlineIcon}>{icon}</div>
                    <Spacer flex={0} height={0} width={16} />
                </>
            )}
            <div>
                <Headline>{headline}</Headline>
                {subheading && <SubHeading>{subheading}</SubHeading>}
            </div>
        </div>
    );
};
