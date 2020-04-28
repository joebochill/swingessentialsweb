import React, { useState } from 'react';
import bg from '../assets/images/banners/tips.jpg';
import { makeStyles, Theme, createStyles, Toolbar, AppBar, Button, List, ListItemText, ListItem, ExpansionPanel, Divider, ExpansionPanelDetails, ExpansionPanelSummary, Typography, useTheme, ListItemIcon, ListItemSecondaryAction } from '@material-ui/core';
import { SectionBlurb } from '../components/SectionBlurb';
import { AddCircle, Today, ExpandMore, ChevronRight } from '@material-ui/icons';
import YouTube from 'react-youtube';

import { MockTips } from '../__mock-data__';
import { Spacer, InfoListItem } from '@pxblue/react-components';
import { prettyDate } from '../utilities/date';
import { splitParagraphText } from '../utilities/text';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bannerWrapper: {
            height: 540,
            maxHeight: '80%',
            width: '100%',
            position: 'relative',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 100,
            [theme.breakpoints.down('sm')]: {
                padding: `100px 10%`,
                textAlign: 'center',
            },
        },
        section: {
            background: theme.palette.background.default,
            padding: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:nth-child(even)': {
                background: theme.palette.background.paper,
            },
            [theme.breakpoints.down('sm')]: {
                padding: `100px 10%`,
                // flexDirection: 'column',
                // textAlign: 'center',
            },
        },
        youtube: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        },
        noMargin: {
            overflow: 'hidden',
            margin: '0 !important',
            '&$expanded': {
                minHeight: theme.spacing(6),
            },
        },
        expanded: {},
    })
);

export const TipsPage: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const theme = useTheme();
    const [activeTip, setActiveTip] = useState(MockTips[1]);

    const description = splitParagraphText(activeTip.comments);
    return (
        <>
            <div className={classes.bannerWrapper}>
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        top: 0,
                        left: 0,
                        position: 'absolute',
                        backgroundColor: '#4f4c81',
                    }}
                />
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundImage: `url(${bg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center right',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.5,
                    }}
                />
                <SectionBlurb
                    icon={<Today fontSize={'inherit'} />}
                    headline={'Tip of the Month'}
                    subheading={'Keep your game sharp'}
                    body={`Every month, Swing Essentials brings you new video tips to help you solve common problems in your golf game. If you have an idea for a future tip, let us know!`}
                    style={{ color: 'white', zIndex: 100 }}
                />
            </div>
            <AppBar position={'static'} color={'default'}>
                <Toolbar style={{ justifyContent: 'center' }}>
                    <Button variant={'text'}>
                        <AddCircle style={{ marginRight: 4 }} />
                        New Tip
                    </Button>
                </Toolbar>
            </AppBar>
            <div className={classes.section}>
                <div style={{ width: '100%', display: 'flex' }}>
                    <div style={{ flex: '0 0 auto', maxWidth: '40%' }}>
                        <ExpansionPanel defaultExpanded square>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMore />}
                                IconButtonProps={{ color: 'inherit' }}
                                style={{ background: theme.palette.primary.main, color: 'white', padding: '0 16px', margin: 0 }}
                                classes={{
                                    root: classes.noMargin,
                                    content: classes.noMargin,
                                    expanded: classes.expanded,
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant={'subtitle2'}>2020</Typography>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{ display: 'block', padding: 0 }}>
                                <Divider />
                                {MockTips.filter((tip) => tip.date.startsWith('2020')).map((tip) => (
                                    <InfoListItem key={`tip_${tip.id}`} 
                                        dense 
                                        chevron 
                                        hidePadding 
                                        wrapTitle 
                                        divider={'full'}
                                        title={tip.title}
                                        subtitle={prettyDate(tip.date)}
                                        onClick={():void => setActiveTip(tip)}
                                        statusColor={tip.id === activeTip.id ? theme.palette.primary.main : ''}
                                        backgroundColor={tip.id === activeTip.id ? theme.palette.primary.light : undefined}
                                    />
                                ))}

                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                    </div>
                    <Spacer flex={0} width={100} />
                    <Spacer flex={0} height={32} />
                    <div style={{ flex: '1 1 0px' }}>
                        <div style={{ width: '100%', background: 'black', paddingTop: '56.25%', position: 'relative', marginBottom: 32 }}>
                            <YouTube
                                videoId={activeTip.video}
                                // id={"se_response_video"}
                                className={classes.youtube}
                                opts={{
                                    playerVars: {
                                        "showinfo": 0,
                                        "origin": "www.swingessentials.com",
                                        "playsinline": 1,
                                        "rel": 0
                                    }
                                }}
                            />
                        </div>
                        <Typography variant={'h6'}>{activeTip.title}</Typography>
                        {description.map((par) => (
                            <Typography paragraph style={{lineHeight: 1.8}}>{par}</Typography>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
