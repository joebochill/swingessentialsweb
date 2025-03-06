import React, { useState, useEffect, useCallback } from "react";
import {
  DialogProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { Pro } from "../../__types__";
import {
  convertDatabaseTextToMultiline,
  convertMultilineToDatabaseText,
} from "../../utilities/text";
import { ConfirmationDialog } from "./ConfirmationDialog";
import {
  useAddProBioMutation,
  useRemoveProBioMutation,
  useUpdateProBioMutation,
} from "../../redux/apiServices/proBiosService";

type EditProDialogProps = DialogProps & {
  pro: Pro;
  isNew?: boolean;
};
export const EditProDialog: React.FC<EditProDialogProps> = (props) => {
  const { isNew, pro, onClose, ...dialogProps } = props;

  const [addProBio] = useAddProBioMutation();
  const [removeProBio] = useRemoveProBioMutation();
  const [updateProBio] = useUpdateProBioMutation();

  const [name, setName] = useState(pro.name);
  const [title, setTitle] = useState(pro.title);
  const [bio, setBio] = useState(convertDatabaseTextToMultiline(pro.bio));
  const [image, setImage] = useState(pro.image);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const resetPro = useCallback(() => {
    setName(pro.name);
    setTitle(pro.title);
    setBio(convertDatabaseTextToMultiline(pro.bio));
    setImage(pro.image);
  }, [pro]);

  useEffect(() => {
    resetPro();
  }, [pro, resetPro]);

  if (!pro) return null;

  return (
    <>
      <Dialog
        {...dialogProps}
        onClose={(e, reason) => {
          onClose?.(e, reason);
          resetPro();
        }}
      >
        <DialogTitle>{`${isNew ? "New" : "Edit"} Pro Bio`}</DialogTitle>
        <DialogContent>
          <DialogContentText>{`Enter the instructor information below:`}</DialogContentText>
          <Stack spacing={2}>
            <TextField
              fullWidth
              variant={"filled"}
              label={"Name"}
              placeholder={""}
              name={"name"}
              value={name}
              onChange={(e): void => {
                setName(e.target.value);
              }}
              color="secondary"
            />
            <TextField
              fullWidth
              variant={"filled"}
              label={"Title"}
              placeholder={"e.g., Associate Instructor"}
              name={"title"}
              value={title}
              onChange={(e): void => {
                setTitle(e.target.value);
              }}
              color="secondary"
            />
            <TextField
              fullWidth
              variant={"filled"}
              label={"Headshot Filename"}
              placeholder={"e.g., YourName.png"}
              name={"image"}
              value={image}
              onChange={(e): void => {
                setImage(e.target.value);
              }}
              color="secondary"
            />
            <TextField
              fullWidth
              multiline
              variant={"filled"}
              label={"Bio"}
              placeholder={"Describe yourself..."}
              name={"bio"}
              value={bio}
              onChange={(e): void => {
                setBio(e.target.value);
              }}
              slotProps={{
                htmlInput: {
                  maxLength: 65000,
                  style: { minHeight: 64 },
                },
              }}
              helperText={`${65000 - bio.length} characters left`}
              color="secondary"
            />
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: isNew ? "flex-end" : "space-between",
          }}
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
              color="inherit"
              variant={"outlined"}
              onClick={(e): void => {
                onClose?.(e, "backdropClick");
                resetPro();
              }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant={"contained"}
              disabled={!name || !title || !image || !bio}
              onClick={(e): void => {
                if (isNew) {
                  addProBio({
                    name: name,
                    title: title ?? "",
                    image: image,
                    bio: convertMultilineToDatabaseText(bio),
                  });
                } else {
                  updateProBio({
                    id: pro.id,
                    name: name,
                    title: title || "",
                    image: image,
                    bio: convertMultilineToDatabaseText(bio),
                  });
                }
                onClose?.(e, "escapeKeyDown");
              }}
            >
              {`${isNew ? "Add" : "Save"}`}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
      {showConfirmationDialog && (
        <ConfirmationDialog
          title={"Delete Pro"}
          message={
            "Are you sure you want to delete this pro? This action cannot be undone."
          }
          onOkay={(e): void => {
            setShowConfirmationDialog(false);
            removeProBio({ id: pro.id });
            onClose?.(e, "escapeKeyDown");
          }}
          onCancel={(): void => {
            setShowConfirmationDialog(false);
          }}
        />
      )}
    </>
  );
};
