import React, { MouseEvent } from 'react';
import { useTheme, makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import * as Colors from '@pxblue/colors';

const getTopPaddingForAspectRatio = (ratio: AspectRatio | undefined): string => {
    switch (ratio) {
        case '1x1':
            return '100%';
        case '2x1':
            return '50%';
        case '3x2':
            return '66.67%';
        case '4x3':
            return '75%';
        case '16x9':
        default:
            return '56.25%';
    }
};
type AspectRatio = '16x9' | '4x3' | '3x2' | '2x1' | '1x1';
type InfoCardProps = {
    source: string;
    onClick?: (event: MouseEvent) => void;
    aspectRatio?: AspectRatio;
    backgroundPosition?: string;
    title: string;
    description: string;
    spacing: number;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        image: {
            width: '100%',
            position: 'relative',
            backgroundSize: 'cover',
            marginBottom: theme.spacing(2),
            border: `1px solid ${Colors.black[50]}`,
            fontSize: 48,
        },
        card: {
            '&:hover': {
                backgroundColor: Colors.black[50],
            },
        },
        chevron: {
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
            opacity: 0.7,
        },
    })
);

export const InfoCard: React.FC<InfoCardProps> = (props): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles();
    return (
        <div
            style={{
                cursor: props.onClick ? 'pointer' : 'default',
                margin: theme.spacing((-1 * props.spacing) / 2),
                padding: theme.spacing(props.spacing / 2),
            }}
            onClick={props.onClick}
            className={props.onClick ? classes.card : ''}
        >
            <div
                style={{
                    backgroundImage: `url(${props.source})`,
                    paddingTop: getTopPaddingForAspectRatio(props.aspectRatio),
                    backgroundPosition: props.backgroundPosition,
                }}
                className={classes.image}
            >
                <ChevronRight className={classes.chevron} fontSize={'inherit'} />
            </div>
            <Typography variant={'h5'} style={{ fontWeight: 600 }} noWrap>
                {props.title}
            </Typography>
            <Typography variant={'h6'} style={{ fontWeight: 400, marginTop: theme.spacing(1) }}>
                {props.description}
            </Typography>
        </div>
    );
};
InfoCard.displayName = 'InfoCard';
InfoCard.defaultProps = {
    aspectRatio: '2x1',
};
