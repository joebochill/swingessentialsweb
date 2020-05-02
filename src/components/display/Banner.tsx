import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles<Theme, BannerProps>((theme: Theme) =>
    createStyles({
        bannerWrapper: {
            minHeight: 540,
            width: '100%',
            position: 'relative',
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&$maintainRatio': {
                [theme.breakpoints.down('sm')]: {
                    minHeight: 'initial',
                    paddingTop: '56.25%',
                },
            },
        },
        maintainRatio: {},
        coloredBackdrop: {
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            position: 'absolute',
            backgroundColor: theme.palette.primary.main,
        },
        imageBackdrop: {
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.5,
        },
        contentWrapper: {
            zIndex: 100,
            height: '100%',
            width: '100%',
            padding: (props): number => (props.noPadding ? 0 : 64),
            '&$maintainRatio': {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            },
            [theme.breakpoints.down('sm')]: {
                padding: (props): number | string => (props.noPadding ? 0 : `64px 10%`),
                textAlign: 'center',
            },
        },
        content: {
            position: 'relative',
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: (props): string => props.align || 'center',
            justifyContent: (props): string => props.justify || 'flex-start',
        },
    })
);
type BannerProps = {
    background: {
        src: string;
        color?: string;
        opacity?: number;
        position?: string;
        size?: string;
        maintainAspectRatio?: boolean;
    };
    align?: 'flex-start' | 'center' | 'stretch';
    justify?: 'flex-start' | 'center' | 'stretch';
    noPadding?: boolean;
};
export const Banner: React.FC<BannerProps> = (props): JSX.Element => {
    const { background } = props;
    const classes = useStyles(props);

    return (
        <div 
            className={
                clsx(classes.bannerWrapper, 
                { 
                    [classes.maintainRatio]: background.maintainAspectRatio 
                })
            }
            style={{ backgroundColor: background.color }}
        >
            <div
                className={classes.imageBackdrop}
                style={{
                    backgroundImage: `url(${background.src})`,
                    backgroundSize: background.size,
                    backgroundPosition: background.position,
                    opacity: background.opacity,
                }}
            />
            <div className={clsx(classes.contentWrapper, {[classes.maintainRatio]: background.maintainAspectRatio})}>
                <div className={clsx(classes.content,{[classes.content]: background.maintainAspectRatio})}>{props.children}</div>
            </div>
        </div>
    );
};
