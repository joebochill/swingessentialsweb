import React from "react";
import { Avatar, AvatarProps } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getInitials } from "../../../utilities/strings";
import { useGetUserSettingsQuery } from "../../../redux/apiServices/userSettingsService";

type UserAvatarProps = AvatarProps;
export const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  const { sx, ...other } = props;

  const user = useSelector((state: RootState) => state.userDetails);
  const { data: { avatar } = {} } = useGetUserSettingsQuery();

  const initials = getInitials(user.username, user.firstName, user.lastName);

  return (
    <Avatar
      src={
        avatar
          ? `https://www.swingessentials.com/images/profiles/${user.username}/${avatar}.png`
          : undefined
      }
      sx={[
        {
          cursor: "pointer",
          backgroundColor: "background.paper",
          color: "text.primary",

          height: (t) => t.spacing(5),
          width: (t) => t.spacing(5),

          fontWeight: 600,
          fontFamily: "Roboto Mono",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {initials ? initials : <Person fontSize={"inherit"} />}
    </Avatar>
  );
};
