import React, { useState } from 'react';
import bg from '../assets/images/banners/order.jpg';
import { makeStyles, createStyles, Button, Typography, useTheme, Card, CardHeader, Theme } from '@material-ui/core';
import { SectionBlurb } from '../components/text/SectionBlurb';
import { AddCircle, ShoppingCart, AddShoppingCart } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, Package } from '../__types__';
import { Banner } from '../components/display/Banner';
import { Section } from '../components/display/Section';
import { ActionToolbar } from '../components/toolbars/ActionToolbar';
// import { LoadingIndicator } from '../components/display/LoadingIndicator';
// import { useHistory } from 'react-router-dom';
import { InfoListItem, Spacer, EmptyState } from '@pxblue/react-components';
import { PayPalButton } from '../components/lessons/PayPal';
import { SimpleLink } from '../components/navigation/SimpleLink';
import { StyledTextField } from '../components/text/StyledInputs';
import { LoadingIndicator } from '../components/display/LoadingIndicator';
import { checkDiscount } from '../redux/actions/discount-actions';

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
    })
);

export const PackagesPage: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    // const history = useHistory();

    const admin = useSelector((state: AppState) => state.auth.admin);
    const packages = useSelector((state: AppState) => state.packages.list);
    const status = useSelector((state: AppState) => state.api.packages.status);
    const discountStatus = useSelector((state: AppState) => state.api.discount.status);
    const discount = useSelector((state: AppState) => state.api.discount.data);

    const loading = status === 'loading';

    const [activePackage, setActivePackage] = useState<Package | null>(null);
    const [showDiscount, setShowDiscount] = useState(false);
    const [discountCode, setDiscountCode] = useState('');

    const activePrice = !activePackage ? 0 : parseFloat(activePackage.price);

    const discountAmount =
        !activePackage || !discount
            ? 0
            : discount.type === 'percent'
            ? Math.min((discount.value / 100) * activePrice, activePrice)
            : Math.min(discount.value, activePrice);

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
            <ActionToolbar show={admin}>
                <Button variant={'text'} /*onClick={(): void => setShowNewDialog(true)}*/>
                    <AddCircle style={{ marginRight: 4 }} />
                    New Package
                </Button>
            </ActionToolbar>

            <LoadingIndicator show={loading && packages.length < 1} />

            {packages.length > 0 && (
                <Section align={'flex-start'}>
                    <Card className={classes.listCard}>
                        <CardHeader
                            title={'Available Packages'}
                            titleTypographyProps={{ variant: 'subtitle2' }}
                            style={{ background: theme.palette.primary.main, color: 'white' }}
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
                                    activePackage && pkg.name === activePackage.name ? theme.palette.primary.main : ''
                                }
                                backgroundColor={
                                    activePackage && pkg.name === activePackage.name
                                        ? theme.palette.primary.light
                                        : undefined
                                }
                            />
                        ))}
                    </Card>
                    <Spacer flex={0} width={64} height={64} />
                    <div style={{ flex: '1 1 0px', alignSelf: 'stretch', textAlign: 'center' }}>
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
                                                    ? `$${discount.value.toFixed(2)}`
                                                    : `${discount.value}%`
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
                                            <Typography style={{ fontWeight: 600 }}>{`$${(
                                                activePrice - discountAmount
                                            ).toFixed(2)}`}</Typography>
                                        }
                                    />
                                </Card>
                                {discountStatus === 'success' && discount && discountAmount !== 0 && (
                                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                                        <Typography variant={'overline'} style={{ lineHeight: 1 }}>
                                            Discount Applied
                                        </Typography>
                                        <Typography variant={'subtitle2'}>{discount.code}</Typography>
                                        <Typography variant={'body2'}>{`${
                                            discount.type === 'amount'
                                                ? `$${discount.value.toFixed(2)}`
                                                : `${discount.value}%`
                                        } Off`}</Typography>
                                    </div>
                                )}
                                {discountStatus === 'failed' && (
                                    <div style={{ textAlign: 'center', marginTop: 16 }}>
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
                                            style={{ display: 'inline-block', marginTop: 16 }}
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
                                                style={{ flex: '1 1 0px', marginTop: 16 }}
                                            />
                                            <Button
                                                disabled={discountCode.length < 1}
                                                variant={'contained'}
                                                color={'primary'}
                                                style={{ flex: '0 0 auto', marginLeft: 16 }}
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

                                <div style={{ marginTop: 16 }}>
                                    <PayPalButton pkg={activePackage} discount={discountAmount} />
                                </div>
                            </>
                        )}

                        {!activePackage && (
                            <EmptyState
                                icon={<AddShoppingCart fontSize={'inherit'} />}
                                title={'Select a lesson package to purchase'}
                                description={`Choose one of our available packages to complete your order.`}
                            />
                        )}
                    </div>
                </Section>
            )}
        </>
    );
};
