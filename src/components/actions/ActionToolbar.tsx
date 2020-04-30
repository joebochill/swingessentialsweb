import React from 'react';
import {
    makeStyles,
    createStyles,
    Toolbar,
    AppBar,
    Theme,
    AppBarProps,
} from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        actionBar: {
            top: 64,
            [theme.breakpoints.down('xs')]: {
                top: 56
            },
        },
    })
);
type ActionToolbarProps = AppBarProps & {
    show: boolean;
}
export const ActionToolbar: React.FC<ActionToolbarProps> = (props)  => {
    const { show, ...barProps } = props;
    const classes = useStyles();

    if (!show) return null;

    return (
        <AppBar position={'sticky'} color={'default'} className={classes.actionBar} {...barProps}>
            <Toolbar style={{ justifyContent: 'center' }}>
                {props.children}
            </Toolbar>
        </AppBar>
    );
};