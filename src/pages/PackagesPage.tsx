import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { googleAnalyticsConversion, useGoogleAnalyticsPageView } from '../hooks';
import { AppState, Package } from '../__types__';
import { CHECK_DISCOUNT, PURCHASE_CREDITS } from '../redux/actions/types';
import { checkDiscount } from '../redux/actions/discount-actions';
import { purchaseCredits } from '../redux/actions/credit-actions';
import { ROUTES } from '../constants/routes';
import { roundNumber } from '../utilities/numbers';
import { Banner } from '../components/display/Banner';
import { Section } from '../components/display/Section';
import { SectionBlurb } from '../components/text/SectionBlurb';
import { PayPalButton } from '../components/lessons/PayPal';
import { SimpleLink } from '../components/navigation/SimpleLink';
import { StyledTextField } from '../components/text/StyledInputs';
import { LoadingIndicator } from '../components/display/LoadingIndicator';
import { InfoListItem, Spacer, EmptyState } from '@pxblue/react-components';
import {
    makeStyles,
    createStyles,
    Button,
    CircularProgress,
    Typography,
    useTheme,
    Card,
    CardHeader,
    Theme,
} from '@material-ui/core';
import { ShoppingCart, AddShoppingCart, CheckCircle, Error, Mail } from '@material-ui/icons';
import bg from '../assets/images/banners/order.jpg';
import * as Colors from '@pxblue/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listCard: {
            flex: '1 1 0px',
            maxWidth: '40%',
            [theme.breakpoints.down('sm')]: {
                flex: '0 0 auto',
                maxWidth: 'initial',
                alignSelf: 'stretch',
            },
        },
        currentCredits: {
            textAlign: 'center',
            padding: theme.spacing(4),
            background: theme.palette.primary.light,
            border: `1px solid ${theme.palette.primary.main}`,
        },
    })
);

export const PackagesPage: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const history = useHistory();
    useGoogleAnalyticsPageView();

    const packagesStatus = useSelector((state: AppState) => state.api.packages.status);
    const discountStatus = useSelector((state: AppState) => state.api.checkDiscount.status);
    const purchaseStatus = useSelector((state: AppState) => state.api.purchaseCredits.status);
    const creditsStatus = useSelector((state: AppState) => state.api.getCredits.status);

    const admin = useSelector((state: AppState) => state.auth.admin);
    const packages = useSelector((state: AppState) => state.packages.list);
    const discount = useSelector((state: AppState) => state.api.checkDiscount.data);
    const credits = useSelector((state: AppState) => state.credits.count);
    const role = useSelector((state: AppState) => state.auth.role);

    const loadingPackages = packagesStatus === 'loading';
    const loadingCredits = creditsStatus === 'loading';
    const loadingPurchase = purchaseStatus === 'loading';

    const [showDiscount, setShowDiscount] = useState(false);
    const [discountCode, setDiscountCode] = useState('');
    const [paypalPending, setPaypalPending] = useState(false);
    const [activePackage, setActivePackage] = useState<Package | null>(null);

    const activePrice = !activePackage ? 0 : parseFloat(activePackage.price);

    const discountAmount =
        !activePackage || !discount
            ? 0
            : discount.type === 'percent'
            ? Math.min((parseFloat(discount.value) / 100) * activePrice, activePrice)
            : Math.min(parseFloat(discount.value), activePrice);

    const currentTotal = roundNumber(activePrice - discountAmount, 2);
    const userAllowed = admin || role === 'customer';

    useEffect(() => {
        if (purchaseStatus === 'success' || purchaseStatus === 'failed') {
            if (purchaseStatus === 'success') {
                googleAnalyticsConversion(`https://swingessentials.com/purchase-${activePackage?.shortcode || 'par'}`);
            }
            setActivePackage(null);
            setDiscountCode('');
            setShowDiscount(false);
            dispatch({ type: CHECK_DISCOUNT.RESET });
        }
    }, [purchaseStatus, setActivePackage, setDiscountCode, setShowDiscount, dispatch, activePackage]);

    useEffect(() => {
        setActivePackage(null);
        setDiscountCode('');
        setShowDiscount(false);
        dispatch({ type: CHECK_DISCOUNT.RESET });
        dispatch({ type: PURCHASE_CREDITS.RESET });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Banner background={{ src: bg, position: 'right bottom' }}>
                <SectionBlurb
                    jumbo
                    icon={<ShoppingCart fontSize={'inherit'} />}
                    headline={'Order More Lessons'}
                    subheading={'Multiple packages available'}
                    body={`Swing Essentials offers competitive pricing on all of our lesson packages. Save yourself time and money by taking a remote lesson at your convenience. If you are not fully satisfied with your experience, we have a 100% money back guarantee.`}
                    style={{ color: 'white', zIndex: 100, maxWidth: 960 }}
                />
            </Banner>

            <LoadingIndicator show={loadingPackages && packages.length < 1} />

            {packages.length > 0 && (
                <Section align={'flex-start'}>
                    <div className={classes.listCard}>
                        <Card>
                            <CardHeader
                                title={'Available Packages'}
                                titleTypographyProps={{ variant: 'subtitle2' }}
                                style={{ background: theme.palette.primary.main, color: 'white', textAlign: 'left' }}
                            />
                            {packages.map((pkg, ind) => (
                                <InfoListItem
                                    key={`package_${ind}`}
                                    dense
                                    chevron
                                    hidePadding
                                    wrapTitle
                                    divider={'full'}
                                    title={pkg.name}
                                    subtitle={pkg.description}
                                    rightComponent={<Typography>{`$${pkg.price}`}</Typography>}
                                    onClick={(): void => {
                                        setActivePackage(pkg);
                                    }}
                                    statusColor={
                                        activePackage && pkg.name === activePackage.name
                                            ? theme.palette.primary.main
                                            : ''
                                    }
                                    backgroundColor={
                                        activePackage && pkg.name === activePackage.name
                                            ? theme.palette.primary.light
                                            : undefined
                                    }
                                />
                            ))}
                        </Card>
                        <Spacer flex={0} width={theme.spacing(8)} height={theme.spacing(8)} />
                        <div className={classes.currentCredits}>
                            {loadingCredits ? (
                                <CircularProgress />
                            ) : (
                                <>
                                    <Typography variant={'h3'} align={'center'}>
                                        {credits}
                                    </Typography>
                                    <Typography variant={'subtitle1'}>Current Credits Remaining</Typography>
                                </>
                            )}
                        </div>
                    </div>
                    <Spacer flex={0} width={theme.spacing(8)} height={theme.spacing(8)} />
                    <div style={{ flex: '1 1 0px', alignSelf: 'stretch', textAlign: 'center' }}>
                        {userAllowed && (
                            <>
                                {activePackage && (
                                    <>
                                        <Card>
                                            <CardHeader
                                                title={'Order Details'}
                                                titleTypographyProps={{ variant: 'subtitle2' }}
                                                style={{
                                                    background: theme.palette.primary.main,
                                                    color: 'white',
                                                    textAlign: 'left',
                                                }}
                                            />
                                            <InfoListItem
                                                dense
                                                hidePadding
                                                wrapTitle
                                                divider={'full'}
                                                title={'Sub-total'}
                                                subtitle={activePackage.name}
                                                rightComponent={<Typography>{`$${activePackage.price}`}</Typography>}
                                            />
                                            {discount && discountAmount !== 0 && (
                                                <InfoListItem
                                                    dense
                                                    hidePadding
                                                    wrapTitle
                                                    divider={'full'}
                                                    title={'Discount'}
                                                    subtitle={`${
                                                        discount.type === 'amount'
                                                            ? `$${parseInt(discount.value, 10).toFixed(2)}`
                                                            : `${parseInt(discount.value, 10)}%`
                                                    } Off`}
                                                    rightComponent={
                                                        <Typography
                                                            style={{ fontStyle: 'italic' }}
                                                        >{`-$${discountAmount.toFixed(2)}`}</Typography>
                                                    }
                                                />
                                            )}
                                            <InfoListItem
                                                dense
                                                hidePadding
                                                wrapTitle
                                                divider={'full'}
                                                title={'Tax'}
                                                rightComponent={<Typography>{`$0.00`}</Typography>}
                                            />
                                            <InfoListItem
                                                dense
                                                hidePadding
                                                wrapTitle
                                                divider={'full'}
                                                title={'Total'}
                                                rightComponent={
                                                    <Typography
                                                        style={{ fontWeight: 600 }}
                                                    >{`$${currentTotal}`}</Typography>
                                                }
                                            />
                                        </Card>
                                        {discountStatus === 'success' && discount && discountAmount !== 0 && (
                                            <div style={{ textAlign: 'center', marginTop: theme.spacing(2) }}>
                                                <Typography variant={'overline'} style={{ lineHeight: 1 }}>
                                                    Discount Applied
                                                </Typography>
                                                <Typography variant={'subtitle2'}>{discount.code}</Typography>
                                                <Typography variant={'body2'}>{`${
                                                    discount.type === 'amount'
                                                        ? `$${parseInt(discount.value).toFixed(2)}`
                                                        : `${discount.value}%`
                                                } Off`}</Typography>
                                            </div>
                                        )}
                                        {discountStatus === 'failed' && (
                                            <div style={{ textAlign: 'center', marginTop: theme.spacing(2) }}>
                                                <Typography variant={'overline'} style={{ lineHeight: 1 }}>
                                                    Invalid Code
                                                </Typography>
                                            </div>
                                        )}
                                        {!showDiscount && (
                                            <>
                                                {/* <Typography variant={'subtitle2'}>Have a discount code?</Typography> */}
                                                <SimpleLink
                                                    label={`Have a ${discount ? 'different' : 'discount'} code?`}
                                                    onClick={(): void => {
                                                        setShowDiscount(true);
                                                    }}
                                                    style={{ display: 'inline-block', marginTop: theme.spacing(2) }}
                                                />
                                            </>
                                        )}
                                        {showDiscount && (
                                            <>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <StyledTextField
                                                        fullWidth={false}
                                                        label={'Discount Code'}
                                                        name={'discount'}
                                                        error={false}
                                                        value={discountCode}
                                                        onChange={(e): void => {
                                                            setDiscountCode(e.target.value);
                                                        }}
                                                        style={{ flex: '1 1 0px', marginTop: theme.spacing(2) }}
                                                    />
                                                    <Button
                                                        disabled={discountCode.length < 1}
                                                        variant={'contained'}
                                                        color={'primary'}
                                                        style={{ flex: '0 0 auto', marginLeft: theme.spacing(2) }}
                                                        onClick={(): void => {
                                                            dispatch(checkDiscount(discountCode));
                                                            setDiscountCode('');
                                                            setShowDiscount(false);
                                                        }}
                                                    >
                                                        Apply
                                                    </Button>
                                                </div>
                                            </>
                                        )}

                                        <div style={{ marginTop: theme.spacing(2) }}>
                                            {loadingPurchase ? (
                                                <CircularProgress />
                                            ) : currentTotal > 0 ? (
                                                <>
                                                    <div
                                                        onClick={(): void => {
                                                            setPaypalPending(true);
                                                        }}
                                                        style={{ display: paypalPending ? 'none' : 'initial' }}
                                                    >
                                                        <PayPalButton
                                                            pkg={activePackage}
                                                            discount={discountAmount}
                                                            onClick={(): void => {
                                                                setPaypalPending(true);
                                                            }}
                                                            onSuccess={(data: any): void => {
                                                                setPaypalPending(false);
                                                                dispatch(
                                                                    purchaseCredits({
                                                                        version: 'v2',
                                                                        id: data.id,
                                                                        payer: data.payer.payer_id,
                                                                        package: activePackage.shortcode,
                                                                        coupon: discount ? discount.code : '',
                                                                        total: currentTotal.toFixed(2),
                                                                    })
                                                                );
                                                            }}
                                                            onCanceled={(): void => {
                                                                setPaypalPending(false);
                                                            }}
                                                            onError={(): void => {
                                                                setPaypalPending(false);
                                                            }}
                                                        />
                                                    </div>
                                                    {paypalPending && <CircularProgress />}
                                                </>
                                            ) : (
                                                <Button
                                                    fullWidth
                                                    variant={'contained'}
                                                    color={'primary'}
                                                    onClick={(): void => {
                                                        dispatch(
                                                            purchaseCredits({
                                                                version: 'v2',
                                                                id: 'N/A',
                                                                payer: 'N/A',
                                                                package: activePackage.shortcode,
                                                                coupon: discount ? discount.code : '',
                                                                total: currentTotal.toFixed(2),
                                                            })
                                                        );
                                                    }}
                                                >
                                                    Complete Purchase
                                                </Button>
                                            )}
                                        </div>
                                    </>
                                )}
                                {!activePackage && purchaseStatus === 'initial' && (
                                    <EmptyState
                                        icon={<AddShoppingCart fontSize={'inherit'} />}
                                        title={'Select a lesson package to purchase'}
                                        description={`Choose one of our available packages to complete your order.`}
                                    />
                                )}
                                {!activePackage && purchaseStatus === 'success' && (
                                    <EmptyState
                                        icon={<CheckCircle fontSize={'inherit'} htmlColor={Colors.green[500]} />}
                                        title={'Purchase Complete'}
                                        description={`Your purchase was successful!`}
                                        actions={
                                            <Button
                                                variant={'contained'}
                                                color={'primary'}
                                                onClick={(): void => {
                                                    history.push(ROUTES.SUBMIT);
                                                }}
                                            >
                                                Submit Your Swing
                                            </Button>
                                        }
                                    />
                                )}
                                {!activePackage && purchaseStatus === 'failed' && (
                                    <EmptyState
                                        icon={<Error fontSize={'inherit'} htmlColor={Colors.red[500]} />}
                                        title={'Purchase Failed'}
                                        description={`There was a problem completing your purchase. If this problem persists, please contact us.`}
                                    />
                                )}
                            </>
                        )}
                        {role === 'pending' && (
                            <EmptyState
                                icon={<Mail fontSize={'inherit'} color={'inherit'} />}
                                title={'Verify Account'}
                                description={`You must confirm your email address before you can order lessons.`}
                            />
                        )}
                    </div>
                </Section>
            )}
        </>
    );
};
