import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleAnalyticsPageView } from '../hooks';
import { AppState, Package, Discount } from '../__types__';

import { ActionToolbar } from '../components/toolbars/ActionToolbar';
import { Banner } from '../components/display/Banner';
import { Section } from '../components/display/Section';
import { SectionBlurb } from '../components/text/SectionBlurb';
import { EditPackageDialog } from '../components/dialogs/EditPackageDialog';
import { EditDiscountDialog } from '../components/dialogs/EditDiscountDialog';
import { InfoListItem, Spacer, EmptyState, ListItemTag } from '@pxblue/react-components';

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
import { AddCircle, Security, Edit, Assessment, Send } from '@material-ui/icons';

import * as Colors from '@pxblue/colors';
import bg from '../assets/images/banners/pros2.jpg';
import { NewEmailBlastDialog } from '../components/dialogs/NewEmailBlastDialog';
import { getUsers } from '../redux/actions/user-data-actions';

const BlankPackage: Package = {
    id: -1,
    name: '',
    description: '',
    shortcode: '',
    count: '',
    duration: 0,
    price: '',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    app_sku: '',
};

const BlankDiscount: Discount = {
    id: -1,
    code: '',
    description: '',
    type: 'percent',
    value: '',
    expires: '',
    quantity: '1',
};

type DialogOpen = {
    open: boolean;
    isNew: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listCard: {
            flex: '1 1 0px',
            maxWidth: '40%',
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: {
                flex: '0 0 auto',
                maxWidth: 'initial',
                alignSelf: 'stretch',
            },
        },
        currentCredits: {
            // flex: '0 0 auto',
            textAlign: 'center',
            padding: theme.spacing(4),
            background: theme.palette.primary.light,
            border: `1px solid ${theme.palette.primary.main}`,
        },
    })
);

export const AdminPage: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const theme = useTheme();
    useGoogleAnalyticsPageView();
    const dispatch = useDispatch();

    const packages = useSelector((state: AppState) => state.packages.list);
    const packagesStatus = useSelector((state: AppState) => state.api.packages.status);

    const discounts = useSelector((state: AppState) => state.discounts.list);
    const discountStatus = useSelector((state: AppState) => state.api.getDiscounts.status);

    const [activePackage, setActivePackage] = useState<Package | null>(null);
    const [activeDiscount, setActiveDiscount] = useState<Discount | null>(null);
    const [showPackageDialog, setShowPackageDialog] = useState<DialogOpen>({ open: false, isNew: true });
    const [showDiscountDialog, setShowDiscountDialog] = useState<DialogOpen>({ open: false, isNew: true });
    const [showEmailBlastDialog, setShowEmailBlastDialog] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    return (
        <>
            <Banner background={{ src: bg, position: 'right bottom' }}>
                <SectionBlurb
                    jumbo
                    icon={<Security fontSize={'inherit'} />}
                    headline={'Admin Portal'}
                    subheading={'Do the dirty'}
                    body={`This page will give you access to common behind-the-scenes administrative actions, including updating packages, adding discount codes, etc.`}
                    style={{ color: 'white', zIndex: 100, maxWidth: 960 }}
                />
            </Banner>
            <ActionToolbar show>
                <Button variant={'text'} onClick={(): void => setShowPackageDialog({ open: true, isNew: true })}>
                    <AddCircle style={{ marginRight: theme.spacing(0.5) }} />
                    New Package
                </Button>
                <Button
                    variant={'text'}
                    style={{ marginLeft: theme.spacing(2) }}
                    onClick={(): void => setShowDiscountDialog({ open: true, isNew: true })}
                >
                    <AddCircle style={{ marginRight: theme.spacing(0.5) }} />
                    New Discount
                </Button>
                <Button
                    variant={'text'}
                    style={{ marginLeft: theme.spacing(2) }}
                    onClick={(): void => setShowEmailBlastDialog(true)}
                >
                    <Send style={{ marginRight: theme.spacing(0.5) }} />
                    New Email Blast
                </Button>
            </ActionToolbar>

            <EditPackageDialog
                isNew={showPackageDialog.isNew}
                pkg={showPackageDialog.isNew ? BlankPackage : activePackage ? activePackage : BlankPackage}
                open={showPackageDialog.open}
                onClose={(): void => {
                    setShowPackageDialog({ open: false, isNew: showPackageDialog.isNew });
                }}
            />

            <EditDiscountDialog
                isNew={showDiscountDialog.isNew}
                discount={showDiscountDialog.isNew ? BlankDiscount : activeDiscount ? activeDiscount : BlankDiscount}
                open={showDiscountDialog.open}
                onClose={(): void => {
                    setShowDiscountDialog({ open: false, isNew: showDiscountDialog.isNew });
                }}
            />

            <NewEmailBlastDialog
                open={showEmailBlastDialog}
                onClose={(): void => {
                    setShowEmailBlastDialog(false);
                }}
            />

            <Section align={'flex-start'}>
                <div className={classes.listCard}>
                    {packages.length > 0 && (
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
                                    hidePadding
                                    wrapTitle
                                    icon={
                                        <Edit
                                            onClick={(): void => {
                                                setActivePackage(pkg);
                                                setShowPackageDialog({ open: true, isNew: false });
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    }
                                    divider={'full'}
                                    title={pkg.name}
                                    subtitle={pkg.description}
                                    rightComponent={<Typography>{`$${pkg.price}`}</Typography>}
                                />
                            ))}
                        </Card>
                    )}
                    {packagesStatus === 'loading' && <CircularProgress />}
                </div>

                <Spacer flex={0} width={theme.spacing(8)} height={theme.spacing(8)} />

                <div className={classes.listCard}>
                    {discounts.length > 0 && (
                        <Card>
                            <CardHeader
                                title={'Available Discounts'}
                                titleTypographyProps={{ variant: 'subtitle2' }}
                                style={{ background: theme.palette.primary.main, color: 'white', textAlign: 'left' }}
                            />
                            {discounts.map((discount, ind) => (
                                <InfoListItem
                                    key={`discount_${ind}`}
                                    dense
                                    hidePadding
                                    wrapTitle
                                    icon={
                                        <Edit
                                            onClick={(): void => {
                                                setActiveDiscount(discount);
                                                setShowDiscountDialog({ open: true, isNew: false });
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    }
                                    divider={'full'}
                                    title={discount.code}
                                    subtitle={discount.description}
                                    rightComponent={
                                        <>
                                            <ListItemTag
                                                label={`${discount.type === 'amount' ? '$' : ''}${parseInt(
                                                    discount.value,
                                                    10
                                                ).toFixed(0)}${discount.type === 'percent' ? '%' : ''}`}
                                                backgroundColor={Colors.green[900]}
                                            />
                                            {parseInt(discount.quantity, 10) !== -1 && (
                                                <ListItemTag
                                                    label={`${discount.quantity} Left`}
                                                    style={{ marginLeft: theme.spacing(0.5) }}
                                                />
                                            )}
                                        </>
                                    }
                                />
                            ))}
                        </Card>
                    )}

                    {discountStatus === 'loading' && <CircularProgress />}
                </div>
            </Section>

            <Section>
                <EmptyState icon={<Assessment fontSize={'inherit'} />} title={'Reports'} description={'Coming Soon'} />
            </Section>
        </>
    );
};
