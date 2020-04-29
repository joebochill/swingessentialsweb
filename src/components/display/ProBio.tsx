import React, { HTMLAttributes } from 'react';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import { Create } from '@material-ui/icons';
import { Spacer } from '@pxblue/react-components';
import { splitParagraphText } from '../../utilities/text';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
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
            cursor: 'pointer',
            marginTop: 8,
        },
        bio: {
            flex: '1 1 0px',
        },
    })
);

type ProBioProps = HTMLAttributes<HTMLDivElement> & {
    image: string;
    background?: {
        position?: string;
        size?: string;
    };
    name: string;
    title: string;
    description: string;
};
export const ProBio: React.FC<ProBioProps> = (props) => {
    const { image, name, title, background = {}, description } = props;
    const descriptionParagraphs = splitParagraphText(description);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.imageWrapper}>
                <div
                    className={classes.avatar}
                    style={{
                        backgroundImage: `url(${
                            image.startsWith('http') ? image : `https://www.swingessentials.com/images/pros/${image}`
                        })`,
                        backgroundPosition: background.position,
                        backgroundSize: background.size,
                    }}
                />
                <div className={classes.name}>
                    <Create style={{ marginRight: 4 }} />
                    <Typography variant={'h6'} style={{ lineHeight: 1 }}>
                        {name}
                    </Typography>
                </div>
                <Typography variant={'caption'} display={'block'}>
                    {title}
                </Typography>
            </div>
            <Spacer flex={0} width={100} />
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
    );
};
