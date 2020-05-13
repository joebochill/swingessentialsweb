import React, { useState, useCallback, useEffect } from 'react';
import bg from '../assets/images/banners/swing.jpg';
import dtl from '../assets/icons/down-the-line.png';
import fo from '../assets/icons/face-on.png';

import { makeStyles, createStyles, Button, Theme, LinearProgress, Hidden } from '@material-ui/core';
import { SectionBlurb } from '../components/text/SectionBlurb';
import { Videocam, CheckCircle, CloudUpload, Error, Mail, ShoppingCart, Update } from '@material-ui/icons';
import { Banner } from '../components/display/Banner';
import { Section } from '../components/display/Section';
import { Spacer, EmptyState } from '@pxblue/react-components';
import { PlaceHolderVideo, PlaceHolderText } from '../components/display/Placeholder';
import { useDispatch, useSelector } from 'react-redux';
import { submitLesson } from '../redux/actions/lessons-actions';
import { AppState } from '../__types__';

import * as Colors from '@pxblue/colors';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { SUBMIT_LESSON } from '../redux/actions/types';

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
        actions: {
            width: '100%',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    })
);

export const SubmitPage: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const role = useSelector((state: AppState) => state.auth.role);
    const lessons = useSelector((state: AppState) => state.lessons);
    const credits = useSelector((state: AppState) => state.credits.count);
    const loaded = useSelector((state: AppState) => state.api.authentication.initialized);
    const getCredits = useSelector((state: AppState) => state.api.getCredits.status);
    const getLessons = useSelector((state: AppState) => state.api.loadLessons.status);

    const submitStatus = useSelector((state: AppState) => state.api.submitLesson.status);

    const [foVideo, setFoVideo] = useState<File | null>(null);
    const [dtlVideo, setDtlVideo] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    const canShowForm =
        loaded && (role === 'customer' || role === 'administrator') && credits > 0 && lessons.pending.length < 1;

    const _submitLesson = useCallback(() => {
        if (role !== 'customer' && role !== 'administrator') {
            // console.log('you are not verified');
            return;
        }
        if (lessons.pending.length > 0) {
            // console.log('you already have a pending lesson');
            return;
        }
        if (credits < 1) {
            // console.log('you have no credits');
            return;
        }
        if (!foVideo || !dtlVideo) {
            // console.log('you did not pick videos');
            return;
        }
        const data = new FormData();
        data.append('fo', foVideo);
        data.append('dtl', dtlVideo);
        data.append('notes', description);

        dispatch(
            submitLesson(data, (event: ProgressEvent) => {
                setUploadProgress((event.loaded / event.total) * 100);
            })
        );
    }, [role, credits, lessons.pending.length, foVideo, dtlVideo, description, dispatch]);

    useEffect(() => {
        setFoVideo(null);
        setDtlVideo(null);
        setDescription('');
        setUploadProgress(0);
        dispatch({ type: SUBMIT_LESSON.RESET });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                <Hidden smDown>
                    <div style={{ maxWidth: '40%', alignSelf: 'flex-start' }}>
                        <SectionBlurb
                            headline={'Pro Tip #1'}
                            subheading={'How to submit your swing'}
                            body={`Select two videos of your golf swing from your computer: one from the face-on view and one looking down the line.`}
                        />
                        <Spacer flex={0} width={64} height={64} />
                        <SectionBlurb
                            headline={'Pro Tip #2'}
                            subheading={'Choosing a video'}
                            body={`Try to keep your video files smaller by trimming any excess footage before submitting. We also caution against using slow-motion videos as they tend to yield much larger files.`}
                        />
                    </div>
                    <Spacer flex={0} width={64} height={64} />
                </Hidden>
                <div className={classes.panel}>
                    {getLessons === 'success' && getCredits === 'success' && submitStatus === 'initial' && canShowForm && (
                        <>
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
                                label={'Special Requests / Comments'}
                                onTextChange={(text: string): void => {
                                    setDescription(text);
                                }}
                            />
                            {dtlVideo && foVideo && (
                                <Button
                                    fullWidth
                                    color={'primary'}
                                    variant={'contained'}
                                    style={{ marginTop: 32 }}
                                    onClick={(): void => _submitLesson()}
                                >
                                    Submit
                                </Button>
                            )}
                        </>
                    )}
                    {submitStatus === 'loading' && (
                        <EmptyState
                            icon={<CloudUpload fontSize={'inherit'} /*htmlColor={Colors.green[500]}*/ />}
                            title={'Uploading Videos'}
                            description={`Please wait while your videos are uploaded.`}
                            actions={
                                <LinearProgress
                                    variant={
                                        uploadProgress === 0 || uploadProgress >= 100 ? 'indeterminate' : 'determinate'
                                    }
                                    value={uploadProgress}
                                    style={{ alignSelf: 'stretch' }}
                                />
                            }
                            classes={{ actions: classes.actions }}
                        />
                    )}
                    {submitStatus === 'success' && (
                        <EmptyState
                            icon={<CheckCircle fontSize={'inherit'} htmlColor={Colors.green[500]} />}
                            title={'Lesson Submitted'}
                            description={`Your lesson was submitted successfully!`}
                            actions={
                                <Button
                                    variant={'contained'}
                                    color={'primary'}
                                    onClick={(): void => {
                                        history.push(ROUTES.LESSONS);
                                    }}
                                >
                                    View Lessons
                                </Button>
                            }
                        />
                    )}
                    {submitStatus === 'failed' && (
                        <EmptyState
                            icon={<Error fontSize={'inherit'} htmlColor={Colors.red[500]} />}
                            title={'Submission Failed'}
                            description={`There was a problem completing your submission. If this problem persists, please contact us.`}
                        />
                    )}
                    {(role === 'pending' || role === 'anonymous') && (
                        <EmptyState
                            icon={<Mail fontSize={'inherit'} color={'inherit'} />}
                            title={'Verify Account'}
                            description={`You must create an account and confirm your email address before you can order lessons.`}
                        />
                    )}
                    {lessons.pending.length > 0 && submitStatus !== 'success' && (
                        <EmptyState
                            icon={<Update fontSize={'inherit'} color={'inherit'} />}
                            title={'In Progress'}
                            description={`You already have a swing analysis in progress. Please wait for that analysis to finish before submitting a new swing. We guarantee a 48-hour turnaround on all lessons.`}
                        />
                    )}
                    {getCredits === 'success' && credits < 1 && (
                        <EmptyState
                            icon={<ShoppingCart fontSize={'inherit'} color={'inherit'} />}
                            title={'Out of Credits'}
                            description={`You don't have any lessons available.`}
                            actions={
                                <Button
                                    variant={'contained'}
                                    color={'primary'}
                                    onClick={(): void => {
                                        history.push(ROUTES.ORDER);
                                    }}
                                >
                                    Order More
                                </Button>
                            }
                        />
                    )}
                </div>
            </Section>
        </>
    );
};
