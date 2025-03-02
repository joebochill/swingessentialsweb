import React, { HTMLAttributes, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../__types__";
import { splitDatabaseText } from "../../utilities/text";
import { Spacer } from "@brightlayer-ui/react-components";
// import { EditProDialog } from '../dialogs/EditProDialog';
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";

const styles: { [key: string]: SxProps<Theme> } = {
  root: {
    display: "flex",
    width: "100%",
    maxWidth: 1024,
    xs: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  imageWrapper: {
    flex: "0 0 auto",
    textAlign: "center",
  },
  avatar: {
    height: 200,
    width: 200,
    borderRadius: 200,
    backgroundPosition: "center center",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
  },
  name: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mt: 1,
  },
  bio: {
    flex: "1 1 0px",
  },
};

type ProBioProps = HTMLAttributes<HTMLDivElement> & {
  id: string | number;
  image: string;
  background?: {
    position?: string;
    size?: string;
  };
  name: string;
  title: string;
  bio: string;
};
export const ProBio: React.FC<ProBioProps> = (props) => {
  const { image, name, title, background = {}, bio } = props;

  const admin = false; // useSelector((state: AppState) => state.auth.admin);

  const [showEditDialog, setShowEditDialog] = useState(false);

  const descriptionParagraphs = splitDatabaseText(bio);

  return (
    <>
      <Box sx={styles.root}>
        <Box sx={styles.imageWrapper}>
          <Box
            sx={{
              ...styles.avatar,
              backgroundImage: `url(${
                image.startsWith("http")
                  ? image
                  : `https://www.swingessentials.com/images/pros/${image}`
              })`,
              backgroundPosition: background.position,
              backgroundSize: background.size,
            }}
          />
          <Box
            sx={{
              ...styles.name,
              ...(admin ? { cursor: "pointer" } : {}),
            }}
            onClick={
              admin
                ? (): void => {
                    setShowEditDialog(true);
                  }
                : undefined
            }
          >
            {admin && <Edit sx={{ mr: 0.5 }} />}
            <Typography variant={"h6"} sx={{ lineHeight: 1 }}>
              {name}
            </Typography>
          </Box>
          <Typography variant={"caption"} display={"block"}>
            {title}
          </Typography>
        </Box>

        <Spacer
          classes={{}}
          flex={0}
          sx={{
            width: (t) => t.spacing(8),
            height: (t) => t.spacing(4),
          }}
        />

        <Box sx={styles.bio}>
          {descriptionParagraphs.map((paragraph: string, index: number) => (
            <Typography
              key={`p_${index}`}
              sx={{
                lineHeight: 1.8,
                mb: index < descriptionParagraphs.length - 1 ? 2 : 0,
              }}
            >
              {paragraph}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* <EditProDialog
        open={showEditDialog}
        pro={{ ...props }}
        onClose={(): void => {
          setShowEditDialog(false);
        }}
      /> */}
    </>
  );
};
