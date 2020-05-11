import React, { useState } from 'react';
import bg from '../assets/images/banners/swing.jpg';
import dtl from '../assets/icons/down-the-line.png';
import fo from '../assets/icons/face-on.png';

import {
    makeStyles,
    createStyles,
    Button,
    Theme,
} from '@material-ui/core';
import { SectionBlurb } from '../components/text/SectionBlurb';
import { Videocam } from '@material-ui/icons';
import { Banner } from '../components/display/Banner';
import { Section } from '../components/display/Section';
import { Spacer } from '@pxblue/react-components';
import { PlaceHolderVideo, PlaceHolderText } from '../components/display/Placeholder';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        panel: {
            flex: '1 1 0px',
            maxWidth: 512,
            [theme.breakpoints.down('sm')]: {
                flex: '0 0 auto',
                maxWidth: 'initial',
                alignSelf: 'stretch',
            },
        },
    })
);

export const SubmitPage: React.FC = (): JSX.Element => {
    const classes = useStyles();

    const [foVideo, setFoVideo] = useState<File | null>(null);
    const [dtlVideo, setDtlVideo] = useState<File | null>(null);
    const [description, setDescription] = useState('');

    return (
        <>
            <Banner background={{ src: bg, position: 'right bottom' }}>
                <SectionBlurb
                    jumbo
                    icon={<Videocam fontSize={'inherit'} />}
                    headline={'Submit Your Swing'}
                    subheading={'Request a personalized lesson'}
                    body={`Swing Essentials offers a true one-on-one experience. Our PGA golf professionals put a personal touch on each and every lesson, giving you the confidence to know that your lesson is just for you. Snap a quick video of your swing and our experts will have a lesson for you in under 48 hours!`}
                    style={{ color: 'white', zIndex: 100, maxWidth: 960 }}
                />
            </Banner>
            <Section>
                <SectionBlurb
                    headline={'Pro Tips'}
                    subheading={'How to submit your swing'}
                    body={`Select two videos of your golf swing from your computer: one from the face-on view and one looking down the line. Try to keep your videos files smaller by trimming any excess footage before submitting.`}
                    style={{ zIndex: 100, maxWidth: '40%', alignSelf: 'flex-start' }}
                />
                <Spacer flex={0} width={64} height={64} />
                <div className={classes.panel}>
                    <div style={{ width: '100%', display: 'flex' }}>
                        <div style={{ flex: '1 1 0px' }}>
                            <PlaceHolderVideo
                                title={'Face-On'}
                                background={fo}
                                style={{ flex: '1 1 0px' }}
                                onVideoChange={(video: File | null): void => {
                                    setFoVideo(video);
                                }}
                            />
                        </div>
                        <Spacer flex={0} width={16} height={16} />
                        <div style={{ flex: '1 1 0px' }}>
                            <PlaceHolderVideo
                                title={'Down-the-Line'}
                                background={dtl}
                                style={{ flex: '1 1 0px' }}
                                onVideoChange={(video: File | null): void => {
                                    setDtlVideo(video);
                                }}
                            />
                        </div>
                    </div>
                    <Spacer flex={0} width={32} height={32} />
                    <PlaceHolderText
                        label={'Hello'}
                        onTextChange={(text: string): void => {
                            setDescription(text);
                        }}
                    />
                    {dtlVideo && foVideo && (
                        <Button fullWidth color={'primary'} variant={'contained'} style={{ marginTop: 32 }}>
                            Submit
                        </Button>
                    )}
                </div>
            </Section>
        </>
    );
};
