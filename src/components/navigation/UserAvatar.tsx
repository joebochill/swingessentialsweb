import React from 'react';
import { Avatar, AvatarProps } from '@mui/material';
import { Person } from '@mui/icons-material';
import { BLANK_USER, useGetUserDetailsQuery } from '../../redux/apiServices/userDetailsService';
import { getInitials } from '../../utilities/strings';
import { BASE_URL } from '../../constants';

type UserAvatarProps = AvatarProps;
export const UserAvatar: React.FC<UserAvatarProps> = (props) => {
    const { sx, ...other } = props;

    const { data: user = BLANK_USER, isSuccess } = useGetUserDetailsQuery();
    const initials = getInitials(user.username, user.first, user.last);

    return !isSuccess ? (
        <Avatar />
    ) : (
        <Avatar
            src={user.avatar ? `${BASE_URL}/images/profiles/${user.username}/${user.avatar}.png` : undefined}
            sx={[
                {
                    cursor: 'pointer',
                    backgroundColor: 'background.paper',
                    color: 'text.primary',

                    height: (t) => t.spacing(5),
                    width: (t) => t.spacing(5),

                    fontWeight: 600,
                    fontFamily: `Roboto Mono`,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        >
            {initials ? initials : <Person fontSize={'inherit'} />}
        </Avatar>
    );
};
