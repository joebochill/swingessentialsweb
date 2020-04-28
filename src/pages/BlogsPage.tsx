import React, { useState } from 'react';
import bg from '../assets/images/banners/19th.jpg';
import {
    makeStyles,
    Theme,
    createStyles,
    Toolbar,
    AppBar,
    Button,
    Typography,
    useTheme,
    Card,
    CardHeader,
    IconButton,
    useMediaQuery,
} from '@material-ui/core';
import { SectionBlurb } from '../components/SectionBlurb';
import { AddCircle, Create, ChevronRight, ChevronLeft, LocalBar } from '@material-ui/icons';

import { MockBlogs } from '../__mock-data__';
import { Spacer, InfoListItem } from '@pxblue/react-components';
import { prettyDate } from '../utilities/date';
import { splitParagraphText } from '../utilities/text';
import { FancyHeadline } from '../components/FancyHeadline';

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
            },
        },
        blogSection: {
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                alignItems: 'stretch',
            },
        },
        listCard: {
            flex: '1 1 0px',
            maxWidth: '40%',
        },
        youtube: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        },
        actionPanel: {
            alignSelf: 'center',
            marginTop: 0,
        },
        chevron: {
            cursor: 'pointer',
        },
        disabled: {
            cursor: 'default',
            opacity: 0.5,
        },
    })
);

export const BlogsPage: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const theme = useTheme();
    const [activeYear, setActiveYear] = useState(parseInt(MockBlogs[0].date.substr(0, 4), 10));
    const [activeBlog, setActiveBlog] = useState(MockBlogs[0]);
    const [activeIndex, setActiveIndex] = useState(0);
    const isSmall = useMediaQuery('(max-width:959px)');

    const firstYear = parseInt(MockBlogs[MockBlogs.length - 1].date.substr(0, 4), 10);
    const lastYear = parseInt(MockBlogs[0].date.substr(0, 4), 10);

    const isFirstYear = activeYear === firstYear;
    const isLastYear = activeYear === lastYear;

    const description = splitParagraphText(activeBlog.body);
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
                        backgroundPosition: 'right 30%',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.5,
                    }}
                />
                <SectionBlurb
                    jumbo
                    icon={<LocalBar fontSize={'inherit'} />}
                    headline={'The 19th Hole'}
                    subheading={'Stories from the field'}
                    body={`The 19th Hole is where we talk shop about all things golf. We talk about stories from our adventures on the golf course, tips and tricks for maximizing your performance, and opportunities for you to get more involved in the golfing community. We’d love to hear from you as well! If you have ideas for a post,send us an email. Or better yet, if you'd like to be featured here, send a post!`}
                    style={{ color: 'white', zIndex: 100, maxWidth: 960 }}
                />
            </div>
            <AppBar position={'static'} color={'default'}>
                <Toolbar style={{ justifyContent: 'center' }}>
                    <Button variant={'text'}>
                        <AddCircle style={{ marginRight: 4 }} />
                        New Post
                    </Button>
                </Toolbar>
            </AppBar>
            <div className={classes.section}>
                <div className={classes.blogSection}>
                    {!isSmall && (
                        <Card className={classes.listCard}>
                            <CardHeader
                                title={activeYear}
                                titleTypographyProps={{ variant: 'subtitle2' }}
                                action={
                                    <>
                                        <ChevronLeft
                                            className={!isLastYear ? classes.chevron : classes.disabled}
                                            onClick={
                                                !isLastYear ? (): void => setActiveYear(activeYear + 1) : undefined
                                            }
                                        />
                                        <ChevronRight
                                            className={!isFirstYear ? classes.chevron : classes.disabled}
                                            style={{ marginLeft: 8 }}
                                            onClick={
                                                !isFirstYear ? (): void => setActiveYear(activeYear - 1) : undefined
                                            }
                                        />
                                    </>
                                }
                                classes={{ action: classes.actionPanel }}
                                style={{ background: theme.palette.primary.main, color: 'white' }}
                            />
                            {MockBlogs.map((blog, index) => {
                                if (!blog.date.startsWith(activeYear.toString())) {
                                    return null;
                                }
                                return (
                                    <InfoListItem
                                        key={`blog_${blog.id}`}
                                        dense
                                        chevron
                                        hidePadding
                                        wrapTitle
                                        divider={'full'}
                                        title={blog.title}
                                        subtitle={prettyDate(blog.date)}
                                        onClick={(): void => {
                                            setActiveBlog(blog);
                                            setActiveIndex(index);
                                        }}
                                        statusColor={blog.id === activeBlog.id ? theme.palette.primary.main : ''}
                                        backgroundColor={
                                            blog.id === activeBlog.id ? theme.palette.primary.light : undefined
                                        }
                                    />
                                );
                            })}
                        </Card>
                    )}
                    <Spacer flex={0} width={100} />
                    <div style={{ flex: '1 1 0px', position: 'relative' }}>
                        {isSmall && (
                            <>
                                <IconButton
                                    disabled={activeIndex <= 0}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        left: -32,
                                        padding: 0,
                                        fontSize: 32,
                                    }}
                                    onClick={(): void => {
                                        setActiveIndex(activeIndex - 1);
                                        setActiveBlog(MockBlogs[activeIndex - 1]);
                                    }}
                                >
                                    <ChevronLeft fontSize={'inherit'} />
                                </IconButton>
                                <IconButton
                                    disabled={activeIndex >= MockBlogs.length - 1}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        right: -32,
                                        padding: 0,
                                        fontSize: 32,
                                    }}
                                    onClick={(): void => {
                                        setActiveIndex(activeIndex + 1);
                                        setActiveBlog(MockBlogs[activeIndex + 1]);
                                    }}
                                >
                                    <ChevronRight fontSize={'inherit'} />
                                </IconButton>
                            </>
                        )}
                        <FancyHeadline
                            icon={<Create fontSize={'inherit'} />}
                            headline={activeBlog.title}
                            subheading={prettyDate(activeBlog.date)}
                            style={{ cursor: 'pointer' }}
                            onClick={(): void => {
                                /* do nothing */
                            }}
                        />

                        {description.map((par, pInd) => (
                            <Typography key={`par_${pInd}`} paragraph style={{ lineHeight: 1.8 }}>
                                {par}
                            </Typography>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
