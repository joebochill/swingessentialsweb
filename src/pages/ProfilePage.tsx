import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useGoogleAnalyticsPageView } from '../../src/hooks';
import { Navigate, useNavigate } from "react-router-dom";
// import { AppState, ScoreRange } from '../../src/__types__';
// import { SET_USER_DATA, SET_USER_NOTIFICATIONS } from '../redux/actions/types';
// import { setUserData, UserDataChange } from '../redux/actions/user-data-actions';
// import { setUserNotifications } from '../redux/actions/user-settings-actions';
import { ROUTES } from "../../src/constants/routes";
// import { AvatarChanger } from '../components/dialogs/AvatarPicker';
// import { ChangePassword } from '../components/dialogs/ChangePassword';
import { Section } from "../components/display/Section";
import { InfoCard } from "../components/display/InfoCard";
import {
  StyledDatePicker,
  StyledTextField,
} from "../components/text/StyledInputs";
import { Banner } from "../components/display/Banner";
// import { Spacer } from '@pxblue/react-components';
import {
  makeStyles,
  createStyles,
  Button,
  Theme,
  Typography,
  CircularProgress,
  Grid,
  FormControlLabel,
  useTheme,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  useMediaQuery,
  FormHelperText,
  Tooltip,
  Stack,
  Box,
  Grid2,
} from "@mui/material";
import bg from "../assets/images/banners/landing.jpg";
import swing from "../assets/images/banners/swing3.jpg";
import order from "../assets/images/banners/order.jpg";
import lessonsImg from "../assets/images/banners/lessons2.jpg";
// import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
// import { FlexFlipper } from '../components/display/FlexFlipper';
import { format } from "date-fns";
import { RootState } from "../redux/store";
import { ChangePassword } from "../components/dialogs/ChangePassword";

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         root: {
//             display: 'flex',
//             width: '100%',
//             maxWidth: 1024,
//             color: 'white',
//             [theme.breakpoints.down('sm')]: {
//                 flexDirection: 'column',
//                 alignItems: 'center',
//             },
//         },
//         imageWrapper: {
//             flex: '0 0 auto',
//             textAlign: 'center',
//         },
//         name: {
//             marginTop: theme.spacing(2),
//         },
//         aboutMe: {
//             flex: '1 1 0px',
//         },
//         tooltip: {
//             backgroundColor: '#231f61',
//             margin: 0,
//         },
//     })
// );

// export const ProfileForm: React.FC = () => {
//     const dispatch = useDispatch();
//     const classes = useStyles();
//     const theme = useTheme();
//     const sm = useMediaQuery(theme.breakpoints.down('sm'));

//     const auth = useSelector((state: AppState) => state.auth);
//     const user = useSelector((state: AppState) => state.user);
//     const settings = useSelector((state: AppState) => state.settings);
//     const { lessons, marketing, newsletter, reminders } = settings.notifications || {
//         lessons: true,
//         marketing: true,
//         newsletter: true,
//         reminders: true,
//     };
//     const updateData = useSelector((state: AppState) => state.api.updateUserData.status);
//     const updateSettings = useSelector((state: AppState) => state.api.updateUserSettings.status);

//     const loading = updateData === 'loading' || updateSettings === 'loading';
//     const failure = updateData === 'failed' || updateSettings === 'failed';
//     const success =
//         (updateData === 'success' && (updateSettings === 'success' || updateSettings === 'initial')) ||
//         (updateSettings === 'success' && (updateData === 'success' || updateData === 'initial'));

//     const [first, setFirst] = useState('');
//     const [last, setLast] = useState('');
//     const [location, setLocation] = useState('');
//     const [birthday, setBirthday] = useState<MaterialUiPickersDate>(null);
//     const [birthdayString, setBirthdayString] = useState('');
//     const [average, setAverage] = useState<ScoreRange | ''>('');
//     // const [phone, setPhone] = useState('');
//     const [email, setEmail] = useState('');

//     const [goals, setGoals] = useState('');

//     // const [sendEmails, setSendEmails] = useState(true);
//     const [sendLessons, setSendLessons] = useState(true);
//     const [sendMarketing, setSendMarketing] = useState(true);
//     const [sendNewsletter, setSendNewsletter] = useState(true);
//     const [sendReminders, setSendReminders] = useState(true);

//     const [initialized, setInitialized] = useState(false);

//     const changes =
//         first !== user.firstName ||
//         last !== user.lastName ||
//         location !== user.location ||
//         // phone !== user.phone ||
//         email !== user.email ||
//         goals !== user.goals ||
//         birthdayString !== user.birthday ||
//         average !== user.average ||
//         sendLessons !== lessons ||
//         sendMarketing !== marketing ||
//         sendNewsletter !== newsletter ||
//         sendReminders !== reminders;

//     useEffect(() => {
//         if (!initialized && user.username && settings.notifications !== undefined) {
//             setFirst(user.firstName);
//             setLast(user.lastName);
//             setLocation(user.location || '');
//             // setPhone(user.phone || '');
//             setEmail(user.email);
//             setGoals(user.goals || '');
//             setAverage(user.average || '');
//             setBirthday(user.birthday ? new Date(user.birthday) : null);
//             setBirthdayString(user.birthday ? format(new Date(user.birthday), 'MM/dd/yyyy') : '');
//             setSendLessons(lessons || false);
//             setSendMarketing(marketing || false);
//             setSendNewsletter(newsletter || false);
//             setSendReminders(reminders || false);
//             setInitialized(true);
//         }
//     }, [user, settings, initialized]);

//     return (
//         <div className={classes.aboutMe}>
//             <Typography variant={'h5'}>Welcome to the Swing Essentials family!</Typography>
//             <Typography paragraph>Help us get to know you by filling out your profile below.</Typography>

//             <Typography
//                 variant={'subtitle1'}
//                 style={{ fontWeight: 600, marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}
//             >
//                 About Me:
//             </Typography>
//             <FlexFlipper>
//                 <StyledTextField
//                     label={'First Name'}
//                     name={'first-name'}
//                     value={first}
//                     onChange={(e): void => {
//                         setFirst(e.target.value.replace(/[^A-Z-' ]/gi, '').substr(0, 32));
//                     }}
//                     style={{ flex: '1 1 0px' }}
//                     fullWidth={sm}
//                 />
//                 <Spacer classes={{}} flex={0} width={theme.spacing(2)} />
//                 <StyledTextField
//                     label={'Last Name'}
//                     name={'last-name'}
//                     value={last}
//                     onChange={(e): void => {
//                         setLast(e.target.value.replace(/[^A-Z-' ]/gi, '').substr(0, 32));
//                     }}
//                     style={{ flex: '1 1 0px' }}
//                     fullWidth={sm}
//                 />
//             </FlexFlipper>
//             <FlexFlipper>
//                 <StyledTextField
//                     label={'Location'}
//                     name={'location'}
//                     placeholder={'e.g. Portland, OR'}
//                     value={location}
//                     onChange={(e): void => {
//                         setLocation(e.target.value.replace(/[^A-Z-', ]/gi, '').substr(0, 64));
//                     }}
//                     style={{ flex: '1 1 0px' }}
//                     fullWidth={sm}
//                 />
//                 <Spacer classes={{}} flex={0} width={theme.spacing(2)} />
//                 <StyledDatePicker
//                     disableFuture
//                     clearable
//                     openTo="year"
//                     initialFocusedDate={new Date(315550800000)} // 1/1/1980
//                     format="MM/dd/yyyy"
//                     label="Date of Birth"
//                     views={['year', 'month', 'date']}
//                     value={birthday}
//                     onChange={(value: MaterialUiPickersDate): void => {
//                         setBirthday(value);
//                         setBirthdayString(value ? format(value, 'MM/dd/yyyy') : '');
//                     }}
//                     style={{ flex: '1 1 0px' }}
//                     fullWidth={sm}
//                 />
//             </FlexFlipper>
//             {/* <StyledTextField
//                 label={'Phone Number'}
//                 name={'phone'}
//                 placeholder={'e.g. 123-456-7890'}
//                 value={phone}
//                 onChange={(e): void => {
//                     setPhone(e.target.value.replace(/[^0-9- +().]/gi, '').substr(0, 20));
//                 }}
//             /> */}
//             <FlexFlipper>
//                 <StyledTextField
//                     disabled
//                     label={`Email Address ${
//                         auth.role !== 'customer' && auth.role !== 'administrator' ? '(unverified)' : ''
//                     }`}
//                     name={'email'}
//                     value={email}
//                     onChange={(e): void => {
//                         setEmail(e.target.value.substr(0, 128));
//                     }}
//                     style={{ flex: '1 1 0px' }}
//                     fullWidth={sm}
//                 />
//                 <Spacer classes={{}} flex={0} width={theme.spacing(2)} />
//                 <FormControl variant="filled" style={{ flex: '1 1 0px' }} fullWidth={sm}>
//                     <InputLabel id="average-label">{`Average Score (18 holes)`}</InputLabel>
//                     <StyledSelect
//                         labelId="average-label"
//                         value={average}
//                         onChange={(e): void => setAverage(e.target.value as ScoreRange)}
//                     >
//                         <MenuItem disabled value={''} style={{ padding: 0, margin: 0, height: 0 }}></MenuItem>
//                         <MenuItem value={60}>Under 70</MenuItem>
//                         <MenuItem value={70}>70-79</MenuItem>
//                         <MenuItem value={80}>80-89</MenuItem>
//                         <MenuItem value={90}>90-99</MenuItem>
//                         <MenuItem value={100}>100-149</MenuItem>
//                         <MenuItem value={150}>150+</MenuItem>
//                     </StyledSelect>
//                 </FormControl>
//             </FlexFlipper>
//             <StyledTextField
//                 last
//                 multiline
//                 rows={4}
//                 rowsMax={4}
//                 inputProps={{ maxLength: 255 }}
//                 label={'What are your goals?'}
//                 name={'goals'}
//                 placeholder={
//                     'e.g. I want to... finally beat my friend, shoot under 100, stay active, get back to the sport after a long break'
//                 }
//                 value={goals}
//                 onChange={(e): void => {
//                     setGoals(e.target.value.substr(0, 256));
//                 }}
//             />
//             <FormHelperText color={'default'} style={{ color: 'white', textAlign: 'right' }}>{`${
//                 255 - goals.length
//             } characters left`}</FormHelperText>

//             <Typography
//                 variant={'subtitle1'}
//                 style={{ fontWeight: 600, marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}
//             >
//                 Email Notifications:
//             </Typography>

//             <div>
//                 <Tooltip
//                     title={'Whenever a swing analysis is posted or updated'}
//                     classes={{ tooltip: classes.tooltip }}
//                     placement={'bottom'}
//                 >
//                     <FormControlLabel
//                         labelPlacement="start"
//                         control={
//                             <Checkbox
//                                 checked={sendLessons}
//                                 color={'default'}
//                                 style={{ color: 'white' }}
//                                 onChange={(e): void => setSendLessons(e.target.checked)}
//                             />
//                         }
//                         label="Lessons"
//                         style={{ margin: 8 }}
//                     />
//                 </Tooltip>
//                 <Tooltip
//                     title={'Messages about upcoming sales, events, etc.'}
//                     classes={{ tooltip: classes.tooltip }}
//                     placement={'bottom'}
//                 >
//                     <FormControlLabel
//                         labelPlacement="start"
//                         control={
//                             <Checkbox
//                                 checked={sendMarketing}
//                                 color={'default'}
//                                 style={{ color: 'white' }}
//                                 onChange={(e): void => setSendMarketing(e.target.checked)}
//                             />
//                         }
//                         label="Marketing"
//                         style={{ margin: 8 }}
//                     />
//                 </Tooltip>
//                 <Tooltip
//                     title={'Periodic messages with news, tips, or other goings on'}
//                     classes={{ tooltip: classes.tooltip }}
//                     placement={'bottom'}
//                 >
//                     <FormControlLabel
//                         labelPlacement="start"
//                         control={
//                             <Checkbox
//                                 checked={sendNewsletter}
//                                 color={'default'}
//                                 style={{ color: 'white' }}
//                                 onChange={(e): void => setSendNewsletter(e.target.checked)}
//                             />
//                         }
//                         label="Newsletters"
//                         style={{ margin: 8 }}
//                     />
//                 </Tooltip>
//                 <Tooltip
//                     title={'Friendly reminders about things you may have missed'}
//                     classes={{ tooltip: classes.tooltip }}
//                     placement={'bottom'}
//                 >
//                     <FormControlLabel
//                         labelPlacement="start"
//                         control={
//                             <Checkbox
//                                 checked={sendReminders}
//                                 color={'default'}
//                                 style={{ color: 'white' }}
//                                 onChange={(e): void => setSendReminders(e.target.checked)}
//                             />
//                         }
//                         label="Reminders"
//                         style={{ margin: 8 }}
//                     />
//                 </Tooltip>
//             </div>
//             <div style={{ textAlign: 'center', marginTop: theme.spacing(2), minHeight: 36 }}>
//                 {initialized && changes && !loading && (
//                     <Button
//                         color={'primary'}
//                         variant={'contained'}
//                         onClick={
//                             changes
//                                 ? (): void => {
//                                       dispatch({ type: SET_USER_DATA.RESET });
//                                       dispatch({ type: SET_USER_NOTIFICATIONS.RESET });
//                                       const newChanges: UserDataChange = {};
//                                       if (first !== user.firstName) newChanges.firstName = first;
//                                       if (last !== user.lastName) newChanges.lastName = last;
//                                       if (location !== user.location) newChanges.location = location;
//                                       if (goals !== user.goals) newChanges.goals = goals;
//                                       if (average !== user.average) newChanges.average = average;
//                                       if (birthdayString !== user.birthday) newChanges.birthday = birthdayString;
//                                       // if (phone !== user.phone) newChanges.phone = phone;

//                                       if (Object.keys(newChanges).length > 0) {
//                                           dispatch(setUserData(newChanges));
//                                       }
//                                       if (email !== user.email) {
//                                           // dispatch change email request
//                                       }
//                                       if (
//                                           sendLessons !== lessons ||
//                                           sendMarketing !== marketing ||
//                                           sendNewsletter !== newsletter ||
//                                           sendReminders !== reminders
//                                       ) {
//                                           dispatch(
//                                               setUserNotifications({
//                                                   /* eslint-disable @typescript-eslint/naming-convention */
//                                                   notify_new_lessons: sendLessons,
//                                                   notify_marketing: sendMarketing,
//                                                   notify_newsletter: sendNewsletter,
//                                                   notify_reminders: sendReminders,
//                                                   /* eslint-enable @typescript-eslint/naming-convention */
//                                               })
//                                           );
//                                       }
//                                   }
//                                 : undefined
//                         }
//                     >
//                         Save Changes
//                     </Button>
//                 )}
//                 {loading && <CircularProgress color={'inherit'} />}
//                 {success && !changes && <Typography variant={'caption'}>Success!</Typography>}
//                 {failure && !changes && <Typography variant={'caption'}>Failed to update profile</Typography>}
//             </div>
//         </div>
//     );
// };

export const ProfilePage: React.FC = () => {
  // const classes = useStyles();
  const navigate = useNavigate();
  // const theme = useTheme();
  // useGoogleAnalyticsPageView();

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.userDetails);
  // const loaded = useSelector((state: AppState) => state.api.authentication.initialized);
  // const user = useSelector((state: AppState) => state.user);

  // const [initialized, setInitialized] = useState(false);
  const initialized = Boolean(user.username);

  const joined = new Date(user.joined * 1000).getFullYear();

  // useEffect(() => {
  //     if (!initialized && user.username) {
  //         setInitialized(true);
  //     }
  // }, [user, initialized, setInitialized]);

  if (/*loaded &&*/ !token) return <Navigate to={ROUTES.LOGIN} replace />;

  return (
    <>
      <Banner
        background={{ src: bg, position: "center 70%" }}
        justifyContent={"center"}
      >
        {!initialized && (
          <div style={{ color: "white" }}>
            <CircularProgress color={"inherit"} />
          </div>
        )}
        {initialized && (
          <Stack
            sx={{
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "center", md: "stretch" },
              width: "100%",
              maxWidth: 1024,
              color: "primary.contrastText",
              gap: { xs: 4, md: 8 },
            }}
          >
            <Box
              sx={{
                flex: "0 0 auto",
                textAlign: "center",
              }}
            >
              {/* <AvatarChanger /> */}
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant={"h5"}
                  sx={{ fontWeight: 700, lineHeight: 1.3 }}
                >
                  {`${user.firstName} ${user.lastName}`}
                </Typography>
                <Typography variant={"h6"} sx={{ lineHeight: 1.2 }}>
                  {user.username}
                </Typography>
                <Typography variant={"caption"} display={"block"}>
                  {`Member since ${joined}`}
                </Typography>
                <ChangePassword sx={{ mt: 2 }} />
              </Box>
            </Box>

            {/* <Spacer classes={{}} flex={0} width={theme.spacing(8)} height={theme.spacing(4)} /> */}

            {/* <ProfileForm /> */}
          </Stack>
        )}
      </Banner>

      <Section>
        <Grid2
          container
          justifyContent={"center"}
          alignContent={"stretch"}
          sx={{ m: -6 }}
        >
          <Grid2 size={{ xs: 12, md: 4 }}>
            <InfoCard
              src={lessonsImg}
              title={"Your Lessons"}
              aspectRatio={"16x9"}
              backgroundPosition={"right center"}
              description={
                "Check out all of your past lessons and see your progress."
              }
              onClick={(): void => {
                navigate(ROUTES.LESSONS);
              }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <InfoCard
              src={order}
              title={"Order More"}
              aspectRatio={"16x9"}
              backgroundPosition={"center center"}
              description={
                "Buy a single lesson or purchase in bulk for a discount."
              }
              onClick={(): void => {
                navigate(ROUTES.ORDER);
              }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <InfoCard
              src={swing}
              title={"Submit Your Swing"}
              aspectRatio={"16x9"}
              backgroundPosition={"left center"}
              description={
                "Send in your swing videos today to receive a professional analysis."
              }
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
