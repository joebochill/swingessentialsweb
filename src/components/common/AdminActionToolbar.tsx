import React from 'react';
import { Toolbar, AppBar, AppBarProps } from '@mui/material';

type ActionToolbarProps = AppBarProps & {
    show: boolean;
};
export const AdminActionToolbar: React.FC<ActionToolbarProps> = (props) => {
    const { show, sx, ...barProps } = props;

    if (!show) return null;

    return (
        <AppBar
            position={'sticky'}
            color={'default'}
            sx={[
                (t) => ({
                    top: { xs: t.spacing(7), md: t.spacing(8) },
                }),
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...barProps}
        >
            <Toolbar sx={{ justifyContent: 'center', color: 'text.primary' }}>{props.children}</Toolbar>
        </AppBar>
    );
};
