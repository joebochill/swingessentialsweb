import React from 'react';
import bg from '../assets/images/banners/pros.jpg';
import AJ from '../assets/images/banners/nelson.jpeg';
import Boyle from '../assets/images/pros/boyle.png';
import { makeStyles, Theme, createStyles, Toolbar, AppBar, Button } from '@material-ui/core';
import { SectionBlurb } from '../components/SectionBlurb';
import { Face, AddCircle } from '@material-ui/icons';
import { ProBio } from '../components/ProBio';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bannerWrapper: {
            height: 540,
            maxHeight: '80%',
            width: '100%',
            position: 'relative',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 100,
            [theme.breakpoints.down('sm')]: {
                padding: `100px 10%`,
                textAlign: 'center',
            },
        },
        section: {
            background: theme.palette.background.default,
            padding: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:nth-child(even)': {
                background: theme.palette.background.paper,
            },
            [theme.breakpoints.down('sm')]: {
                padding: `100px 10%`,
                // flexDirection: 'column',
                // textAlign: 'center',
            },
        },
    })
);

export const ProsPage: React.FC = (): JSX.Element => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.bannerWrapper}>
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        top: 0,
                        left: 0,
                        position: 'absolute',
                        backgroundColor: '#4f4c81',
                    }}
                />
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundImage: `url(${bg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 70%',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.5,
                    }}
                />
                <SectionBlurb
                    icon={<Face fontSize={'inherit'} />}
                    headline={'Meet Our Pros'}
                    subheading={'The folks behind the magic'}
                    body={`At Swing Essentials, all of our lessons are crafted by PGA-certified golf professionals with years of playing and coaching experience. Rest assured that you are in good hands when you submit your videos for analysis. If you are interested in joining our team of professionals, please contact us!`}
                    style={{ color: 'white', zIndex: 100 }}
                />
            </div>
            <AppBar position={'static'} color={'default'}>
                <Toolbar style={{ justifyContent: 'center' }}>
                    <Button variant={'text'}>
                        <AddCircle style={{ marginRight: 4 }} />
                        New Pro
                    </Button>
                </Toolbar>
            </AppBar>
            <div className={classes.section}>
                <ProBio
                    image={AJ}
                    background={{ size: '130%' }}
                    name={'A.J. Nelson'}
                    title={'Lead Instructor'}
                    description={`It's a pleasure to meet you. My name is A.J. Nelson and I am a Class A Member of the PGA. My goal is to grow the game of golf, one player at a time.|:::|I have been working in the golf industry for 19 years and have given thousands of lessons. I earned a Masters Degree from the University of Maryland, College Park and have graduated from the PGA sponsored Professional Golf Management Program.|:::|My strengths lie in teaching, club fitting, and player development. I look forward to bringing you my expertise in golf and feel extremely privileged to have the opportunity to work with you.`}
                />
            </div>
            <div className={classes.section}>
                <ProBio
                    image={Boyle}
                    name={'Joseph Boyle'}
                    title={'Associate Instructor'}
                    description={`Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.|:::|Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.`}
                />
            </div>
        </>
    );
};
