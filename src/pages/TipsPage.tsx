import React, { useState, useEffect, JSX, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { useGoogleAnalyticsPageView } from "../../src/hooks";
import { ROUTES } from "../../src/constants/routes";
import { splitDatabaseText } from "../utilities/text";
import { SectionBlurb } from "../components/text/SectionBlurb";
import { Banner } from "../components/display/Banner";
import { Section } from "../components/display/Section";
import { ActionToolbar } from "../components/toolbars/ActionToolbar";
import { FancyHeadline } from "../components/text/FancyHeadline";
import YouTube from "react-youtube";
import {
  Button,
  Typography,
  Card,
  CardHeader,
  IconButton,
  useMediaQuery,
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  Box,
  Skeleton,
} from "@mui/material";
import {
  AddCircle,
  Today,
  Edit,
  ChevronRight,
  ChevronLeft,
} from "@mui/icons-material";
import bg from "../assets/images/banners/tips.jpg";
import {
  TipDetails,
  TipDetailsWithYear,
  useGetTipByIdQuery,
  useGetTipsQuery,
} from "../redux/apiServices/tipsService";
import { RootState } from "../redux/store";
import { format } from "date-fns";
import { EditTipDialog } from "../components/dialogs/EditTipDialog";

const BlankTip: TipDetails = {
  id: -1,
  title: "",
  date: "",
  video: "",
  comments: "",
};

type TipListCardProps = {
  tips: TipDetailsWithYear[];
  year: number;

  selectedTip?: number;
  onTipSelected: (id: number) => void;

  hasNextYear?: boolean;
  hasPreviousYear?: boolean;
  onYearIncrement: () => void;
  onYearDecrement: () => void;

  loading?: boolean;
};
const TipsListCard: React.FC<TipListCardProps> = (props) => {
  const {
    tips,
    year,
    selectedTip,
    onTipSelected,
    hasNextYear,
    hasPreviousYear,
    onYearIncrement,
    onYearDecrement,
  } = props;

  const handleTipSelect = (id: number) => {
    onTipSelected(id);
  };
  const handleIncrementYear = () => {
    if (hasNextYear) {
      onYearIncrement();
    }
  };
  const handleDecrementYear = () => {
    if (hasPreviousYear) {
      onYearDecrement();
    }
  };

  return (
    <Card sx={{ flex: "1 1 0px", maxWidth: "40%" }}>
      <CardHeader
        title={year}
        slotProps={{
          title: { variant: "subtitle2" },
        }}
        action={
          <>
            <ChevronLeft
              sx={{
                cursor: hasNextYear ? "pointer" : "default",
                opacity: hasNextYear ? 1 : 0.5,
              }}
              onClick={hasNextYear ? handleIncrementYear : undefined}
            />
            <ChevronRight
              sx={{
                ml: 1,
                cursor: hasPreviousYear ? "pointer" : "default",
                opacity: hasPreviousYear ? 1 : 0.5,
              }}
              onClick={hasPreviousYear ? handleDecrementYear : undefined}
            />
          </>
        }
        sx={{
          alignSelf: "center",
          mt: 0,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        }}
      />
      <List disablePadding sx={{ maxHeight: 670, overflowY: "auto" }}>
        {tips.map((tip) => {
          return (
            <ListItem
              key={`tip_${tip.id}`}
              dense
              disablePadding
              divider
              sx={[
                {
                  position: "relative",
                },
                selectedTip === tip.id
                  ? {
                      backgroundColor: "action.selected",
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 4,
                        height: "100%",
                        backgroundColor: "secondary.main",
                      },
                    }
                  : {},
              ]}
            >
              <ListItemButton onClick={() => handleTipSelect(tip.id)}>
                <ListItemText
                  primary={tip.title}
                  secondary={format(new Date(tip.date), "MMMM d, yyyy")}
                  slotProps={{
                    primary: {
                      variant: "body1",
                      color: "text.primary",
                      fontWeight: 600,
                    },
                    secondary: {
                      variant: "subtitle2",
                      color: "text.primary",
                      fontWeight: 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
        {tips.length === 0 &&
          Array.from({ length: 8 }).map((_, i) => (
            <ListItem key={i} dense divider>
              <Skeleton sx={{ width: "100%", height: 64 }}></Skeleton>{" "}
            </ListItem>
          ))}
      </List>
    </Card>
  );
};

type TipDetailsPanelProps = {
  tipId?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  showNavigation?: boolean;
  loading?: boolean;
};
const TipDetailsPanel: React.FC<TipDetailsPanelProps> = (props) => {
  const { tipId, hasNext, hasPrevious, showNavigation, onNext, onPrevious } =
    props;
  const admin = useSelector((state: RootState) => state.auth.admin);

  const [videoLoading, setVideoLoading] = useState(true);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const {
    data: tipDetails,
    isSuccess: haveDetails,
    isFetching,
  } = useGetTipByIdQuery(tipId ?? 0, { skip: tipId === undefined });

  const description = tipDetails ? splitDatabaseText(tipDetails.comments) : [];

  useEffect(() => {
    setVideoLoading(true);
  }, [tipId]);

  return (
    <>
      <Box sx={{ flex: "1 1 0px" }}>
        <Box
          sx={{
            width: "100%",
            paddingTop: "56.25%",
            position: "relative",
            mb: 4,
          }}
        >
          {haveDetails && !isFetching && (
            <Box
              component={YouTube}
              videoId={tipDetails.video}
              onReady={() => {
                setVideoLoading(false);
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100%",
                height: "100%",
              }}
              opts={{
                height: "100%",
                width: "100%",
                playerVars: {
                  showinfo: 0,
                  origin: "www.swingessentials.com",
                  playsinline: 1,
                  rel: 0,
                },
              }}
            />
          )}
          {videoLoading && (
            <Skeleton
              variant="rectangular"
              sx={{
                position: "absolute",
                inset: 0,
                height: "100%",
              }}
            />
          )}
          {showNavigation && (
            <>
              <IconButton
                disabled={!hasPrevious}
                sx={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: -32,
                  padding: 0,
                  fontSize: 32,
                }}
                onClick={(): void => {
                  onPrevious?.();
                }}
              >
                <ChevronLeft fontSize={"inherit"} />
              </IconButton>
              <IconButton
                disabled={!hasNext}
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: -32,
                  padding: 0,
                  fontSize: 32,
                }}
                onClick={(): void => {
                  onNext?.();
                }}
              >
                <ChevronRight fontSize={"inherit"} />
              </IconButton>
            </>
          )}
        </Box>

        {haveDetails ? (
          <>
            <FancyHeadline
              icon={admin ? <Edit fontSize={"inherit"} /> : undefined}
              headline={tipDetails.title}
              subheading={format(new Date(tipDetails.date), "MMMM d, yyyy")}
              sx={{
                cursor: admin ? "pointer" : "initial",
                mb: 2,
              }}
              slotProps={{
                headline: {
                  variant: "h6",
                },
                subheading: {
                  variant: "caption",
                },
              }}
              onClick={
                admin
                  ? (): void => {
                      setShowEditDialog(true);
                    }
                  : undefined
              }
            />

            {description.map((par, pInd) => (
              <Typography key={`par_${pInd}`} sx={{ lineHeight: 1.8, mb: 2 }}>
                {par}
              </Typography>
            ))}
          </>
        ) : (
          <>
            <Skeleton
              variant="text"
              sx={{
                transform: "none",
                height: 64,
                fontSize: 64,
                mb: 2,
                width: "50%",
              }}
            />
            <Skeleton variant="text" sx={{ width: "100%", height: 32 }} />
            <Skeleton variant="text" sx={{ width: "100%", height: 32 }} />
            <Skeleton variant="text" sx={{ width: "100%", height: 32 }} />
            <Skeleton variant="text" sx={{ width: "100%", height: 32 }} />
          </>
        )}
      </Box>
      {admin && (
        <EditTipDialog
          tip={tipDetails ?? BlankTip}
          open={showEditDialog}
          onClose={(): void => {
            setShowEditDialog(false);
          }}
        />
      )}
    </>
  );
};

export const TipsPage: React.FC = (): JSX.Element => {
  // useGoogleAnalyticsPageView();
  const navigate = useNavigate();
  const admin = useSelector((state: RootState) => state.auth.admin);

  const { id } = useParams<{ id: string }>();

  const [selectedTip, setSelectedTip] = useState<number>();
  const [tipIndex, setTipIndex] = useState<number>(0);
  const [activeYear, setActiveYear] = useState<number>(
    new Date().getFullYear()
  );
  const { data: tips = [], isSuccess: haveTips } = useGetTipsQuery();

  // group the tips by year
  const tipsByYear = useMemo(() => {
    return tips.reduce((acc, tip) => {
      const year = tip.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(tip);
      return acc;
    }, {} as Record<number, TipDetailsWithYear[]>);
  }, [tips]);

  const highestYear = Math.max(...Object.keys(tipsByYear).map(Number));
  const lowestYear = Math.min(...Object.keys(tipsByYear).map(Number));

  const isHighestYear = activeYear === highestYear;
  const isLowestYear = activeYear === lowestYear;

  // Set the active tip when data is loaded
  useEffect(() => {
    if (haveTips && id !== undefined) {
      const index = tips.findIndex((t) => t.id === Number(id));
      const tip = tips[index];
      if (tip) {
        setSelectedTip(tip.id);
        setTipIndex(index);
        setActiveYear(tip.year);
      } else {
        navigate(`${ROUTES.TIPS}/${tips[0].id}`, { replace: true });
      }
    } else if (haveTips) {
      setSelectedTip(tips[0].id);
      setTipIndex(0);
      setActiveYear(tips[0].year);
    }
  }, [tips, id, haveTips]);

  const [showNewDialog, setShowNewDialog] = useState(false);

  const isSmall = useMediaQuery((t) => t.breakpoints.down("md"));

  return (
    <>
      <Banner background={{ src: bg, position: "center right" }}>
        <SectionBlurb
          icon={<Today fontSize={"inherit"} />}
          headline={"Tip of the Month"}
          subheading={"Keep your game sharp"}
          body={`Every month, Swing Essentials brings you new video tips to help you solve common problems in your golf game. If you have an idea for a future tip, let us know!`}
          sx={{ color: "primary.contrastText", zIndex: 100, maxWidth: 900 }}
        />
      </Banner>
      <ActionToolbar show={admin}>
        <Button variant={"text"} onClick={(): void => setShowNewDialog(true)}>
          <AddCircle style={{ marginRight: 4 }} />
          New Tip
        </Button>
      </ActionToolbar>

      {admin && (
        <EditTipDialog
          isNew
          tip={BlankTip}
          open={showNewDialog}
          onClose={(): void => {
            setShowNewDialog(false);
          }}
        />
      )}

      <Section
        sx={{
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        {!isSmall && (
          <TipsListCard
            tips={tipsByYear[activeYear] ?? []}
            year={activeYear}
            selectedTip={selectedTip}
            onTipSelected={(newId: number) => {
              navigate(`${ROUTES.TIPS}/${newId}`, { replace: true });
            }}
            hasNextYear={!isHighestYear}
            hasPreviousYear={!isLowestYear}
            onYearIncrement={() => {
              setActiveYear(activeYear + 1);
            }}
            onYearDecrement={() => {
              setActiveYear(activeYear - 1);
            }}
          />
        )}
        <TipDetailsPanel
          tipId={selectedTip}
          hasNext={tipIndex < tips.length - 1}
          hasPrevious={tipIndex > 0}
          onNext={() => {
            navigate(`${ROUTES.TIPS}/${tips[tipIndex + 1].id}`, {
              replace: true,
            });
          }}
          onPrevious={() => {
            navigate(`${ROUTES.TIPS}/${tips[tipIndex - 1].id}`, {
              replace: true,
            });
          }}
          showNavigation={isSmall}
        />
      </Section>
    </>
  );
};
