import React, {
  useState,
  ChangeEvent,
  MouseEvent,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import AvatarEditor from "react-avatar-editor";
import { usePinch } from "@use-gesture/react";
import {
  DialogProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Stack,
  CircularProgress,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import {
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
} from "../../redux/apiServices/userDetailsService";

type AvatarDialogProps = DialogProps & {
  src: string;
  onImageChange: (newImage: string) => void;
};
export const AvatarPickerDialog: React.FC<AvatarDialogProps> = (props) => {
  const { src, onImageChange, ...dialogProps } = props;
  const {
    onClose = (): void => {
      /* do nothing */
    },
  } = dialogProps;

  const xs = useMediaQuery((t) => t.breakpoints.down("sm"));
  const [zoom, setZoom] = useState(1.5);

  const preview = useRef<AvatarEditor>(null);

  const [updateUserDetails] = useUpdateUserDetailsMutation();

  usePinch(
    (state) => {
      if (!dialogProps.open) return;
      if (state && state.event) state.event.preventDefault();
      const momentum = state.movement[0] || 0;
      if (momentum > 1) setZoom(Math.min(4, zoom + 0.07));
      else if (momentum < 1) setZoom(Math.max(zoom - 0.07, 1));
    },
    { target: window, eventOptions: { passive: false } }
  );

  const submitAvatar = useCallback(
    (imageURL: string) => {
      if (!imageURL) {
        return;
      }
      updateUserDetails({
        avatar: imageURL,
      });
    },
    [updateUserDetails]
  );

  // reset the dialog on open
  useEffect(() => {
    if (dialogProps.open) setZoom(1.5);
  }, [dialogProps.open, setZoom]);

  return (
    <>
      <Dialog closeAfterTransition={false} {...dialogProps}>
        <DialogTitle>Update Your Profile Picture</DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          <DialogContentText
            sx={{ mb: 1 }}
          >{`Adjust the window below to change your profile picture:`}</DialogContentText>
          <AvatarEditor
            ref={preview}
            image={src}
            width={xs ? 200 : 300}
            height={xs ? 200 : 300}
            border={0}
            borderRadius={150}
            color={[0, 0, 0, 0.6]} // RGBA
            scale={zoom}
            rotate={0}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            variant={"outlined"}
            onClick={(e): void => {
              onClose(e, "backdropClick");
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant={"contained"}
            onClick={(e): void => {
              if (preview && preview.current) {
                const imageURL = preview.current
                  .getImageScaledToCanvas()
                  .toDataURL("image/png", 0.5);
                onImageChange(imageURL);
                submitAvatar(imageURL);
              }
              onClose(e, "escapeKeyDown");
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const AvatarChanger: React.FC = () => {
  const { data: userDetails, isLoading } = useGetUserDetailsQuery();
  const [updateUserDetails] = useUpdateUserDetailsMutation();

  // full path to hosted image used by main display
  const [avatar, setAvatar] = useState("");
  const [avatarInitialized, setAvatarInitialized] = useState(false);

  // source used in the edit dialog
  const [source, setSource] = useState("");
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // reinitialize the avatar when the user settings are loaded
  useEffect(() => {
    if (!avatarInitialized && userDetails?.avatar) {
      setAvatar(
        `https://www.swingessentials.com/images/profiles/${userDetails.username}/${userDetails.avatar}.png`
      );
      setAvatarInitialized(true);
    }
  }, [userDetails, avatarInitialized]);

  const handleClose = (): void => {
    setAnchorEl(null);
  };
  const removePhoto = (): void => {
    setAnchorEl(null);
    setAvatar("");
    updateUserDetails({
      avatar: "",
    });
  };

  return (
    <Stack
      alignItems={"center"}
      justifyContent={isLoading ? "center" : "flex-end"}
      sx={{
        backgroundColor: "primary.light",
        backgroundImage: !isLoading
          ? `url(${
              avatar ||
              "https://www.swingessentials.com/images/profiles/blank.png"
            })`
          : undefined,
        backgroundPosition: "center center",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        height: 300,
        width: 300,
        borderRadius: "300px",
        color: "primary.contrastText",
        boxShadow: 6,
      }}
    >
      {isLoading && <CircularProgress size={48} />}
      {!isLoading && (
        <>
          <IconButton
            color={"inherit"}
            aria-controls="avatar-menu"
            aria-haspopup="true"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={(e): void => setAnchorEl(e.currentTarget)}
          >
            <Edit />
          </IconButton>
          <input
            id={`file-picker-avatar`}
            style={{ display: "none" }}
            type={"file"}
            accept={".jpg,.jpeg,.png"}
            title={`Select a new profile photo`}
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
                setSource(URL.createObjectURL(evt.target.files[0] || ""));
                setShowImagePicker(true);
              }
            }}
          />
          <Menu
            id="avatar-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <label htmlFor={`file-picker-avatar`}>
              <MenuItem onClick={handleClose}>Upload a photo...</MenuItem>
            </label>
            <MenuItem onClick={removePhoto}>Remove photo</MenuItem>
          </Menu>

          <AvatarPickerDialog
            open={showImagePicker}
            src={
              source ||
              `https://www.swingessentials.com/images/profiles/blank.png`
            }
            onClose={(): void => {
              setShowImagePicker(false);
            }}
            onImageChange={(newImage: string): void => setAvatar(newImage)}
          />
        </>
      )}
    </Stack>
  );
};
