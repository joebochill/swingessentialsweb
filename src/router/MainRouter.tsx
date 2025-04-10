import { ReactNode, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { ROUTES } from '../constants/routes';
import { PrivateRoute } from './PrivateRoute';
import { ScrollToTop } from './ScrollToTop';
import { Footer } from '../components/navigation/Footer';
import { NavigationToolbar } from '../components/navigation/NavigationToolbar';
import { NavigationDrawer } from '../components/navigation/NavigationDrawer';
import { Skeleton, SkeletonProps, Stack } from '@mui/material';

// Pages
import { HomePage } from '../components/pages';
import { Section } from '../components/layout/Section';
const LoginPage = lazy(() => import('../components/pages').then((module) => ({ default: module.LoginPage })));
const ProsPage = lazy(() => import('../components/pages').then((module) => ({ default: module.ProsPage })));
const TermsPage = lazy(() => import('../components/pages').then((module) => ({ default: module.TermsPage })));
const PrivacyPage = lazy(() => import('../components/pages').then((module) => ({ default: module.PrivacyPage })));
const VerifyEmailPage = lazy(() =>
    import('../components/pages').then((module) => ({ default: module.VerifyEmailPage }))
);
const ResetPasswordPage = lazy(() =>
    import('../components/pages').then((module) => ({ default: module.ResetPasswordPage }))
);
const ProfilePage = lazy(() => import('../components/pages').then((module) => ({ default: module.ProfilePage })));
const TipsPage = lazy(() => import('../components/pages').then((module) => ({ default: module.TipsPage })));
const BlogsPage = lazy(() => import('../components/pages').then((module) => ({ default: module.BlogsPage })));
const LessonsPage = lazy(() => import('../components/pages').then((module) => ({ default: module.LessonsPage })));
const SubmitPage = lazy(() => import('../components/pages').then((module) => ({ default: module.SubmitPage })));
const OrderPage = lazy(() => import('../components/pages').then((module) => ({ default: module.OrderPage })));
const AdminPortalPage = lazy(() =>
    import('../components/pages').then((module) => ({ default: module.AdminPortalPage }))
);

const LoaderSkeleton: React.FC<SkeletonProps> = ({ sx, ...other }) => {
    return (
        <Skeleton
            variant="rectangular"
            animation={'wave'}
            sx={[
                {
                    height: '100%',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    '&::after': {
                        background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)',
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        />
    );
};

export const MainRouter = (): ReactNode => {
    const { token, admin, initialized } = useSelector((state: RootState) => state.auth);
    const loggedIn = token !== null;

    if (!initialized) return null;

    return (
        <BrowserRouter>
            <ScrollToTop />
            <NavigationToolbar />
            {/* <Suspense
                fallback={
                    <> */}
            <Section sx={{ backgroundColor: 'primary.main', height: 506 }}>
                <Stack sx={{ flex: '1 1 0px', justifyContent: 'center', gap: 4 }}>
                    <LoaderSkeleton sx={{ height: 64, maxWidth: 340 }} />
                    <Stack gap={2}>
                        <LoaderSkeleton sx={{ height: 24, maxWidth: 900 }} />
                        <LoaderSkeleton sx={{ height: 24, maxWidth: 900 }} />
                        <LoaderSkeleton sx={{ height: 24, maxWidth: 900 }} />
                        <LoaderSkeleton sx={{ height: 24, maxWidth: 900 }} />
                    </Stack>
                </Stack>
            </Section>
            <Section>
                <LoaderSkeleton
                    sx={{ height: 400, flex: '1 1 auto', backgroundColor: 'var(--mui-palette-Skeleton-bg)' }}
                />
            </Section>
            {/* </>
                }
            > */}
            <Routes>
                <Route path={`${ROUTES.HOME}`} element={<HomePage />} />

                <Route element={<PrivateRoute canActivate={!loggedIn} fallbackRoute={ROUTES.PROFILE} />}>
                    <Route path={`${ROUTES.LOGIN}`} element={<LoginPage />} />
                </Route>

                <Route path={`${ROUTES.REGISTER}/:key`} element={<VerifyEmailPage />} />
                <Route path={`${ROUTES.RESET}/:key`} element={<ResetPasswordPage />} />

                <Route path={`${ROUTES.PROS}`} element={<ProsPage />} />
                <Route path={`${ROUTES.BLOG}/:id?`} element={<BlogsPage />} />
                <Route path={`${ROUTES.TIPS}/:id?`} element={<TipsPage />} />

                <Route path={`${ROUTES.TERMS}`} element={<TermsPage />} />
                <Route path={`${ROUTES.PRIVACY}`} element={<PrivacyPage />} />

                <Route element={<PrivateRoute canActivate={loggedIn} />}>
                    <Route path={`${ROUTES.PROFILE}`} element={<ProfilePage />} />
                    <Route path={`${ROUTES.LESSONS}/:id?`} element={<LessonsPage />} />
                    <Route path={`${ROUTES.ORDER}`} element={<OrderPage />} />
                    <Route path={`${ROUTES.SUBMIT}`} element={<SubmitPage />} />
                </Route>

                <Route element={<PrivateRoute canActivate={admin} fallbackRoute={ROUTES.HOME} />}>
                    <Route path={`${ROUTES.ADMIN}`} element={<AdminPortalPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            {/* </Suspense> */}
            <Footer />
            <NavigationDrawer />
        </BrowserRouter>
    );
};
