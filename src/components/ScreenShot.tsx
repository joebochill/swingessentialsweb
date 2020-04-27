import React, { HTMLAttributes } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import iphone from '../assets/images/iphone.png';

const useStyles = makeStyles(() =>
    createStyles({
        wrapper: {
            position: 'relative',
            width: 280,
            height: 511.03,
            overflow: 'hidden',
        },
        image: {
            position: 'absolute',
            left: 21,
            top: 20,
            width: 218,
            zIndex: 99,
        },
        frame: {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 100,
        },
    })
);

type ScreenShotProps = HTMLAttributes<HTMLDivElement> & {
    src: string;
    alt: string;
};
export const ScreenShot: React.FC<ScreenShotProps> = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <img src={props.src} alt={props.alt} className={classes.image} />
            <img src={iphone} alt={'Iphone device frame'} className={classes.frame} width={260} />
        </div>
    );
};
