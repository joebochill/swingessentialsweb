import React, { HTMLAttributes } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        xs: {
            [theme.breakpoints.down('xs')]: {
                display: 'block',
            },
        },
        sm: {
            [theme.breakpoints.down('sm')]: {
                display: 'block',
            },
        },
        md: {
            [theme.breakpoints.down('md')]: {
                display: 'block',
            },
        },
        lg: {
            [theme.breakpoints.down('lg')]: {
                display: 'block',
            },
        },
        xl: {
            [theme.breakpoints.down('xl')]: {
                display: 'block',
            },
        },
    })
);

type FlexFlipperProps = HTMLAttributes<HTMLDivElement> & {
    flipAt?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};
export const FlexFlipper: React.FC<FlexFlipperProps> = (props) => {
    const { flipAt = 'sm', ...divProps } = props;
    const classes = useStyles(props);
    return (
        <div
            className={clsx(classes.root, {
                [classes.xs]: flipAt === 'xs',
                [classes.sm]: flipAt === 'sm',
                [classes.md]: flipAt === 'md',
                [classes.lg]: flipAt === 'lg',
                [classes.xl]: flipAt === 'xl',
            })}
            {...divProps}
        ></div>
    );
};
