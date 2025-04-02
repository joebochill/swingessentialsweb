import React, { useState, useEffect, JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, LinearProgress, Skeleton, Stack } from '@mui/material';
import { Videocam, CheckCircle, CloudUpload, Error, Mail, ShoppingCart, Update } from '@mui/icons-material';
import bg from '../../../assets/images/banners/swing3.jpg';

import { Banner } from '../../layout/Banner';
import { SectionBlurb } from '../../common/SectionBlurb';
import { Section } from '../../layout/Section';
import { PlaceholderText, PlaceHolderVideo } from './Placeholders';
import { EmptyState } from '../../common/EmptyState';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useGetCreditsQuery } from '../../../redux/apiServices/creditsService';
import { useAddLessonRequestMutation, useGetPendingLessonsQuery } from '../../../redux/apiServices/lessonsService';
import { ROUTES } from '../../../constants/routes';

export const SubmitPage: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    // useGoogleAnalyticsPageView();

    const role = useSelector((state: RootState) => state.auth.role);

    const {
        data: { count: credits = 0 } = {},
        isUninitialized: creditsUninitialized,
        isFetching: fetchingCredits,
    } = useGetCreditsQuery();
    const {
        data: { data: pendingLessons = [] } = {},
        isUninitialized: lessonsUninitialized,
        isFetching: fetchingLessons,
    } = useGetPendingLessonsQuery('');

    const [redeemLesson, { isSuccess, isError, isLoading: redeemLoading }] = useAddLessonRequestMutation();

    const [foVideo, setFoVideo] = useState<File | null>(null);
    const [dtlVideo, setDtlVideo] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    const isInitializing = creditsUninitialized || lessonsUninitialized || fetchingCredits || fetchingLessons;

    const canShowForm =
        !isInitializing &&
        (role === 'customer' || role === 'administrator') &&
        credits > 0 &&
        pendingLessons.length < 1 &&
        !isSuccess &&
        !isError &&
        !redeemLoading;

    const submitLesson = () => {
        if (role !== 'customer' && role !== 'administrator') {
            // console.log('you are not verified');
            return;
        }
        if (!lessonsUninitialized && pendingLessons.length > 0) {
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

        redeemLesson({
            data,
            progressCallback: (event: ProgressEvent) => {
                setUploadProgress((event.loaded / event.total) * 100);
            },
        });
    };

    useEffect(() => {
        setFoVideo(null);
        setDtlVideo(null);
        setDescription('');
        setUploadProgress(0);
    }, []);

    const redeemForm = (
        <>
            <Stack direction={'row'} spacing={2} sx={{ width: '100%', maxWidth: 512 }}>
                <PlaceHolderVideo
                    title={'Face-On'}
                    swingType={'fo'}
                    sx={{ flex: '1 1 0px' }}
                    onVideoChange={(video: File | null): void => {
                        setFoVideo(video);
                    }}
                />
                <PlaceHolderVideo
                    title={'Down-the-Line'}
                    swingType={'dtl'}
                    sx={{ flex: '1 1 0px' }}
                    onVideoChange={(video: File | null): void => {
                        setDtlVideo(video);
                    }}
                />
            </Stack>
            <PlaceholderText
                sx={{ alignSelf: 'stretch' }}
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
                    onClick={submitLesson}
                    disabled={redeemLoading}
                >
                    Submit
                </Button>
            )}
        </>
    );

    return (
        <>
            <Banner background={{ src: bg, position: 'right bottom' }}>
                <SectionBlurb
                    icon={<Videocam fontSize={'inherit'} />}
                    headline={'Submit Your Swing'}
                    subheading={'Request a personalized lesson'}
                    body={`Swing Essentials offers a true one-on-one experience. Our PGA golf professionals put a personal touch on each and every lesson, giving you the confidence to know that your lesson is just for you. Snap a quick video of your swing and our experts will have a lesson for you in under 48 hours!`}
                    style={{ color: 'white', zIndex: 100, maxWidth: 900 }}
                />
            </Banner>
            <Section
                gap={8}
                sx={{
                    alignItems: { xs: 'center', md: 'flex-start' },
                    flexDirection: { xs: 'column-reverse', md: 'row' },
                }}
            >
                <Stack spacing={8} sx={{ maxWidth: { xs: 'unset', md: '40%' } }}>
                    <SectionBlurb
                        headline={'Pro Tip #1'}
                        subheading={'How to submit your swing'}
                        body={`Select two videos of your golf swing from your computer: one from the face-on view and one looking down the line.`}
                        slotProps={{
                            headline: { variant: 'h5' },
                            subheading: { variant: 'caption' },
                            body: { variant: 'h6' },
                        }}
                    />
                    <SectionBlurb
                        headline={'Pro Tip #2'}
                        subheading={'Choosing a video'}
                        body={`Try to keep your video files smaller by trimming any excess footage before submitting. We also caution against using slow-motion videos as they tend to yield much larger files.`}
                        slotProps={{
                            headline: { variant: 'h5' },
                            subheading: { variant: 'caption' },
                            body: { variant: 'h6' },
                        }}
                    />
                    <SectionBlurb
                        headline={'Pro Tip #3'}
                        subheading={'Video Formats'}
                        body={`Some web browsers are not able to display a preview for the latest video format used by iPhones. We still accept these videos (just preview them on your phone before uploading).`}
                        slotProps={{
                            headline: { variant: 'h5' },
                            subheading: { variant: 'caption' },
                            body: { variant: 'h6' },
                        }}
                    />
                </Stack>
                <Stack
                    sx={{
                        flex: '1 1 0px',
                        width: '100%',
                        maxWidth: 512,
                        gap: 4,
                    }}
                >
                    {canShowForm && <>{redeemForm}</>}
                    {isInitializing ? (
                        <>
                            <Stack direction={'row'} spacing={2} sx={{ width: '100%' }}>
                                <Box sx={{ flex: '1 1 0px' }}>
                                    <Skeleton variant={'rectangular'} width={'100%'} sx={{ pt: '177.78%' }} />
                                </Box>
                                <Box sx={{ flex: '1 1 0px' }}>
                                    <Skeleton variant={'rectangular'} width={'100%'} sx={{ pt: '177.78%' }} />
                                </Box>
                            </Stack>
                            <Skeleton variant={'rectangular'} height={64} sx={{ alignSelf: 'stretch' }} />
                            <Skeleton variant={'rectangular'} height={48} sx={{ alignSelf: 'stretch' }} />
                        </>
                    ) : redeemLoading ? (
                        <EmptyState
                            icon={<CloudUpload fontSize={'inherit'} />}
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
                        />
                    ) : isSuccess ? (
                        <EmptyState
                            icon={<CheckCircle fontSize={'inherit'} sx={{ color: 'success.main' }} />}
                            title={'Lesson Submitted'}
                            description={`Your lesson was submitted successfully!`}
                            actions={
                                <Button
                                    variant={'contained'}
                                    color={'primary'}
                                    onClick={(): void => {
                                        navigate(ROUTES.LESSONS);
                                    }}
                                >
                                    View Lessons
                                </Button>
                            }
                        />
                    ) : isError ? (
                        <EmptyState
                            icon={<Error fontSize={'inherit'} sx={{ color: 'error.main' }} />}
                            title={'Submission Failed'}
                            description={`There was a problem completing your submission. If this problem persists, please contact us.`}
                        />
                    ) : role === 'pending' || role === 'anonymous' ? (
                        <EmptyState
                            icon={<Mail fontSize={'inherit'} color={'inherit'} />}
                            title={'Verify Account'}
                            description={`You must create an account and confirm your email address before you can order lessons.`}
                        />
                    ) : pendingLessons.length > 0 ? (
                        <EmptyState
                            icon={<Update fontSize={'inherit'} color={'inherit'} />}
                            title={'In Progress'}
                            description={`You already have a swing analysis in progress. Please wait for that analysis to finish before submitting a new swing. We guarantee a 48-hour turnaround on all lessons.`}
                        />
                    ) : credits < 1 && pendingLessons.length < 1 ? (
                        <EmptyState
                            icon={<ShoppingCart fontSize={'inherit'} color={'inherit'} />}
                            title={'Out of Credits'}
                            description={`You don't have any lessons available.`}
                            actions={
                                <Button
                                    variant={'contained'}
                                    color={'primary'}
                                    onClick={(): void => {
                                        navigate(ROUTES.ORDER);
                                    }}
                                >
                                    Order More
                                </Button>
                            }
                        />
                    ) : null}
                </Stack>
            </Section>
        </>
    );
};
