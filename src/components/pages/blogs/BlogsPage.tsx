import React, { useState, useEffect, JSX, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import { useGoogleAnalyticsPageView } from "../../src/hooks";
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
    BoxProps,
    CardProps,
    Divider,
} from '@mui/material';
import { AddCircle, Edit, ChevronRight, ChevronLeft, LocalBar } from '@mui/icons-material';
import bg from '../../../assets/images/banners/19th.jpg';
import { format } from 'date-fns';
import { ROUTES } from '../../../constants/routes';
import {
    BlogDetails,
    BlogDetailsWithYear,
    useGetBlogByIdQuery,
    useGetBlogsQuery,
} from '../../../redux/apiServices/blogsService';
import { splitDatabaseText } from '../../../utilities/text';
import { FancyHeadline } from '../../common/FancyHeadline';
import { SectionBlurb } from '../../common/SectionBlurb';
import { Banner } from '../../layout/Banner';
import { Section } from '../../layout/Section';
import { EditBlogDialog } from './EditBlogDialog';
import { RootState } from '../../../redux/store';
import { AdminActionToolbar } from '../../common/AdminActionToolbar';

const BlankBlog: BlogDetails = {
    id: -1,
    title: '',
    date: '',
    body: '',
};

type BlogListCardProps = CardProps & {
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
        ...cardProps
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
        <Card {...cardProps}>
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
            />
            <List disablePadding sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
                {blogs.map((blog) => {
                    return (
                        <ListItem key={`blog_${blog.id}`} dense disablePadding divider>
                            <ListItemButton
                                selected={selectedBlog === blog.id}
                                onClick={() => handleBlogSelect(blog.id)}
                            >
                                <ListItemText
                                    primary={blog.title}
                                    secondary={format(new Date(blog.date), 'MMMM d, yyyy')}
                                />
                                <ChevronRight sx={{ mr: -1 }} />
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

type BlogDetailsPanelProps = BoxProps & {
    blogId?: number;
    hasNext?: boolean;
    hasPrevious?: boolean;
    onNext?: () => void;
    onPrevious?: () => void;
    showNavigation?: boolean;
    loading?: boolean;
};
const BlogDetailsPanel: React.FC<BlogDetailsPanelProps> = (props) => {
    const { blogId, hasNext, hasPrevious, showNavigation, onNext, onPrevious, ...boxProps } = props;
    const admin = useSelector((state: RootState) => state.auth.admin);

    const [showEditDialog, setShowEditDialog] = useState(false);

    const { data: blogDetails, isSuccess: haveDetails } = useGetBlogByIdQuery(blogId ?? 0, {
        skip: blogId === undefined,
    });

    const description = blogDetails ? splitDatabaseText(blogDetails.body) : [];

    return (
        <>
            <Box {...boxProps}>
                {haveDetails ? (
                    <>
                        <FancyHeadline
                            icon={admin ? <Edit fontSize={'inherit'} /> : undefined}
                            headline={blogDetails.title}
                            subheading={format(new Date(blogDetails.date), 'MMMM d, yyyy')}
                            sx={{
                                cursor: admin ? 'pointer' : 'initial',
                                mb: 2,
                                flexDirection: { xs: 'row', md: 'row' },
                            }}
                            slotProps={{
                                headline: {
                                    variant: 'h6',
                                },
                                subheading: {
                                    variant: 'caption',
                                    textAlign: 'left',
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
                    icon={<LocalBar fontSize={'inherit'} />}
                    headline={'The 19th Hole'}
                    subheading={'Stories from the field'}
                    body={`The 19th Hole is where we talk shop about all things golf. We talk about stories from our adventures on the golf course, tips and tricks for maximizing your performance, and opportunities for you to get more involved in the golfing community. We’d love to hear from you as well! If you have ideas for a post, send us an email. Or better yet, if you'd like to be featured here, send a post!`}
                    sx={{ color: 'primary.contrastText', zIndex: 100 }}
                />
            </Banner>
            <AdminActionToolbar show={admin}>
                <Button variant={'text'} color={'secondary'} onClick={(): void => setShowNewDialog(true)}>
                    <AddCircle style={{ marginRight: 4 }} />
                    New Blog
                </Button>
            </AdminActionToolbar>

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
                    alignItems: { xs: 'center', md: 'flex-start' },
                    flexDirection: { xs: 'column-reverse', md: 'row' },
                    gap: 8,
                }}
            >
                <Stack spacing={4} sx={{ flex: '1 1 0px', maxWidth: 512, width: '100%' }}>
                    {isSmall && (
                        <Typography variant={'h6'} sx={{ textAlign: 'center' }}>
                            All Posts
                        </Typography>
                    )}
                    <BlogsListCard
                        blogs={blogsByYear[activeYear] ?? []}
                        year={activeYear}
                        selectedBlog={selectedBlog}
                        onBlogSelected={(newId: number) => {
                            navigate(`${ROUTES.BLOG}/${newId}`, { replace: true });
                            window.scrollTo({ top: 512, behavior: 'smooth' });
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
                </Stack>

                {isSmall && <Divider sx={{ alignSelf: 'stretch' }} />}

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
                    sx={{ flex: { xs: '0 0 auto', md: '2 2 0px' }, maxWidth: 1080 }}
                />
            </Section>
        </>
    );
};
