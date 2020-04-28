import React from 'react';
import bg from '../assets/images/banners/pros.jpg';
import { makeStyles, Theme, createStyles, Toolbar, AppBar, Button } from '@material-ui/core';
import { SectionBlurb } from '../components/SectionBlurb';
import { Face, AddCircle } from '@material-ui/icons';
import { ProBio } from '../components/ProBio';

import { MockBios } from '../__mock-data__';

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
                    jumbo
                    icon={<Face fontSize={'inherit'} />}
                    headline={'Meet Our Pros'}
                    subheading={'The folks behind the magic'}
                    body={`At Swing Essentials, all of our lessons are crafted by PGA-certified golf professionals with years of playing and coaching experience. Rest assured that you are in good hands when you submit your videos for analysis. If you are interested in joining our team of professionals, please contact us!`}
                    style={{ color: 'white', zIndex: 100, maxWidth: 960 }}
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
            {MockBios.map((bio) => (
                <div key={`bio_${bio.id}`} className={classes.section}>
                    <ProBio
                        image={bio.image}
                        background={{ size: bio.imageSize }}
                        name={bio.name}
                        title={bio.title}
                        description={bio.bio}
                    />
                </div>
            ))}
        </>
    );
};
