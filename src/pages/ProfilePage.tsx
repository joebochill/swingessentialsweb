import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { useGoogleAnalyticsPageView } from '../../src/hooks';
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../src/constants/routes";
import { Section } from "../components/display/Section";
import { InfoCard } from "../components/display/InfoCard";
import {
  StyledDatePicker,
  StyledTextField,
} from "../components/text/StyledInputs";
import { Banner } from "../components/display/Banner";
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
} from "@mui/material";
import bg from "../assets/images/banners/landing.jpg";
import swing from "../assets/images/banners/swing3.jpg";
import order from "../assets/images/banners/order.jpg";
import lessonsImg from "../assets/images/banners/lessons2.jpg";
import { format } from "date-fns";
import { RootState } from "../redux/store";
import { ChangePassword } from "../components/dialogs/ChangePassword";
import { AvatarChanger } from "../components/dialogs/AvatarPicker";
import { ScoreRange } from "../__types__";
import {
  useGetUserSettingsQuery,
  useUpdateUserNotificationsMutation,
} from "../redux/apiServices/userSettingsService";
import {
  UserDataChange,
  useUpdateUserDetailsMutation,
} from "../redux/apiServices/userDetailsService";

// TODO: simplify settings logic to be locally scoped and use skeletons on first load
export const ProfileForm: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.userDetails);
  const { data: settings } = useGetUserSettingsQuery();

  const [success, setSuccess] = useState(false);

  const [
    updateUserDetails,
    {
      isLoading: updatingDetails,
      isError: detailsError,
      isSuccess: updatedDetails,
    },
  ] = useUpdateUserDetailsMutation();
  const [
    updateUserNotifications,
    {
      isLoading: updatingSettings,
      isError: settingsError,
      isSuccess: updatedSettings,
    },
  ] = useUpdateUserNotificationsMutation();

  useEffect(() => {
    let timeout: number | undefined;
    if (
      (updatedSettings || updatedDetails) &&
      !updatingDetails &&
      !updatingSettings
    ) {
      setSuccess(true);
      timeout = setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(timeout);
    };
  }, [updatedDetails, updatedSettings, updatingDetails, updatingSettings]);

  const isLoading = updatingSettings || updatingDetails;

  const error = settingsError || detailsError;
  const { lessons, marketing, newsletter, reminders } =
    settings?.notifications || {
      lessons: true,
      marketing: true,
      newsletter: true,
      reminders: true,
    };

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [location, setLocation] = useState("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [birthdayString, setBirthdayString] = useState("");
  const [average, setAverage] = useState<ScoreRange | "">("");
  const [email, setEmail] = useState("");

  const [goals, setGoals] = useState("");

  const [sendLessons, setSendLessons] = useState(true);
  const [sendMarketing, setSendMarketing] = useState(true);
  const [sendNewsletter, setSendNewsletter] = useState(true);
  const [sendReminders, setSendReminders] = useState(true);

  const [initialized, setInitialized] = useState(false);

  const changes =
    first !== user.firstName ||
    last !== user.lastName ||
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
    if (!initialized && user && settings) {
      setFirst(user.firstName);
      setLast(user.lastName);
      setLocation(user.location || "");
      setEmail(user.email);
      setGoals(user.goals || "");
      setAverage(user.average || "");
      setBirthday(user.birthday ? new Date(user.birthday) : null);
      setBirthdayString(
        user.birthday ? format(new Date(user.birthday), "MM/dd/yyyy") : ""
      );
      setSendLessons(lessons || false);
      setSendMarketing(marketing || false);
      setSendNewsletter(newsletter || false);
      setSendReminders(reminders || false);
      setInitialized(true);
    }
  }, [user.username, settings, initialized]);

  return (
    <Stack sx={{ flex: "1 1 0px", gap: 2 }}>
      <Stack>
        <Typography variant={"h5"}>
          Welcome to the Swing Essentials family!
        </Typography>
        <Typography>
          Help us get to know you by filling out your profile below.
        </Typography>
      </Stack>

      <Typography variant={"subtitle1"} sx={{ fontWeight: 600 }}>
        About Me:
      </Typography>
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <StyledTextField
          label={"First Name"}
          name={"first-name"}
          value={first}
          onChange={(e): void => {
            setFirst(e.target.value.replace(/[^A-Z-' ]/gi, "").substr(0, 32));
          }}
          sx={{ flex: "1 1 0px" }}
        />
        <StyledTextField
          label={"Last Name"}
          name={"last-name"}
          value={last}
          onChange={(e): void => {
            setLast(e.target.value.replace(/[^A-Z-' ]/gi, "").substr(0, 32));
          }}
          sx={{ flex: "1 1 0px" }}
        />
      </Stack>
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <StyledTextField
          label={"Location"}
          name={"location"}
          placeholder={"e.g. Portland, OR"}
          value={location}
          onChange={(e): void => {
            setLocation(
              e.target.value.replace(/[^A-Z-', ]/gi, "").substr(0, 64)
            );
          }}
          sx={{ flex: "1 1 0px" }}
        />
        <StyledDatePicker
          disableFuture
          openTo="year"
          format="MM/dd/yyyy"
          label="Date of Birth"
          views={["year", "month", "day"]}
          value={birthday}
          onChange={(value: Date): void => {
            setBirthday(value);
            setBirthdayString(value ? format(value, "MM/dd/yyyy") : "");
          }}
          sx={{ flex: "1 1 0px" }}
        />
      </Stack>
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <StyledTextField
          disabled
          label={`Email Address ${
            auth.role !== "customer" && auth.role !== "administrator"
              ? "(unverified)"
              : ""
          }`}
          name={"email"}
          value={email}
          onChange={(e): void => {
            setEmail(e.target.value.substr(0, 128));
          }}
          sx={{ flex: "1 1 0px" }}
        />
        <StyledTextField
          select
          variant={"filled"}
          label={`Average Score (18 holes)`}
          value={average}
          sx={{ flex: "1 1 0px" }}
          onChange={(e): void => setAverage(e.target.value as ScoreRange)}
        >
          <MenuItem
            disabled
            value={""}
            sx={{ p: 0, m: 0, height: 0 }}
          ></MenuItem>
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
        label={"What are your goals?"}
        name={"goals"}
        placeholder={
          "e.g. I want to... finally beat my friend, shoot under 100, stay active, get back to the sport after a long break"
        }
        value={goals}
        onChange={(e): void => {
          setGoals(e.target.value.substr(0, 256));
        }}
      />
      <FormHelperText
        color={"default"}
        sx={{ color: "primary.contrastText", textAlign: "right", mt: -1.5 }}
      >{`${255 - goals.length} characters left`}</FormHelperText>

      <Typography variant={"subtitle1"} sx={{ fontWeight: 600 }}>
        Email Notifications:
      </Typography>

      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Tooltip
          title={"Whenever a swing analysis is posted or updated"}
          placement={"top"}
        >
          <FormControlLabel
            labelPlacement="start"
            control={
              <Checkbox
                checked={sendLessons}
                color={"default"}
                sx={{ color: "primary.contrastText" }}
                onChange={(e): void => setSendLessons(e.target.checked)}
              />
            }
            sx={{ m: 0 }}
            label="Lessons"
          />
        </Tooltip>
        <Tooltip
          title={"Messages about upcoming sales, events, etc."}
          placement={"top"}
        >
          <FormControlLabel
            labelPlacement="start"
            control={
              <Checkbox
                checked={sendMarketing}
                color={"default"}
                sx={{ color: "primary.contrastText" }}
                onChange={(e): void => setSendMarketing(e.target.checked)}
              />
            }
            sx={{ m: 0 }}
            label="Marketing"
          />
        </Tooltip>
        <Tooltip
          title={"Periodic messages with news, tips, or other goings on"}
          placement={"top"}
        >
          <FormControlLabel
            labelPlacement="start"
            control={
              <Checkbox
                checked={sendNewsletter}
                color={"default"}
                sx={{ color: "primary.contrastText" }}
                onChange={(e): void => setSendNewsletter(e.target.checked)}
              />
            }
            sx={{ m: 0 }}
            label="Newsletters"
          />
        </Tooltip>
        <Tooltip
          title={"Friendly reminders about things you may have missed"}
          placement={"top"}
        >
          <FormControlLabel
            labelPlacement="start"
            control={
              <Checkbox
                checked={sendReminders}
                color={"default"}
                sx={{ color: "primary.contrastText" }}
                onChange={(e): void => setSendReminders(e.target.checked)}
              />
            }
            sx={{ m: 0 }}
            label="Reminders"
          />
        </Tooltip>
      </Stack>
      <Box
        style={{
          textAlign: "center",
          minHeight: 36,
        }}
      >
        {initialized && changes && !isLoading && (
          <Button
            color={"primary"}
            variant={"contained"}
            onClick={
              changes
                ? (): void => {
                    const newChanges: UserDataChange = {};
                    if (first !== user.firstName) newChanges.firstName = first;
                    if (last !== user.lastName) newChanges.lastName = last;
                    if (location !== user.location)
                      newChanges.location = location;
                    if (goals !== user.goals) newChanges.goals = goals;
                    if (average !== user.average) newChanges.average = average;
                    if (birthdayString !== user.birthday)
                      newChanges.birthday = birthdayString;

                    if (Object.keys(newChanges).length > 0) {
                      updateUserDetails(newChanges);
                    }
                    if (
                      sendLessons !== lessons ||
                      sendMarketing !== marketing ||
                      sendNewsletter !== newsletter ||
                      sendReminders !== reminders
                    ) {
                      updateUserNotifications({
                        notify_new_lessons: sendLessons,
                        notify_marketing: sendMarketing,
                        notify_newsletter: sendNewsletter,
                        notify_reminders: sendReminders,
                      });
                    }
                  }
                : undefined
            }
          >
            Save Changes
          </Button>
        )}
        {isLoading && <CircularProgress color={"inherit"} />}
        {success && !changes && (
          <Typography variant={"caption"}>Success!</Typography>
        )}
        {error && !changes && (
          <Typography variant={"caption"}>Failed to update profile</Typography>
        )}
      </Box>
    </Stack>
  );
};

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  // useGoogleAnalyticsPageView();

  const { token, initialized } = useSelector((state: RootState) => state.auth);

  const user = useSelector((state: RootState) => state.userDetails);

  const joined = new Date(user.joined * 1000).getFullYear();

  if (initialized && !token) return <Navigate to={ROUTES.LOGIN} replace />;

  return (
    <>
      <Banner
        background={{ src: bg, position: "center 70%" }}
        contentPosition="static"
        justifyContent={"center"}
      >
        {!initialized && (
          <Box sx={{ color: "inherit" }}>
            <CircularProgress color={"inherit"} />
          </Box>
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
              <AvatarChanger />
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

            <ProfileForm />
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
