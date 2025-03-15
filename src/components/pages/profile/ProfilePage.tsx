import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import {
    Button,
    Typography,
    CircularProgress,
    FormControlLabel,
    Checkbox,
    MenuItem,
    FormHelperText,
    Tooltip,
    Stack,
    Box,
    Grid2,
} from '@mui/material';
import bg from '../../../assets/images/banners/landing.jpg';
import swing from '../../../assets/images/banners/swing3.jpg';
import order from '../../../assets/images/banners/order.jpg';
import lessonsImg from '../../../assets/images/banners/lessons2.jpg';
import { format } from 'date-fns';
import { RootState } from '../../../redux/store';
import { ROUTES } from '../../../constants/routes';
import {
    BLANK_USER,
    useGetUserDetailsQuery,
    useUpdateUserDetailsMutation,
    Level2UserDetailsApiResponse,
} from '../../../redux/apiServices/userDetailsService';
import { StyledTextField, StyledDatePicker } from '../../common/StyledInputs';
import { Banner } from '../../layout/Banner';
import { Section } from '../../layout/Section';
import { InfoCard } from '../../navigation/InfoCard';
import { AvatarChanger } from './AvatarPicker';
import { ChangePassword } from './ChangePassword';
import { ScoreRange } from '../../../__types__/data';

// TODO: simplify settings logic to be locally scoped and use skeletons on first load
export const ProfileForm: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth);

    const { data: user = BLANK_USER, isSuccess: hasUserData } = useGetUserDetailsQuery();

    const [success, setSuccess] = useState(false);

    const [updateUserDetails, { isLoading: updatingDetails, isError: detailsError, isSuccess: updatedDetails }] =
        useUpdateUserDetailsMutation();

    useEffect(() => {
        let timeout: number | undefined;
        if (updatedDetails && !updatingDetails) {
            setSuccess(true);
            timeout = setTimeout(() => {
                setSuccess(false);
            }, 5000);
        }

        // Cleanup function to clear the timeout
        return () => {
            clearTimeout(timeout);
        };
    }, [updatedDetails, updatingDetails]);

    const isLoading = updatingDetails;

    const error = detailsError;
    const {
        notify_new_lesson: lessons,
        notify_marketing: marketing,
        notify_newsletter: newsletter,
        notify_reminders: reminders,
    } = user;

    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [location, setLocation] = useState('');
    const [birthday, setBirthday] = useState<Date | null>(null);
    const [birthdayString, setBirthdayString] = useState('');
    const [average, setAverage] = useState<ScoreRange | ''>('');
    const [email, setEmail] = useState('');

    const [goals, setGoals] = useState('');

    const [sendLessons, setSendLessons] = useState<0 | 1>(0);
    const [sendMarketing, setSendMarketing] = useState<0 | 1>(0);
    const [sendNewsletter, setSendNewsletter] = useState<0 | 1>(0);
    const [sendReminders, setSendReminders] = useState<0 | 1>(0);

    const [initialized, setInitialized] = useState(false);

    const changes =
        first !== user.first ||
        last !== user.last ||
        location !== user.location ||
        email !== user.email ||
        goals !== user.goals ||
        birthdayString !== user.birthday ||
        average !== user.average ||
        sendLessons !== lessons ||
        sendMarketing !== marketing ||
        sendNewsletter !== newsletter ||
        sendReminders !== reminders;

    useEffect(() => {
        if (!initialized && hasUserData) {
            setFirst(user.first);
            setLast(user.last);
            setLocation(user.location || '');
            setEmail(user.email);
            setGoals(user.goals || '');
            setAverage(user.average || '');
            setBirthday(user.birthday ? new Date(user.birthday) : null);
            setBirthdayString(user.birthday ? format(new Date(user.birthday), 'MM/dd/yyyy') : '');
            setSendLessons(lessons ?? false);
            setSendMarketing(marketing ?? false);
            setSendNewsletter(newsletter ?? false);
            setSendReminders(reminders ?? false);
            setInitialized(true);
        }
    }, [hasUserData, initialized]);

    return (
        <Stack sx={{ flex: '1 1 0px', gap: 2 }}>
            <Stack>
                <Typography variant={'h5'}>Welcome to the Swing Essentials family!</Typography>
                <Typography>Help us get to know you by filling out your profile below.</Typography>
            </Stack>

            <Typography variant={'subtitle1'} sx={{ fontWeight: 600 }}>
                About Me:
            </Typography>
            <Stack
                sx={{
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                }}
            >
                <StyledTextField
                    label={'First Name'}
                    name={'first-name'}
                    value={first}
                    onChange={(e): void => {
                        setFirst(e.target.value.replace(/[^A-Z-' ]/gi, '').substr(0, 32));
                    }}
                    sx={{ flex: '1 1 0px' }}
                />
                <StyledTextField
                    label={'Last Name'}
                    name={'last-name'}
                    value={last}
                    onChange={(e): void => {
                        setLast(e.target.value.replace(/[^A-Z-' ]/gi, '').substr(0, 32));
                    }}
                    sx={{ flex: '1 1 0px' }}
                />
            </Stack>
            <Stack
                sx={{
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                }}
            >
                <StyledTextField
                    label={'Location'}
                    name={'location'}
                    placeholder={'e.g. Portland, OR'}
                    value={location}
                    onChange={(e): void => {
                        setLocation(e.target.value.replace(/[^A-Z-', ]/gi, '').substr(0, 64));
                    }}
                    sx={{ flex: '1 1 0px' }}
                />
                <StyledDatePicker
                    disableFuture
                    openTo="year"
                    format="MM/dd/yyyy"
                    label="Date of Birth"
                    views={['year', 'month', 'day']}
                    value={birthday}
                    onChange={(value: Date | null): void => {
                        setBirthday(value);
                        setBirthdayString(value ? format(value, 'MM/dd/yyyy') : '');
                    }}
                    sx={{ flex: '1 1 0px' }}
                />
            </Stack>
            <Stack
                sx={{
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                }}
            >
                <StyledTextField
                    disabled
                    label={`Email Address ${
                        auth.role !== 'customer' && auth.role !== 'administrator' ? '(unverified)' : ''
                    }`}
                    name={'email'}
                    value={email}
                    onChange={(e): void => {
                        setEmail(e.target.value.substr(0, 128));
                    }}
                    sx={{ flex: '1 1 0px' }}
                />
                <StyledTextField
                    select
                    variant={'filled'}
                    label={`Average Score (18 holes)`}
                    value={average}
                    sx={{ flex: '1 1 0px' }}
                    onChange={(e): void => setAverage(e.target.value as ScoreRange)}
                >
                    <MenuItem disabled value={''} sx={{ p: 0, m: 0, height: 0 }}></MenuItem>
                    <MenuItem value={60}>Under 70</MenuItem>
                    <MenuItem value={70}>70-79</MenuItem>
                    <MenuItem value={80}>80-89</MenuItem>
                    <MenuItem value={90}>90-99</MenuItem>
                    <MenuItem value={100}>100-149</MenuItem>
                    <MenuItem value={150}>150+</MenuItem>
                </StyledTextField>
            </Stack>
            <StyledTextField
                multiline
                rows={4}
                slotProps={{ htmlInput: { maxLength: 255 } }}
                label={'What are your goals?'}
                name={'goals'}
                placeholder={
                    'e.g. I want to... finally beat my friend, shoot under 100, stay active, get back to the sport after a long break'
                }
                value={goals}
                onChange={(e): void => {
                    setGoals(e.target.value.substr(0, 256));
                }}
            />
            <FormHelperText
                color={'default'}
                sx={{ color: 'primary.contrastText', textAlign: 'right', mt: -1.5 }}
            >{`${255 - goals.length} characters left`}</FormHelperText>

            <Typography variant={'subtitle1'} sx={{ fontWeight: 600 }}>
                Email Notifications:
            </Typography>

            <Stack
                sx={{
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                <Tooltip title={'Whenever a swing analysis is posted or updated'} placement={'top'}>
                    <FormControlLabel
                        labelPlacement="start"
                        control={
                            <Checkbox
                                checked={Boolean(sendLessons)}
                                color={'default'}
                                sx={{ color: 'primary.contrastText' }}
                                onChange={(e): void => setSendLessons(e.target.checked ? 1 : 0)}
                            />
                        }
                        sx={{ m: 0 }}
                        label="Lessons"
                    />
                </Tooltip>
                <Tooltip title={'Messages about upcoming sales, events, etc.'} placement={'top'}>
                    <FormControlLabel
                        labelPlacement="start"
                        control={
                            <Checkbox
                                checked={Boolean(sendMarketing)}
                                color={'default'}
                                sx={{ color: 'primary.contrastText' }}
                                onChange={(e): void => setSendMarketing(e.target.checked ? 1 : 0)}
                            />
                        }
                        sx={{ m: 0 }}
                        label="Marketing"
                    />
                </Tooltip>
                <Tooltip title={'Periodic messages with news, tips, or other goings on'} placement={'top'}>
                    <FormControlLabel
                        labelPlacement="start"
                        control={
                            <Checkbox
                                checked={Boolean(sendNewsletter)}
                                color={'default'}
                                sx={{ color: 'primary.contrastText' }}
                                onChange={(e): void => setSendNewsletter(e.target.checked ? 1 : 0)}
                            />
                        }
                        sx={{ m: 0 }}
                        label="Newsletters"
                    />
                </Tooltip>
                <Tooltip title={'Friendly reminders about things you may have missed'} placement={'top'}>
                    <FormControlLabel
                        labelPlacement="start"
                        control={
                            <Checkbox
                                checked={Boolean(sendReminders)}
                                color={'default'}
                                sx={{ color: 'primary.contrastText' }}
                                onChange={(e): void => setSendReminders(e.target.checked ? 1 : 0)}
                            />
                        }
                        sx={{ m: 0 }}
                        label="Reminders"
                    />
                </Tooltip>
            </Stack>
            <Box
                style={{
                    textAlign: 'center',
                    minHeight: 36,
                }}
            >
                {initialized && changes && !isLoading && (
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={
                            changes
                                ? (): void => {
                                      const newChanges: Partial<Level2UserDetailsApiResponse> = {};
                                      if (first !== user.first) newChanges.first = first;
                                      if (last !== user.last) newChanges.last = last;
                                      if (location !== user.location) newChanges.location = location;
                                      if (goals !== user.goals) newChanges.goals = goals;
                                      if (average !== user.average) newChanges.average = average as ScoreRange;
                                      if (birthdayString !== user.birthday) newChanges.birthday = birthdayString;
                                      if (email !== user.email) newChanges.email = email;
                                      if (sendLessons !== lessons) newChanges.notify_new_lesson = sendLessons;
                                      if (sendMarketing !== marketing) newChanges.notify_marketing = sendMarketing;
                                      if (sendNewsletter !== newsletter) newChanges.notify_newsletter = sendNewsletter;
                                      if (sendReminders !== reminders) newChanges.notify_reminders = sendReminders;

                                      if (Object.keys(newChanges).length > 0) {
                                          updateUserDetails(newChanges);
                                      }
                                  }
                                : undefined
                        }
                    >
                        Save Changes
                    </Button>
                )}
                {isLoading && <CircularProgress color={'inherit'} />}
                {success && !changes && <Typography variant={'caption'}>Success!</Typography>}
                {error && !changes && <Typography variant={'caption'}>Failed to update profile</Typography>}
            </Box>
        </Stack>
    );
};

export const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    // useGoogleAnalyticsPageView();

    const { token, initialized } = useSelector((state: RootState) => state.auth);

    const { data: user = BLANK_USER } = useGetUserDetailsQuery();

    const joined = new Date(user.joined * 1000).getFullYear();

    if (initialized && !token) return <Navigate to={ROUTES.LOGIN} replace />;

    return (
        <>
            <Banner background={{ src: bg, position: 'center 70%' }} contentPosition="static" justifyContent={'center'}>
                {!initialized && (
                    <Box sx={{ color: 'inherit' }}>
                        <CircularProgress color={'inherit'} />
                    </Box>
                )}
                {initialized && (
                    <Stack
                        sx={{
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: { xs: 'center', md: 'stretch' },
                            width: '100%',
                            maxWidth: 1024,
                            color: 'primary.contrastText',
                            gap: { xs: 4, md: 8 },
                        }}
                    >
                        <Box
                            sx={{
                                flex: '0 0 auto',
                                textAlign: 'center',
                            }}
                        >
                            <AvatarChanger />
                            <Box sx={{ mt: 2 }}>
                                <Typography variant={'h5'} sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                                    {`${user.first} ${user.last}`}
                                </Typography>
                                <Typography variant={'h6'} sx={{ lineHeight: 1.2 }}>
                                    {user.username}
                                </Typography>
                                <Typography variant={'caption'} display={'block'}>
                                    {`Member since ${joined}`}
                                </Typography>
                                <ChangePassword sx={{ mt: 2 }} />
                            </Box>
                        </Box>

                        <ProfileForm />
                    </Stack>
                )}
            </Banner>

            <Section>
                <Grid2 container justifyContent={'center'} alignContent={'stretch'} sx={{ m: -6 }}>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <InfoCard
                            src={lessonsImg}
                            title={'Your Lessons'}
                            aspectRatio={'16x9'}
                            backgroundPosition={'right center'}
                            description={'Check out all of your past lessons and see your progress.'}
                            onClick={(): void => {
                                navigate(ROUTES.LESSONS);
                            }}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <InfoCard
                            src={order}
                            title={'Order More'}
                            aspectRatio={'16x9'}
                            backgroundPosition={'center center'}
                            description={'Buy a single lesson or purchase in bulk for a discount.'}
                            onClick={(): void => {
                                navigate(ROUTES.ORDER);
                            }}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <InfoCard
                            src={swing}
                            title={'Submit Your Swing'}
                            aspectRatio={'16x9'}
                            backgroundPosition={'left center'}
                            description={'Send in your swing videos today to receive a professional analysis.'}
                            onClick={(): void => {
                                navigate(ROUTES.SUBMIT);
                            }}
                        />
                    </Grid2>
                </Grid2>
            </Section>
        </>
    );
};
