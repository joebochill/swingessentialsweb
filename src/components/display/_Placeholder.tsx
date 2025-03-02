import React, {
  useState,
  ChangeEvent,
  MouseEvent,
} from "react";
import {
  Theme,
  Typography,
  darken,
  Button,
  TextField,
  FormHelperText,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  SxProps,
  BoxProps,
  Box,
} from "@mui/material";
import { AddAPhoto, Edit, AddCircle } from "@mui/icons-material";
import clsx from "clsx";

const styles: { [key: string]: SxProps<Theme> } = {
  placeholder: {
    width: "100%",
    backgroundColor: "primary.light",
    border: `2px dashed primary.main`,
    cursor: "pointer",
    // '&:hover': {
    //     backgroundColor: darken(theme.palette.primary.light, 0.05),
    // },
  },
  portrait: {
    paddingTop: "177.78%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
    position: "relative",
  },
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    p: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    cursor: "inherit",
  },
  video: {
    display: "block",
    width: "100%",
    outline: "none",
  },
  button: {
    p: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

type PlaceholderVideoProps = BoxProps & {
  title: string;
  background: string;
  onVideoChange: (file: File | null) => void;
};
export const PlaceHolderVideo: React.FC<PlaceholderVideoProps> = (props) => {
  const { title, background, sx, onVideoChange, ...divProps } = props;

  const [videoSrc, setVideoSrc] = useState<File | null>(null);
  const [videoSrcString, setVideoSrcString] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  return (
    <>
      <Box
        {...divProps}
        sx={[{ textAlign: "center" }, ...(Array.isArray(sx) ? sx : [sx])]}
      >
        <Box
          sx={{
            ...(!videoSrc ? styles.placeholder : {}),
            ...(!videoSrc ? styles.portrait : {}),
            ...(videoSrc
              ? { background: "none" }
              : { backgroundImage: `url(${background})` }),
          } as SxProps<Theme>}
        >
          <Box sx={styles.container}>
            <Typography variant={"subtitle1"} color={"primary"}>
              {title}
            </Typography>
          </Box>
          <Box
            component={"input"}
            sx={styles.input}
            id={`file-picker-${title}`}
            style={{ display: videoSrc ? "none" : "initial" }}
            type={"file"}
            accept={".mov,.mp4,.mpeg"}
            title={`Select a new ${title} video`}
            onClick={(evt: MouseEvent): void => {
              (evt.target as HTMLInputElement).value = "";
            }}
            onChange={(evt: ChangeEvent<HTMLInputElement>): void => {
              if (
                evt &&
                evt.target &&
                evt.target.files &&
                evt.target.files.length > 0
              ) {
                const size = evt.target.files[0].size;
                const tooBig = size > 50 * 1024 * 1024;
                if (tooBig) {
                  setError(
                    `The video you have selected is too large (${(
                      size /
                      (1024 * 1024)
                    ).toFixed(1)} MB). The maximum allowable file size is 50MB.`
                  );
                  setShowError(true);
                }
                setVideoSrc(tooBig ? null : evt.target.files[0]);
                setVideoSrcString(
                  tooBig ? "" : URL.createObjectURL(evt.target.files[0] || "")
                );
                onVideoChange(tooBig ? null : evt.target.files[0]);
              }
            }}
          />
          {videoSrc && (
            <Box
              component={"video"}
              sx={styles.video}
              controls
              src={videoSrcString}
            >
              Your browser does not support the video tag.
            </Box>
          )}
        </Box>
        <label htmlFor={`file-picker-${title}`}>
          <Button
            variant={"text"}
            color={"primary"}
            component={"span"}
            sx={{ mt: 1 }}
          >
            {videoSrc ? (
              <Edit sx={{ mr: 0.5 }} />
            ) : (
              <AddAPhoto sx={{ mr: 0.5 }} />
            )}
            {`${videoSrc ? "Change" : "Add"} Video`}
          </Button>
        </label>
      </Box>
      <Dialog
        open={showError}
        onClose={(e, reason): void => {
          if (reason !== "backdropClick") setShowError(false);
        }}
      >
        <DialogTitle>{`Video Error`}</DialogTitle>
        <DialogContent>
          <DialogContentText>{error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color={"primary"}
            variant={"contained"}
            onClick={(): void => {
              setShowError(false);
            }}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

type PlaceholderTextProps = BoxProps & {
  label: string;
  onTextChange: (text: string) => void;
};
export const PlaceHolderText: React.FC<PlaceholderTextProps> = (props) => {
  const { label, sx, onTextChange, ...divProps } = props;

  const [showField, setShowField] = useState(false);
  const [description, setDescription] = useState("");

  return (
    <Box {...divProps} sx={[{ textAlign: "center" }, ...Array.isArray(sx) ? sx : [sx]]}>
      {!showField && (
        <Box
          sx={[styles.placeholder, styles.button] as SxProps<Theme>}
          onClick={(): void => setShowField(true)}
        >
          <AddCircle sx={{ mr: 0.5 }} />
          <Typography variant={"button"} sx={{ userSelect: "none" }}>
            {label}
          </Typography>
        </Box>
      )}
      {showField && (
        <>
          <TextField
            fullWidth
            multiline
            autoFocus
            variant={"outlined"}
            label={"Special Requests"}
            placeholder={"Add any special requests or comments here..."}
            name={"comments"}
            value={description}
            onChange={(e): void => {
              setDescription(e.target.value);
              onTextChange(e.target.value);
            }}
            classes={{}}
            slotProps={{
              htmlInput: {
                maxLength: 500,
                style: { minHeight: 64 },
              },
            }}
          />
          <FormHelperText color={"primary"}>{`${
            500 - description.length
          } characters left`}</FormHelperText>
        </>
      )}
    </Box>
  );
};
