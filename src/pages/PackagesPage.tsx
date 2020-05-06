import React, { useState } from 'react';
import bg from '../assets/images/banners/order.jpg';
import { makeStyles, createStyles, Button, Typography, useTheme, Card, CardHeader, Theme } from '@material-ui/core';
import { SectionBlurb } from '../components/text/SectionBlurb';
import { AddCircle, ShoppingCart, AddShoppingCart } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { AppState, LessonPackage } from '../__types__';
import { Banner } from '../components/display/Banner';
import { Section } from '../components/display/Section';
import { ActionToolbar } from '../components/toolbars/ActionToolbar';
// import { LoadingIndicator } from '../components/display/LoadingIndicator';
// import { useHistory } from 'react-router-dom';
import { InfoListItem, Spacer, EmptyState } from '@pxblue/react-components';
import { PayPalButton } from '../components/lessons/PayPal';
import { SimpleLink } from '../components/navigation/SimpleLink';
import { StyledTextField } from '../components/text/StyledInputs';

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
        regular: {
            fontWeight: 400,
        },
    })
);

const PACKAGES: LessonPackage[] = [
    {
        name: 'Par Package',
        description: '1 Lesson',
        price: 14.99,
        shortcode: 'par',
    },
    {
        name: 'Birdie Package',
        description: '3 Lessons',
        price: 39.99,
        shortcode: 'birdie',
    },
    {
        name: 'Eagle Package',
        description: '5 Lessons',
        price: 59.99,
        shortcode: 'eagle',
    },
];

export const PackagesPage: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const theme = useTheme();
    // const history = useHistory();

    const admin = useSelector((state: AppState) => state.auth.admin);

    const [activePackage, setActivePackage] = useState<LessonPackage | null>(null);
    const [showDiscount, setShowDiscount] = useState(false);

    const [discountCode, setDiscountCode] = useState('');

    const [discount, setDiscount] = useState<{ value: number; type: string }>({ value: 0, type: 'amount' });

    const discountAmount = !activePackage
        ? 0
        : discount.type === 'percent'
        ? (discount.value / 100) * activePackage.price
        : discount.value;

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

            {/* <LoadingIndicator show={loading && tips.length < 1} /> */}
            <Section align={'flex-start'}>
                <Card className={classes.listCard}>
                    <CardHeader
                        title={'Available Packages'}
                        titleTypographyProps={{ variant: 'subtitle2' }}
                        classes={{ action: classes.actionPanel }}
                        style={{ background: theme.palette.primary.main, color: 'white' }}
                    />
                    {PACKAGES.map((pkg, ind) => (
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
                                // setActiveIndex(index);
                                // history.replace(`${ROUTES.TIPS}/${tip.id}`);
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
                <div style={{ flex: '1 1 0px', alignSelf: 'stretch' }}>
                    {activePackage && (
                        <>
                            <Card>
                                <CardHeader
                                    title={'Order Details'}
                                    titleTypographyProps={{ variant: 'subtitle2' }}
                                    classes={{ action: classes.actionPanel }}
                                    style={{ background: theme.palette.primary.main, color: 'white' }}
                                />
                                <InfoListItem
                                    dense
                                    // chevron
                                    hidePadding
                                    wrapTitle
                                    divider={'full'}
                                    title={'Sub-total'}
                                    // classes={{title: classes.regular}}
                                    subtitle={activePackage.name}
                                    rightComponent={<Typography>{`$${activePackage.price}`}</Typography>}
                                />
                                {discountAmount !== 0 && (
                                    <InfoListItem
                                        dense
                                        // chevron
                                        hidePadding
                                        wrapTitle
                                        divider={'full'}
                                        title={'Discount'}
                                        // classes={{title: classes.regular}}
                                        subtitle={`${
                                            discount.type === 'amount'
                                                ? `$${discount.value.toFixed(2)}`
                                                : `${discount.value}%`
                                        } Off`}
                                        rightComponent={
                                            <Typography style={{ fontStyle: 'italic' }}>{`-$${discountAmount.toFixed(
                                                2
                                            )}`}</Typography>
                                        }
                                    />
                                )}
                                <InfoListItem
                                    dense
                                    // chevron
                                    hidePadding
                                    wrapTitle
                                    divider={'full'}
                                    title={'Tax'}
                                    // classes={{title: classes.regular}}
                                    // subtitle={'30% off'}
                                    rightComponent={<Typography>{`$0.00`}</Typography>}
                                />
                                <InfoListItem
                                    dense
                                    // chevron
                                    hidePadding
                                    wrapTitle
                                    divider={'full'}
                                    title={'Total'}
                                    // classes={{title: classes.regular}}
                                    // subtitle={'30% off'}
                                    rightComponent={
                                        <Typography style={{ fontWeight: 600 }}>{`$${(
                                            activePackage.price - discountAmount
                                        ).toFixed(2)}`}</Typography>
                                    }
                                />
                            </Card>
                            {!showDiscount && (
                                <SimpleLink
                                    label={'Have a discount code?'}
                                    onClick={(): void => {
                                        setShowDiscount(true);
                                    }}
                                />
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
                                            variant={'contained'}
                                            color={'primary'}
                                            style={{ flex: '0 0 auto', marginLeft: 16 }}
                                            onClick={(): void => {
                                                setDiscount({
                                                    value: 30,
                                                    type: 'percent',
                                                });
                                            }}
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                    {discountAmount !== 0 && (
                                        <div style={{ textAlign: 'center' }}>
                                            <Typography variant={'overline'} style={{ lineHeight: 1 }}>
                                                Discount Applied
                                            </Typography>
                                            <Typography variant={'subtitle2'}>{discountCode}</Typography>
                                            <Typography variant={'body2'}>{`${
                                                discount.type === 'amount'
                                                    ? `$${discount.value.toFixed(2)}`
                                                    : `${discount.value}%`
                                            } Off`}</Typography>
                                        </div>
                                    )}
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
        </>
    );
};
