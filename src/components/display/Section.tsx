import React, { HTMLAttributes } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles<Theme, SectionProps>((theme: Theme) =>
    createStyles({
        section: {
            background: theme.palette.background.paper,
            padding: 100,
            display: 'flex',
            alignItems: (props): string => props.align || 'center',
            justifyContent: (props): string => props.justify || 'center',
            '&:nth-child(even)': {
                background: theme.palette.background.default,
            },
            [theme.breakpoints.down('sm')]: {
                padding: `100px 10%`,
                flexDirection: 'column',
                textAlign: 'center',
            },
        },
    })
);
type SectionProps = HTMLAttributes<HTMLDivElement> & {
    background?: {
        color?: string;
        src?: string;
    };
    justify?: 'flex-start' | 'center' | 'stretch';
    align?: 'flex-start' | 'center' | 'stretch';
};
export const Section: React.FC<SectionProps> = (props): JSX.Element => {
    const { background = {}, style, ...other } = props;
    const classes = useStyles(props);

    return (
        <div
            className={clsx(classes.section)}
            style={Object.assign({ backgroundColor: background.color }, style)}
            {...other}
        >
            {props.children}
        </div>
    );
};
