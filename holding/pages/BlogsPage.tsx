import React, { useState, useEffect, JSX } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
// import { useGoogleAnalyticsPageView } from '../hooks';
import { useSelector } from 'react-redux';
import { AppState, Blog } from '../__types__';
import { ROUTES } from '../../src/constants/routes';
import { prettyDate } from '../utilities/date';
import { splitDatabaseText } from '../utilities/text';
import { Banner } from '../components/display/Banner';
import { Section } from '../components/display/Section';
import { ActionToolbar } from '../components/toolbars/ActionToolbar';
import { LoadingIndicator } from '../components/display/LoadingIndicator';
// import { EditBlogDialog } from '../components/dialogs/EditBlogDialog';
import { SectionBlurb } from '../components/text/SectionBlurb';
import { FancyHeadline } from '../components/text/FancyHeadline';
import { Spacer, InfoListItem } from '@brightlayer-ui/react-components';
import {
    // makeStyles,
    // createStyles,
    Button,
    Typography,
    // useTheme,
    Card,
    CardHeader,
    IconButton,
    useMediaQuery,
} from '@mui/material';
import { AddCircle, Edit, ChevronRight, ChevronLeft, LocalBar } from '@mui/icons-material';
import bg from '../assets/images/banners/19th.jpg';
import { useGetBlogsQuery } from '../apiServices/blogs';

const BlankBlog: Blog = {
    id: -1,
    title: '',
    date: '',
    body: '',
};

// const useStyles = makeStyles(() =>
//     createStyles({
//         listCard: {
//             flex: '1 1 0px',
//             maxWidth: '40%',
//         },
//         actionPanel: {
//             alignSelf: 'center',
//             marginTop: 0,
//         },
//         chevron: {
//             cursor: 'pointer',
//         },
//         disabled: {
//             cursor: 'default',
//             opacity: 0.5,
//         },
//     })
// );

export const BlogsPage: React.FC = (): JSX.Element => {
    const currentYear = new Date().getFullYear();

    // const classes = useStyles();
    // const theme = useTheme();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isSmall = useMediaQuery('(max-width:959px)');
    // useGoogleAnalyticsPageView();

    const { data:blogs = [], error, isLoading } = useGetBlogsQuery();

    // const blogs = useSelector((state: AppState) => state.blogs.blogList);
    // const loadingStatus = useSelector((state: AppState) => state.api.blogs.status);
    const admin = useSelector((state: AppState) => state.auth.admin);

    // const loading = loadingStatus === 'loading';

    const [activeYear, setActiveYear] = useState(currentYear);
    const [activeBlog, setActiveBlog] = useState<Blog | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showNewDialog, setShowNewDialog] = useState(false);

    const paramIndex = id !== undefined ? blogs.findIndex((blog) => blog.id === id) : -1;

    useEffect(() => {
        if (!activeBlog) {
            if (id !== undefined && paramIndex >= 0) {
                setActiveBlog(blogs[paramIndex]);
                setActiveIndex(paramIndex);
            } else {
                setActiveBlog(blogs[0]);
                setActiveIndex(0);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blogs, activeBlog, setActiveBlog, setActiveIndex]);

    useEffect(() => {
        if (activeBlog && blogs.findIndex((blog) => blog.id === activeBlog.id) < 0) {
            setActiveIndex(0);
            if (blogs.length > 0) setActiveBlog(blogs[0]);
        }
    }, [blogs, activeBlog, setActiveIndex, setActiveBlog]);

    useEffect(() => {
        if (activeBlog) {
            const ind = blogs.findIndex((blog) => blog.id === activeBlog.id);
            setActiveBlog(ind >= 0 ? blogs[ind] : blogs[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blogs]);

    const firstYear = blogs && blogs.length > 0 ? parseInt(blogs[blogs.length - 1].date.substring(0, 4), 10) : currentYear;
    const lastYear = blogs && blogs.length > 0 ? parseInt(blogs[0].date.substring(0, 4), 10) : currentYear;

    const isFirstYear = activeYear === firstYear;
    const isLastYear = activeYear === lastYear;

    const description = activeBlog ? splitDatabaseText(activeBlog.body) : [];

    if (id !== undefined && paramIndex < 0 && blogs.length > 0) {
        return <Navigate to={ROUTES.BLOG} replace/>;
    }

    return (
        <>
            <Banner background={{ src: bg, position: 'right 30%' }}>
                <SectionBlurb
                    jumbo
                    icon={<LocalBar fontSize={'inherit'} />}
                    headline={'The 19th Hole'}
                    subheading={'Stories from the field'}
                    body={`The 19th Hole is where we talk shop about all things golf. We talk about stories from our adventures on the golf course, tips and tricks for maximizing your performance, and opportunities for you to get more involved in the golfing community. We’d love to hear from you as well! If you have ideas for a post, send us an email. Or better yet, if you'd like to be featured here, send a post!`}
                    style={{ color: 'white', zIndex: 100, maxWidth: 960 }}
                />
            </Banner>
            <ActionToolbar show={admin} onClick={(): void => setShowNewDialog(true)}>
                <Button variant={'text'}>
                    <AddCircle sx={{ mr: 0.5 }} />
                    New Post
                </Button>
            </ActionToolbar>

            <LoadingIndicator show={isLoading && blogs.length < 1} />

            {/* {admin && (
                <EditBlogDialog
                    isNew={showNewDialog}
                    blog={showNewDialog ? BlankBlog : activeBlog ? activeBlog : BlankBlog}
                    open={showNewDialog || showEditDialog}
                    onClose={(): void => {
                        setShowNewDialog(false);
                        setShowEditDialog(false);
                    }}
                />
            )} */}

            {blogs.length > 0 && (
                <Section align={'flex-start'}>
                    {!isSmall && (
                        <Card /*className={classes.listCard}*/>
                            <CardHeader
                                title={activeYear}
                                slotProps={{
                                    title: {variant: 'subtitle2'}
                                }}
                                action={
                                    <>
                                        <ChevronLeft
                                            // className={!isLastYear ? classes.chevron : classes.disabled}
                                            onClick={
                                                !isLastYear ? (): void => setActiveYear(activeYear + 1) : undefined
                                            }
                                        />
                                        <ChevronRight
                                            // className={!isFirstYear ? classes.chevron : classes.disabled}
                                            style={{ marginLeft: 8 }}
                                            onClick={
                                                !isFirstYear ? (): void => setActiveYear(activeYear - 1) : undefined
                                            }
                                        />
                                    </>
                                }
                                // classes={{ action: classes.actionPanel }}
                                sx={{
                                    background: 'primary.main',
                                    color: 'primary.contrastText',
                                }}
                                // style={{ background: theme.palette.primary.main, color: 'white' }}
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
                                            navigate(`${ROUTES.BLOG}/${blog.id}`, { replace: true });
                                        }}
                                        // statusColor={
                                        //     activeBlog && blog.id === activeBlog.id ? theme.palette.primary.main : ''
                                        // }
                                        // backgroundColor={
                                        //     activeBlog && blog.id === activeBlog.id
                                        //         ? theme.palette.primary.light
                                        //         : undefined
                                        // }
                                    />
                                );
                            })}
                        </Card>
                    )}

                    <Spacer classes={{}} flex={0} /*width={theme.spacing(8)}*/ sx={{width: (t) => t.spacing(8)}} />

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
                                            navigate(`${ROUTES.BLOG}/${blogs[activeIndex - 1].id}`, { replace: true });
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
                                            navigate(`${ROUTES.BLOG}/${blogs[activeIndex + 1].id}`, { replace: true });
                                        }}
                                    >
                                        <ChevronRight fontSize={'inherit'} />
                                    </IconButton>
                                </>
                            )}
                            <FancyHeadline
                                icon={admin ? <Edit fontSize={'inherit'} /> : undefined}
                                headline={activeBlog.title}
                                subheading={prettyDate(activeBlog.date)}
                                style={admin ? { cursor: 'pointer' } : {}}
                                onClick={
                                    admin
                                        ? (): void => {
                                              setShowEditDialog(true);
                                          }
                                        : undefined
                                }
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
