import React from 'react';
import { Typography, Avatar, makeStyles, Theme, createStyles } from '@material-ui/core';
import { Headline, SubHeading } from './Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            flex: '1 1 0px',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 512,
            [theme.breakpoints.down('sm')]: {
                marginTop: 64,
                alignItems: 'center',
            },
        },
        callout: {
            display: 'flex',
            background: theme.palette.primary.light,
            padding: 20,
            flex: '1 1 0px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            borderBottomLeftRadius: 0,
            marginLeft: 40,
            marginBottom: 20,
            border: `1px solid ${theme.palette.primary.dark}`,
            [theme.breakpoints.down('sm')]: {
                marginLeft: 0,
            },
        },
        captionWrapper: {
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
        },
        avatar: {
            height: 80,
            width: 80,
            backgroundColor: theme.palette.primary.main,
            fontSize: 36,
        },
    })
);

type TestimonialProps = {
    initials: string;
    name: string;
    testimonial: string;
    location: string;
    joined: string;
};
export const Testimonial: React.FC<TestimonialProps> = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.callout}>
                <Typography>{`"${props.testimonial}"`}</Typography>
            </div>
            <div className={classes.captionWrapper}>
                <Avatar className={classes.avatar}>{props.initials}</Avatar>
                <div style={{ textAlign: 'left', marginLeft: 20 }}>
                    <Headline noWrap>{props.name}</Headline>
                    <SubHeading noWrap display={'block'}>
                        {props.location}
                    </SubHeading>
                    <Typography noWrap variant={'caption'}>{`Member since ${props.joined}`}</Typography>
                </div>
            </div>
        </div>
    );
};
