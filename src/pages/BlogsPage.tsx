import React, { useState, useEffect } from 'react';
import bg from '../assets/images/banners/19th.jpg';
import {
    makeStyles,
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
    CircularProgress,
} from '@material-ui/core';
import { SectionBlurb } from '../components/text/SectionBlurb';
import { AddCircle, Create, ChevronRight, ChevronLeft, LocalBar } from '@material-ui/icons';

import { Spacer, InfoListItem } from '@pxblue/react-components';
import { prettyDate } from '../utilities/date';
import { splitParagraphText } from '../utilities/text';
import { FancyHeadline } from '../components/text/FancyHeadline';
import { useSelector } from 'react-redux';
import { AppState, Blog } from '../__types__';
import { Banner } from '../components/display/Banner';
import { Section } from '../components/display/Section';

const useStyles = makeStyles(() =>
    createStyles({
        listCard: {
            flex: '1 1 0px',
            maxWidth: '40%',
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
    const currentYear = new Date().getFullYear();
    const classes = useStyles();
    const theme = useTheme();
    const blogs = useSelector((state: AppState) => state.blogs.blogList);
    const loading = useSelector((state: AppState) => state.blogs.loading);
    const admin = useSelector((state: AppState) => state.auth.admin);
    const [activeYear, setActiveYear] = useState(currentYear);
    const [activeBlog, setActiveBlog] = useState<Blog | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isSmall = useMediaQuery('(max-width:959px)');

    useEffect(() => {
        if (!activeBlog) {
            setActiveBlog(blogs[0]);
            setActiveIndex(0);
        }
    }, [blogs, activeBlog, setActiveBlog, setActiveIndex]);

    useEffect(() => {
        if (activeBlog && blogs.findIndex((blog) => blog.id === activeBlog.id) < 0) {
            setActiveIndex(0);
            if (blogs.length > 0) setActiveBlog(blogs[0]);
        }
    }, [blogs, activeBlog, setActiveIndex, setActiveBlog]);

    const firstYear = blogs && blogs.length > 0 ? parseInt(blogs[blogs.length - 1].date.substr(0, 4), 10) : currentYear;
    const lastYear = blogs && blogs.length > 0 ? parseInt(blogs[0].date.substr(0, 4), 10) : currentYear;

    const isFirstYear = activeYear === firstYear;
    const isLastYear = activeYear === lastYear;

    const description = activeBlog ? splitParagraphText(activeBlog.body) : [];
    return (
        <>
            <Banner background={{ src: bg, position: 'right 30%' }}>
                <SectionBlurb
                    jumbo
                    icon={<LocalBar fontSize={'inherit'} />}
                    headline={'The 19th Hole'}
                    subheading={'Stories from the field'}
                    body={`The 19th Hole is where we talk shop about all things golf. We talk about stories from our adventures on the golf course, tips and tricks for maximizing your performance, and opportunities for you to get more involved in the golfing community. We’d love to hear from you as well! If you have ideas for a post,send us an email. Or better yet, if you'd like to be featured here, send a post!`}
                    style={{ color: 'white', zIndex: 100, maxWidth: 960 }}
                />
            </Banner>
            {admin && (
                <AppBar position={'static'} color={'default'}>
                    <Toolbar style={{ justifyContent: 'center' }}>
                        <Button variant={'text'}>
                            <AddCircle style={{ marginRight: 4 }} />
                            New Post
                        </Button>
                    </Toolbar>
                </AppBar>
            )}
            {loading && (
                <Section>
                    <CircularProgress />
                </Section>
            )}
            {blogs.length > 0 && (
                <Section align={'flex-start'}>
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
                            {blogs.map((blog, index) => {
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
                                        statusColor={
                                            activeBlog && blog.id === activeBlog.id ? theme.palette.primary.main : ''
                                        }
                                        backgroundColor={
                                            activeBlog && blog.id === activeBlog.id
                                                ? theme.palette.primary.light
                                                : undefined
                                        }
                                    />
                                );
                            })}
                        </Card>
                    )}
                    <Spacer flex={0} width={100} />
                    {activeBlog && (
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
                                            setActiveBlog(blogs[activeIndex - 1]);
                                        }}
                                    >
                                        <ChevronLeft fontSize={'inherit'} />
                                    </IconButton>
                                    <IconButton
                                        disabled={activeIndex >= blogs.length - 1}
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
                                            setActiveBlog(blogs[activeIndex + 1]);
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
                    )}
                </Section>
            )}
        </>
    );
};
