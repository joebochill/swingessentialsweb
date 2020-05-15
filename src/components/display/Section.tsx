import React, { HTMLAttributes } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import clsx from 'clsx';

type TextAlign = 'left' | 'right' | 'center';
const useStyles = makeStyles<Theme, SectionProps>((theme: Theme) =>
    createStyles({
        section: {
            background: theme.palette.background.paper,
            padding: theme.spacing(8),
            display: 'flex',
            textAlign: (props): TextAlign => props.textAlign || 'left',
            alignItems: (props): string => props.align || 'center',
            justifyContent: (props): string => props.justify || 'center',
            '&:nth-of-type(even)': {
                background: theme.palette.background.default,
            },
            [theme.breakpoints.down('sm')]: {
                padding: `${theme.spacing(8)}px 10%`,
                justifyContent: 'stretch',
                flexDirection: 'column',
                textAlign: (props): TextAlign => props.textAlign || 'center',
            },
        },
    })
);
type SectionProps = HTMLAttributes<HTMLDivElement> & {
    background?: {
        color?: string;
        src?: string;
    };
    justify?: 'flex-start' | 'center' | 'stretch';
    align?: 'flex-start' | 'center' | 'stretch';
    textAlign?: TextAlign;
    dark?: boolean;
    light?: boolean;
};
export const Section: React.FC<SectionProps> = (props): JSX.Element => {
    const { background = {}, style, textAlign, ...other } = props;
    
    const classes = useStyles(props);

    return (
        <div
            className={clsx(classes.section)}
            style={Object.assign({ backgroundColor: background.color, textAlign: textAlign }, style)}
            {...other}
        >
            {props.children}
        </div>
    );
};
