import React, { HTMLAttributes } from 'react';
import { Typography, Avatar, makeStyles, Theme, createStyles } from '@material-ui/core';
import { Headline, SubHeading } from '../text/Typography';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: theme.spacing(4),
            borderBottomLeftRadius: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            maxWidth: 512,
        },
        avatar: {
            height: 80,
            width: 80,
            backgroundColor: (props: TestimonialProps): string =>
                props.src ? 'transparent' : theme.palette.background.paper,
            color: theme.palette.text.primary,
            fontSize: 32,
            position: 'absolute',
            top: -40,
            left: '50%',
            transform: 'translateX(-50%)',
            border: (props): string =>
                `${theme.spacing(0.5)}px solid ${props.src ? 'rgba(255,255,255,0.25)' : theme.palette.primary.main}`,
        },
        quoteWrapper: {
            background: theme.palette.primary.light,
            padding: theme.spacing(4),
            paddingBottom: theme.spacing(6),
            display: 'flex',
            flex: '1 1 auto',
        },
        punctuation: {
            fontSize: '5em',
            lineHeight: 1,
            marginRight: theme.spacing(2),
            display: 'inline-block',
            marginTop: -10,
            float: 'left',
            '&$right': {
                marginLeft: theme.spacing(2),
                marginRight: 0,
                float: 'right',
            },
        },
        right: {},
        attributionWrapper: {
            padding: theme.spacing(4),
            paddingTop: theme.spacing(6),
            background: theme.palette.primary.main,
            color: 'white',
            position: 'relative',
        },
    })
);

type TestimonialProps = HTMLAttributes<HTMLDivElement> & {
    initials: string;
    src?: string;
    name: string;
    testimonial: string;
    location: string;
    joined: string;
};
export const Testimonial: React.FC<TestimonialProps> = (props) => {
    const { initials, src, name, testimonial, location, joined, ...divProps } = props;

    const classes = useStyles(props);
    return (
        // <div className={classes.wrapper}>
        //     <div className={classes.callout}>
        //         <Typography>{`"${props.testimonial}"`}</Typography>
        //     </div>
        //     <div className={classes.captionWrapper}>
        //         <Avatar className={classes.avatar}>{props.initials}</Avatar>
        //         <div style={{ textAlign: 'left', marginLeft: 20 }}>
        //             <Headline noWrap>{props.name}</Headline>
        //             <SubHeading noWrap display={'block'}>
        //                 {props.location}
        //             </SubHeading>
        //             <Typography noWrap variant={'caption'}>{`Member since ${props.joined}`}</Typography>
        //         </div>
        //     </div>
        // </div>
        <div className={classes.root} {...divProps}>
            <div className={classes.quoteWrapper}>
                {/* <Typography variant={'h5'} className={classes.punctuation}>“</Typography> */}
                <Typography style={{ width: '100%' }}>
                    <Typography component={'span'} variant={'h5'} className={classes.punctuation}>
                        “
                    </Typography>
                    <Typography component={'span'} variant={'h5'} className={clsx(classes.punctuation, classes.right)}>
                        ”
                    </Typography>
                    {testimonial}
                </Typography>
                {/* <Typography variant={'h5'} className={clsx(classes.punctuation, classes.right)}>”</Typography> */}
            </div>
            <div className={classes.attributionWrapper}>
                <Avatar src={src} className={classes.avatar}>
                    {initials}
                </Avatar>
                <Headline noWrap>{name}</Headline>
                {/* <Hidden xsUp> */}
                <SubHeading noWrap display={'block'}>
                    {location}
                </SubHeading>
                <Typography noWrap variant={'caption'}>{`Member since ${joined}`}</Typography>
                {/* </Hidden> */}
            </div>
        </div>
    );
};
