import React, { useState, useEffect, useCallback } from "react";
import { DATE_REGEX } from "../../constants";
import {
  convertDatabaseTextToMultiline,
  convertMultilineToDatabaseText,
} from "../../utilities/text";
import { ConfirmationDialog } from "./ConfirmationDialog";
import {
  DialogProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import { useVideoValid } from "../../hooks";
import { CheckCircle } from "@mui/icons-material";
import { getYoutubeVideoErrorMessage } from "../../utilities/video";
import {
  TipDetails,
  useAddTipMutation,
  useRemoveTipMutation,
  useUpdateTipMutation,
} from "../../redux/apiServices/tipsService";
import { YoutubeVideoStatus } from "../../__types__";
import { format, isValid, parseISO } from "date-fns";

type EditTipDialogProps = DialogProps & {
  tip: TipDetails;
  isNew?: boolean;
};
export const EditTipDialog: React.FC<EditTipDialogProps> = (props) => {
  const { isNew, tip, ...dialogProps } = props;
  const { onClose = (): void => {} } = dialogProps;

  const [addTip] = useAddTipMutation();
  const [updateTip] = useUpdateTipMutation();
  const [removeTip] = useRemoveTipMutation();

  const [date, setDate] = useState(tip.date);
  const [title, setTitle] = useState(tip.title);
  const [video, setVideo] = useState(tip.video);
  const [videoStatus, setVideoStatus] = useState<YoutubeVideoStatus>("invalid");
  const videoValid = videoStatus === "valid";

  useVideoValid(video, setVideoStatus);

  const [comments, setComments] = useState(
    convertDatabaseTextToMultiline(tip.comments)
  );

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const resetTip = useCallback(() => {
    const parsedDate = parseISO(tip.date);
    setDate(
      isValid(parsedDate)
        ? format(new Date(tip.date), "yyyy-MM-dd")
        : format(new Date(), "yyyy-MM-dd")
    );
    setTitle(tip.title);
    setVideo(tip.video);
    setComments(convertDatabaseTextToMultiline(tip.comments));
  }, [tip]);

  useEffect(() => {
    resetTip();
  }, [tip, resetTip]);

  if (!tip) return null;
  return (
    <>
      <Dialog
        {...dialogProps}
        onClose={(e, r) => {
          onClose(e, r);
          resetTip();
        }}
      >
        <DialogTitle>{`${isNew ? "New" : "Edit"} Tip`}</DialogTitle>
        <DialogContent>
          <DialogContentText>{`Enter the tip information below:`}</DialogContentText>
          <Stack spacing={2}>
            <TextField
              fullWidth
              variant={"filled"}
              label={"Date"}
              placeholder={"YYYY-MM-DD"}
              name={"date"}
              error={!DATE_REGEX.test(date)}
              value={date}
              onChange={(e): void => {
                setDate(e.target.value);
              }}
            />
            <TextField
              fullWidth
              variant={"filled"}
              label={"Title"}
              placeholder={""}
              name={"title"}
              value={title}
              onChange={(e): void => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              fullWidth
              variant={"filled"}
              label={"Video ID"}
              name={"video"}
              value={video}
              placeholder={"Youtube ID"}
              error={
                !videoValid ||
                (!!video && video.length !== 11 && video.length > 0)
              }
              helperText={getYoutubeVideoErrorMessage(video, videoStatus)}
              slotProps={{
                htmlInput: { maxLength: 11 },
                input: {
                  endAdornment: videoValid ? (
                    <InputAdornment position="end">
                      <CheckCircle sx={{ color: "success.main" }} />
                    </InputAdornment>
                  ) : undefined,
                },
              }}
              onChange={(e): void => {
                setVideo(e.target.value);
              }}
            />
            <TextField
              fullWidth
              multiline
              variant={"filled"}
              label={"Description"}
              placeholder={"Add a brief description here..."}
              name={"comments"}
              value={comments}
              onChange={(e): void => {
                setComments(e.target.value);
              }}
              slotProps={{
                htmlInput: { maxLength: 500, style: { minHeight: 64 } },
              }}
              helperText={`${500 - comments.length} characters left`}
            />
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: isNew ? "flex-end" : "space-between" }}
        >
          {!isNew && (
            <Button
              color={"error"}
              variant={"contained"}
              onClick={(): void => {
                setShowConfirmationDialog(true);
              }}
            >
              Delete
            </Button>
          )}

          <Stack direction={"row"} spacing={2}>
            <Button
              color="primary"
              variant={"outlined"}
              onClick={(e): void => {
                onClose(e, "backdropClick");
                resetTip();
              }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant={"contained"}
              disabled={
                !title || !date || !video || !comments || !DATE_REGEX.test(date)
              }
              onClick={(e): void => {
                if (isNew) {
                  addTip({
                    title: title,
                    date: date,
                    video: video,
                    comments: convertMultilineToDatabaseText(comments),
                  });
                } else {
                  updateTip({
                    id: tip.id,
                    title: title,
                    date: date,
                    video: video,
                    comments: convertMultilineToDatabaseText(comments),
                  });
                }
                onClose(e, "escapeKeyDown");
              }}
            >
              {`${isNew ? "Add" : "Save"}`}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
      {showConfirmationDialog && (
        <ConfirmationDialog
          title={"Delete Tip of the Month"}
          message={
            "Are you sure you want to delete this Tip of the Month? This action cannot be undone."
          }
          onOkay={(e): void => {
            setShowConfirmationDialog(false);
            removeTip({ id: tip.id });
            
            onClose(e, "escapeKeyDown");
          }}
          onCancel={(): void => {
            setShowConfirmationDialog(false);
          }}
        />
      )}
    </>
  );
};
