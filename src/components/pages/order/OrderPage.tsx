import React, { useState, useEffect, JSX } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    CircularProgress,
    Typography,
    Card,
    CardHeader,
    Stack,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Skeleton,
    Box,
} from '@mui/material';
import { ShoppingCart, AddShoppingCart, CheckCircle, Error, Mail } from '@mui/icons-material';
import bg from '../../../assets/images/banners/order.jpg';
import { RootState } from '../../../redux/store';
import { SectionBlurb } from '../../common/SectionBlurb';
import { Banner } from '../../layout/Banner';
import { Section } from '../../layout/Section';
import {
    Discount,
    Level0PackageDetails,
    useCaptureFreeOrderMutation,
    useGetDiscountMutation,
    useGetPackagesQuery,
} from '../../../redux/apiServices/packagesService';
import { useGetCreditsQuery } from '../../../redux/apiServices/creditsService';
import { EmptyState } from '../../common/EmptyState';
import { ROUTES } from '../../../constants/routes';
import { SimpleLink } from '../../navigation/SimpleLinks';
import { StyledTextField } from '../../common/StyledInputs';
import { roundNumber } from '../../../utilities/numbers';
import { PayPalButton } from './PayPalButton';

export const OrderPage: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    // useGoogleAnalyticsPageView();

    const role = useSelector((state: RootState) => state.auth.role);
    const canOrder = role !== 'pending';

    const { data: packages = [], isLoading: loadingPackages } = useGetPackagesQuery();
    const { data: { count: credits = 0 } = {}, isLoading: loadingCredits } = useGetCreditsQuery();
    const [captureFreeOrder, { isLoading: loadingFree }] = useCaptureFreeOrderMutation();

    const [selectedPackage, setSelectedPackage] = useState<Level0PackageDetails | null>(null);
    const selectedPrice = parseFloat(selectedPackage?.price ?? '0');
    const [discount, setDiscount] = useState<Discount | null>(null);
    const discountValue = parseFloat(discount?.value ?? '0');
    const [purchaseStatus, setPurchaseStatus] = useState<'initial' | 'failed' | 'success'>('initial');
    const [discountReset, setDiscountReset] = useState(0);

    const [paypalPending, setPaypalPending] = useState(false);

    const discountAmount =
        !selectedPackage || !discount
            ? 0
            : discount.type === 'percent'
              ? Math.min((discountValue / 100) * selectedPrice, selectedPrice)
              : Math.min(discountValue, selectedPrice);
    const calculatedTotal = roundNumber(selectedPrice - discountAmount, 2);

    useEffect(() => {
        if (purchaseStatus === 'success' || purchaseStatus === 'failed') {
            // if (purchaseStatus === 'success') {
            //     googleAnalyticsConversion(`https://swingessentials.com/purchase-${activePackage?.shortcode || 'par'}`);
            // }
            setSelectedPackage(null);
            setPaypalPending(false);
            setDiscountReset((r) => r + 1);
            setDiscount(null);
        }
    }, [purchaseStatus, setSelectedPackage, setPaypalPending, setDiscountReset, setDiscount]);

    useEffect(() => {
        if (selectedPackage) {
            setPurchaseStatus('initial');
        }
    }, [selectedPackage, setPurchaseStatus]);

    return (
        <>
            <Banner background={{ src: bg, position: 'right bottom' }}>
                <SectionBlurb
                    icon={<ShoppingCart fontSize={'inherit'} />}
                    headline={'Order More Lessons'}
                    subheading={'Multiple packages available'}
                    body={`Swing Essentials offers competitive pricing on all of our lesson packages. Save yourself time and money by taking a remote lesson at your convenience. If you are not fully satisfied with your experience, we have a 100% money back guarantee.`}
                    sx={{ color: 'primary.contrastText', zIndex: 100 }}
                />
            </Banner>

            <Section sx={{ alignItems: { xs: 'stretch', md: 'flex-start' }, gap: 8 }}>
                <Stack sx={{ flex: '1 1 0px', maxWidth: { xs: 'unset', md: 512 }, width: '100%', gap: 8 }}>
                    <Card>
                        <CardHeader title={'Available Packages'} slotProps={{ title: { variant: 'subtitle2' } }} />
                        <List disablePadding>
                            {packages.map((pkg) => (
                                <ListItem key={`package_${pkg.shortcode}`} dense disablePadding divider>
                                    <ListItemButton
                                        onClick={() => setSelectedPackage(pkg)}
                                        selected={selectedPackage?.shortcode === pkg.shortcode}
                                    >
                                        <ListItemText primary={pkg.name} secondary={pkg.description} />
                                        <Typography>{`$${pkg.price}`}</Typography>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                            {packages.length === 0 &&
                                loadingPackages &&
                                Array.from({ length: 2 }).map((_, i) => (
                                    <ListItem key={i} dense divider>
                                        <Skeleton sx={{ width: '100%', height: 64 }}></Skeleton>{' '}
                                    </ListItem>
                                ))}
                        </List>
                    </Card>
                    <Card variant="outlined">
                        <Box
                            sx={(t) => ({
                                textAlign: 'center',
                                p: 4,
                                backgroundColor: 'primary.light',
                                border: `1px solid`,
                                borderColor: `primary.main`,
                                ...t.applyStyles('dark', {
                                    backgroundColor: `rgba(${t.vars.palette.primary.mainChannel} / 0.12)`,
                                }),
                            })}
                        >
                            <Typography variant={'h3'} align={'center'}>
                                {loadingCredits ? <Skeleton sx={{ display: 'inline-block', width: 64 }} /> : credits}
                            </Typography>
                            <Typography variant={'subtitle1'}>Current Credits Remaining</Typography>
                        </Box>
                    </Card>
                </Stack>
                {!canOrder && (
                    <EmptyState
                        icon={<Mail fontSize={'inherit'} color={'inherit'} />}
                        title={'Verify Account'}
                        description={`You must confirm your email address before you can order lessons.`}
                        sx={{ flex: { xs: '0 0 auto', md: '1 1 0px' }, maxWidth: { xs: 'unset', md: 512 } }}
                    />
                )}
                {canOrder && (
                    <Stack sx={{ flex: '1 1 0px', maxWidth: { xs: 'unset', md: 512 } }}>
                        {!selectedPackage && purchaseStatus === 'initial' && (
                            <EmptyState
                                icon={<AddShoppingCart fontSize={'inherit'} />}
                                title={'Select a lesson package to purchase'}
                                description={`Choose one of our available packages to complete your order.`}
                            />
                        )}
                        {!selectedPackage && purchaseStatus === 'success' && (
                            <EmptyState
                                icon={<CheckCircle fontSize={'inherit'} sx={{ color: 'success.main' }} />}
                                title={'Purchase Complete'}
                                description={`Your purchase was successful!`}
                                actions={
                                    <Button
                                        variant={'contained'}
                                        color={'primary'}
                                        onClick={(): void => {
                                            navigate(ROUTES.SUBMIT);
                                        }}
                                    >
                                        Submit Your Swing
                                    </Button>
                                }
                            />
                        )}
                        {!selectedPackage && purchaseStatus === 'failed' && (
                            <EmptyState
                                icon={<Error fontSize={'inherit'} sx={{ color: 'error.main' }} />}
                                title={'Purchase Failed'}
                                description={`There was a problem completing your purchase. If this problem persists, please contact us.`}
                            />
                        )}
                        {selectedPackage && (
                            <Stack spacing={2}>
                                <Card>
                                    <CardHeader
                                        title={'Order Details'}
                                        slotProps={{
                                            title: { variant: 'subtitle2' },
                                        }}
                                    />
                                    <ListItem dense divider>
                                        <ListItemText primary={'Sub-total'} secondary={selectedPackage.name} />
                                        <Typography>{`$${selectedPackage.price}`}</Typography>
                                    </ListItem>
                                    {discount && discountAmount !== 0 && (
                                        <ListItem divider>
                                            <ListItemText
                                                primary={'Discount'}
                                                secondary={`${
                                                    discount.type === 'amount'
                                                        ? `$${parseInt(discount.value, 10).toFixed(2)}`
                                                        : `${parseInt(discount.value, 10)}%`
                                                } Off`}
                                            />
                                            <Typography
                                                style={{ fontStyle: 'italic' }}
                                            >{`-$${discountAmount.toFixed(2)}`}</Typography>
                                        </ListItem>
                                    )}
                                    <ListItem dense divider>
                                        <ListItemText primary={'Tax'} />
                                        <Typography>{`$0.00`}</Typography>
                                    </ListItem>
                                    <ListItem dense divider>
                                        <ListItemText primary={'Total'} />
                                        <Typography sx={{ fontWeight: 600 }}>{`$${calculatedTotal}`}</Typography>
                                    </ListItem>
                                </Card>

                                <DiscountControl
                                    resetKey={discountReset}
                                    onDiscountChange={(d: Discount | null) => {
                                        setDiscount(d);
                                    }}
                                />
                                {calculatedTotal > 0 ? (
                                    <PayPalButton
                                        onClick={() => setPaypalPending(true)}
                                        sx={{ display: paypalPending ? 'none' : 'initial' }}
                                        packageId={selectedPackage.id}
                                        couponCode={discount?.code || ''}
                                        total={calculatedTotal}
                                        onSuccess={(): void => {
                                            setPurchaseStatus('success');
                                        }}
                                        onCanceled={(): void => {
                                            setPaypalPending(false);
                                        }}
                                        onError={(): void => {
                                            setPurchaseStatus('failed');
                                        }}
                                    />
                                ) : loadingFree ? (
                                    <CircularProgress sx={{ alignSelf: 'center' }} />
                                ) : (
                                    <Button
                                        fullWidth
                                        variant={'contained'}
                                        color={'primary'}
                                        onClick={(): void => {
                                            captureFreeOrder({
                                                packageId: selectedPackage.id,
                                                coupon: discount ? discount.code : '',
                                                total: 0,
                                            })
                                                .unwrap()
                                                .then(() => {
                                                    setPurchaseStatus('success');
                                                })
                                                .catch(() => {
                                                    setPurchaseStatus('failed');
                                                });
                                        }}
                                    >
                                        Complete Purchase
                                    </Button>
                                )}

                                {paypalPending && <CircularProgress sx={{ alignSelf: 'center' }} />}
                            </Stack>
                        )}
                    </Stack>
                )}
            </Section>
        </>
    );
};

type DiscountControlProps = {
    onDiscountChange: (discount: Discount | null) => void;
    resetKey: number;
};
const DiscountControl: React.FC<DiscountControlProps> = (props): JSX.Element => {
    const [code, setCode] = useState('');
    const [showDiscountField, setShowDiscountField] = useState(false);

    const [checkDiscountCode, { data: discount, isSuccess, isLoading, isError, reset }] = useGetDiscountMutation();

    const isZeroDiscount = discount && parseFloat(discount.value) === 0;

    useEffect(() => {
        if (isSuccess && discount) {
            props.onDiscountChange(discount);
        }
    }, [isSuccess, discount]);

    useEffect(() => {
        setCode('');
        setShowDiscountField(false);
        reset();
    }, [props.resetKey]);

    return (
        <Stack sx={{ textAlign: 'center' }} spacing={2}>
            {isSuccess && discount && !isZeroDiscount && (
                <Stack>
                    <Typography variant={'overline'} sx={{ lineHeight: 1 }}>
                        Discount Applied
                    </Typography>
                    <Typography variant={'subtitle2'}>{discount.code}</Typography>
                    <Typography variant={'body2'}>{`${
                        discount.type === 'amount' ? `$${parseInt(discount.value).toFixed(2)}` : `${discount.value}%`
                    } Off`}</Typography>
                </Stack>
            )}
            {!isLoading && (
                <Stack spacing={2}>
                    {isError && (
                        <Typography variant={'overline'} sx={{ lineHeight: 1 }}>
                            Invalid Code
                        </Typography>
                    )}
                    {!showDiscountField && (
                        <SimpleLink
                            label={`Have a ${discount ? 'different' : 'discount'} code?`}
                            onClick={(): void => {
                                setShowDiscountField(true);
                            }}
                            sx={{ display: 'inline-block' }}
                        />
                    )}
                    {showDiscountField && (
                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                            <StyledTextField
                                fullWidth={false}
                                darkStyle={false}
                                label={'Discount Code'}
                                name={'discount'}
                                error={false}
                                value={code}
                                onChange={(e): void => {
                                    setCode(e.target.value);
                                }}
                                sx={{ flex: '1 1 0px' }}
                            />
                            <Button
                                disabled={code.length < 1}
                                variant={'contained'}
                                color={'primary'}
                                style={{ flex: '0 0 auto' }}
                                onClick={(): void => {
                                    checkDiscountCode(code);
                                    setCode('');
                                    setShowDiscountField(false);
                                }}
                            >
                                Apply
                            </Button>
                        </Stack>
                    )}
                </Stack>
            )}
            {isLoading && <CircularProgress sx={{ alignSelf: 'center' }} />}
        </Stack>
    );
};
