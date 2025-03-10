import React, { useState, useEffect, JSX, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import { useGoogleAnalyticsPageView } from "../../src/hooks";
import { ROUTES } from '../constants/routes';
import { splitDatabaseText } from '../utilities/text';
import { SectionBlurb } from '../components/text/SectionBlurb';
import { Banner } from '../components/display/Banner';
import { Section } from '../components/display/Section';
import { ActionToolbar } from '../components/toolbars/ActionToolbar';
import { FancyHeadline } from '../components/text/FancyHeadline';
import {
    Button,
    Typography,
    Card,
    CardHeader,
    useMediaQuery,
    List,
    ListItemButton,
    ListItem,
    ListItemText,
    Box,
    Skeleton,
    Stack,
} from '@mui/material';
import { AddCircle, Today, Edit, ChevronRight, ChevronLeft } from '@mui/icons-material';
import bg from '../assets/images/banners/19th.jpg';
import {
    BlogDetails,
    BlogDetailsWithYear,
    useGetBlogByIdQuery,
    useGetBlogsQuery,
} from '../redux/apiServices/blogsService';
import { RootState } from '../redux/store';
import { format } from 'date-fns';
import { EditBlogDialog } from '../components/dialogs/EditBlogDialog';

const BlankBlog: BlogDetails = {
    id: -1,
    title: '',
    date: '',
    body: '',
};

type BlogListCardProps = {
    blogs: BlogDetailsWithYear[];
    year: number;

    selectedBlog?: number;
    onBlogSelected: (id: number) => void;

    hasNextYear?: boolean;
    hasPreviousYear?: boolean;
    onYearIncrement: () => void;
    onYearDecrement: () => void;

    loading?: boolean;
};
const BlogsListCard: React.FC<BlogListCardProps> = (props) => {
    const {
        blogs,
        year,
        selectedBlog,
        onBlogSelected,
        hasNextYear,
        hasPreviousYear,
        onYearIncrement,
        onYearDecrement,
    } = props;

    const handleBlogSelect = (id: number) => {
        onBlogSelected(id);
    };
    const handleIncrementYear = () => {
        if (hasNextYear) {
            onYearIncrement();
        }
    };
    const handleDecrementYear = () => {
        if (hasPreviousYear) {
            onYearDecrement();
        }
    };

    return (
        <Card sx={{ flex: '1 1 0px', maxWidth: '40%' }}>
            <CardHeader
                title={year}
                slotProps={{
                    title: { variant: 'subtitle2' },
                }}
                action={
                    <>
                        <ChevronLeft
                            sx={{
                                cursor: hasNextYear ? 'pointer' : 'default',
                                opacity: hasNextYear ? 1 : 0.5,
                            }}
                            onClick={hasNextYear ? handleIncrementYear : undefined}
                        />
                        <ChevronRight
                            sx={{
                                ml: 1,
                                cursor: hasPreviousYear ? 'pointer' : 'default',
                                opacity: hasPreviousYear ? 1 : 0.5,
                            }}
                            onClick={hasPreviousYear ? handleDecrementYear : undefined}
                        />
                    </>
                }
                sx={{
                    alignSelf: 'center',
                    mt: 0,
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                }}
            />
            <List disablePadding sx={{ maxHeight: 670, overflowY: 'auto' }}>
                {blogs.map((blog) => {
                    return (
                        <ListItem
                            key={`blog_${blog.id}`}
                            dense
                            disablePadding
                            divider
                            sx={[
                                {
                                    position: 'relative',
                                },
                                selectedBlog === blog.id
                                    ? {
                                          backgroundColor: 'action.selected',
                                          '&:after': {
                                              content: '""',
                                              position: 'absolute',
                                              top: 0,
                                              left: 0,
                                              width: 4,
                                              height: '100%',
                                              backgroundColor: 'secondary.main',
                                          },
                                      }
                                    : {},
                            ]}
                        >
                            <ListItemButton onClick={() => handleBlogSelect(blog.id)}>
                                <ListItemText
                                    primary={blog.title}
                                    secondary={format(new Date(blog.date), 'MMMM d, yyyy')}
                                    slotProps={{
                                        primary: {
                                            variant: 'body1',
                                            color: 'text.primary',
                                            fontWeight: 600,
                                        },
                                        secondary: {
                                            variant: 'subtitle2',
                                            color: 'text.primary',
                                            fontWeight: 400,
                                        },
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
                {blogs.length === 0 &&
                    Array.from({ length: 8 }).map((_, i) => (
                        <ListItem key={i} dense divider>
                            <Skeleton sx={{ width: '100%', height: 64 }}></Skeleton>{' '}
                        </ListItem>
                    ))}
            </List>
        </Card>
    );
};

type BlogDetailsPanelProps = {
    blogId?: number;
    hasNext?: boolean;
    hasPrevious?: boolean;
    onNext?: () => void;
    onPrevious?: () => void;
    showNavigation?: boolean;
    loading?: boolean;
};
const BlogDetailsPanel: React.FC<BlogDetailsPanelProps> = (props) => {
    const { blogId, hasNext, hasPrevious, showNavigation, onNext, onPrevious } = props;
    const admin = useSelector((state: RootState) => state.auth.admin);

    const [showEditDialog, setShowEditDialog] = useState(false);

    const { data: blogDetails, isSuccess: haveDetails } = useGetBlogByIdQuery(blogId ?? 0, {
        skip: blogId === undefined,
    });

    const description = blogDetails ? splitDatabaseText(blogDetails.body) : [];

    return (
        <>
            <Box sx={{ flex: '1 1 0px' }}>
                {haveDetails ? (
                    <>
                        <FancyHeadline
                            icon={admin ? <Edit fontSize={'inherit'} /> : undefined}
                            headline={blogDetails.title}
                            subheading={format(new Date(blogDetails.date), 'MMMM d, yyyy')}
                            sx={{
                                cursor: admin ? 'pointer' : 'initial',
                                mb: 2,
                            }}
                            slotProps={{
                                headline: {
                                    variant: 'h6',
                                },
                                subheading: {
                                    variant: 'caption',
                                },
                            }}
                            onClick={
                                admin
                                    ? (): void => {
                                          setShowEditDialog(true);
                                      }
                                    : undefined
                            }
                        />

                        {description.map((par, pInd) => (
                            <Typography key={`par_${pInd}`} sx={{ lineHeight: 1.8, mb: 2 }}>
                                {par}
                            </Typography>
                        ))}
                    </>
                ) : (
                    <>
                        <Skeleton
                            variant="text"
                            sx={{
                                transform: 'none',
                                height: 64,
                                fontSize: 64,
                                mb: 2,
                                width: '50%',
                            }}
                        />
                        <Skeleton variant="text" sx={{ width: '100%', height: 32 }} />
                        <Skeleton variant="text" sx={{ width: '100%', height: 32 }} />
                        <Skeleton variant="text" sx={{ width: '100%', height: 32 }} />
                        <Skeleton variant="text" sx={{ width: '100%', height: 32 }} />
                    </>
                )}
                {haveDetails && showNavigation && (
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={4}>
                        <Button
                            // disabled={!hasNext}
                            onClick={(): void => {
                                onNext?.();
                                window.scrollTo({ top: 512, behavior: 'smooth' });
                            }}
                            color={'inherit'}
                            startIcon={<ChevronLeft fontSize={'inherit'} />}
                            sx={{ visibility: !hasNext ? 'hidden' : 'visible' }}
                        >
                            Read Previous Post
                        </Button>
                        <Button
                            // disabled={!hasPrevious}
                            onClick={(): void => {
                                console.log('scrolling to top');
                                onPrevious?.();
                                window.scrollTo({ top: 512, behavior: 'smooth' });
                            }}
                            color={'inherit'}
                            endIcon={<ChevronRight fontSize={'inherit'} />}
                            sx={{ visibility: !hasPrevious ? 'hidden' : 'visible' }}
                        >
                            Read Next Post
                        </Button>
                    </Stack>
                )}
            </Box>
            {admin && (
                <EditBlogDialog
                    blog={blogDetails ?? BlankBlog}
                    open={showEditDialog}
                    onClose={(): void => {
                        setShowEditDialog(false);
                    }}
                />
            )}
        </>
    );
};

export const BlogsPage: React.FC = (): JSX.Element => {
    // useGoogleAnalyticsPageView();
    const navigate = useNavigate();
    const admin = useSelector((state: RootState) => state.auth.admin);

    const { id } = useParams<{ id: string }>();

    const [selectedBlog, setSelectedBlog] = useState<number>();
    const [blogIndex, setBlogIndex] = useState<number>(0);
    const [activeYear, setActiveYear] = useState<number>(new Date().getFullYear());
    const { data: blogs = [], isSuccess: haveBlogs } = useGetBlogsQuery();

    // group the blogs by year
    const blogsByYear = useMemo(() => {
        return blogs.reduce(
            (acc, blog) => {
                const year = blog.year;
                if (!acc[year]) {
                    acc[year] = [];
                }
                acc[year].push(blog);
                return acc;
            },
            {} as Record<number, BlogDetailsWithYear[]>
        );
    }, [blogs]);

    const highestYear = Math.max(...Object.keys(blogsByYear).map(Number));
    const lowestYear = Math.min(...Object.keys(blogsByYear).map(Number));

    const isHighestYear = activeYear === highestYear;
    const isLowestYear = activeYear === lowestYear;

    // Set the active blog when data is loaded
    useEffect(() => {
        if (haveBlogs && id !== undefined) {
            const index = blogs.findIndex((t) => t.id === Number(id));
            const blog = blogs[index];
            if (blog) {
                setSelectedBlog(blog.id);
                setBlogIndex(index);
                setActiveYear(blog.year);
            } else {
                navigate(`${ROUTES.BLOG}/${blogs[0].id}`, { replace: true });
            }
        } else if (haveBlogs) {
            setSelectedBlog(blogs[0].id);
            setBlogIndex(0);
            setActiveYear(blogs[0].year);
        }
    }, [blogs, id, haveBlogs]);

    const [showNewDialog, setShowNewDialog] = useState(false);

    const isSmall = useMediaQuery((t) => t.breakpoints.down('md'));

    return (
        <>
            <Banner background={{ src: bg, position: 'center right' }}>
                <SectionBlurb
                    icon={<Today fontSize={'inherit'} />}
                    headline={'Blog of the Month'}
                    subheading={'Keep your game sharp'}
                    body={`Every month, Swing Essentials brings you new video blogs to help you solve common problems in your golf game. If you have an idea for a future blog, let us know!`}
                    sx={{ color: 'primary.contrastText', zIndex: 100, maxWidth: 900 }}
                />
            </Banner>
            <ActionToolbar show={admin}>
                <Button variant={'text'} onClick={(): void => setShowNewDialog(true)}>
                    <AddCircle style={{ marginRight: 4 }} />
                    New Blog
                </Button>
            </ActionToolbar>

            {admin && (
                <EditBlogDialog
                    isNew
                    blog={BlankBlog}
                    open={showNewDialog}
                    onClose={(): void => {
                        setShowNewDialog(false);
                    }}
                />
            )}

            <Section
                sx={{
                    alignItems: 'flex-start',
                    gap: 8,
                }}
            >
                {!isSmall && (
                    <BlogsListCard
                        blogs={blogsByYear[activeYear] ?? []}
                        year={activeYear}
                        selectedBlog={selectedBlog}
                        onBlogSelected={(newId: number) => {
                            navigate(`${ROUTES.BLOG}/${newId}`, { replace: true });
                        }}
                        hasNextYear={!isHighestYear}
                        hasPreviousYear={!isLowestYear}
                        onYearIncrement={() => {
                            setActiveYear(activeYear + 1);
                        }}
                        onYearDecrement={() => {
                            setActiveYear(activeYear - 1);
                        }}
                    />
                )}
                <BlogDetailsPanel
                    blogId={selectedBlog}
                    hasNext={blogIndex < blogs.length - 1}
                    hasPrevious={blogIndex > 0}
                    onNext={() => {
                        navigate(`${ROUTES.BLOG}/${blogs[blogIndex + 1].id}`, {
                            replace: true,
                        });
                    }}
                    onPrevious={() => {
                        navigate(`${ROUTES.BLOG}/${blogs[blogIndex - 1].id}`, {
                            replace: true,
                        });
                    }}
                    showNavigation={isSmall}
                />
            </Section>
        </>
    );
};
