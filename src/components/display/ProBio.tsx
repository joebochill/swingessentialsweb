import React, { HTMLAttributes, useState } from 'react';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { Spacer } from '@pxblue/react-components';
import { splitDatabaseText } from '../../utilities/text';
import { useSelector } from 'react-redux';
import { AppState } from '../../__types__';
import { EditProDialog } from '../pros/EditProDialog';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            width: '100%',
            maxWidth: 1024,
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                alignItems: 'center',
            },
        },
        imageWrapper: {
            flex: '0 0 auto',
            textAlign: 'center',
        },
        avatar: {
            height: 200,
            width: 200,
            borderRadius: 200,
            backgroundPosition: 'center center',
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
        },
        name: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 8,
        },
        bio: {
            flex: '1 1 0px',
        },
    })
);

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
    const admin = useSelector((state: AppState) => state.auth.admin);

    const [showEditDialog, setShowEditDialog] = useState(false);

    const descriptionParagraphs = splitDatabaseText(bio);
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
                <div className={classes.imageWrapper}>
                    <div
                        className={classes.avatar}
                        style={{
                            backgroundImage: `url(${
                                image.startsWith('http')
                                    ? image
                                    : `https://www.swingessentials.com/images/pros/${image}`
                            })`,
                            backgroundPosition: background.position,
                            backgroundSize: background.size,
                        }}
                    />
                    <div
                        className={classes.name}
                        style={admin ? { cursor: 'pointer' } : {}}
                        onClick={
                            admin
                                ? (): void => {
                                      setShowEditDialog(true);
                                  }
                                : undefined
                        }
                    >
                        {admin && <Edit style={{ marginRight: 4 }} />}
                        <Typography variant={'h6'} style={{ lineHeight: 1 }}>
                            {name}
                        </Typography>
                    </div>
                    <Typography variant={'caption'} display={'block'}>
                        {title}
                    </Typography>
                </div>
                <Spacer flex={0} width={64} />
                <Spacer flex={0} height={32} />
                <div className={classes.bio}>
                    {descriptionParagraphs.map((paragraph: string, index: number) => (
                        <Typography
                            key={`p_${index}`}
                            paragraph={index < descriptionParagraphs.length - 1}
                            style={{ lineHeight: 1.8 }}
                        >
                            {paragraph}
                        </Typography>
                    ))}
                </div>
            </div>
            <EditProDialog
                open={showEditDialog}
                pro={{ ...props }}
                onClose={(): void => {
                    setShowEditDialog(false);
                }}
            />
        </>
    );
};
