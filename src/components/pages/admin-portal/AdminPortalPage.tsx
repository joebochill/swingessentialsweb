import React, { JSX, useState } from 'react';
import {
    Button,
    Typography,
    Card,
    CardHeader,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Skeleton,
} from '@mui/material';
import { AddCircle, Security, Edit, Download } from '@mui/icons-material';

import bg from '../../../assets/images/banners/pros2.jpg';
import { FullDiscount, useGetDiscountsQuery } from '../../../redux/apiServices/packagesService';
import { Banner } from '../../layout/Banner';
import { SectionBlurb } from '../../common/SectionBlurb';
import { AdminActionToolbar } from '../../common/AdminActionToolbar';
import { Section } from '../../layout/Section';
import { EditDiscountDialog } from './EditDiscountDialog';
import { useGetLogsMutation } from '../../../redux/apiServices/logsService';

const BlankDiscount: FullDiscount = {
    id: -1,
    code: '',
    description: '',
    type: 'percent',
    value: '',
    expires: -1,
    quantity: 0,
};

type DialogOpen = {
    open: boolean;
    isNew: boolean;
};

export const AdminPortalPage: React.FC = (): JSX.Element => {
    // useGoogleAnalyticsPageView();
    const { data: discounts = [], isFetching } = useGetDiscountsQuery();
    const [downloadLogs] = useGetLogsMutation();

    const [activeDiscount, setActiveDiscount] = useState<FullDiscount | null>(null);
    const [showDiscountDialog, setShowDiscountDialog] = useState<DialogOpen>({ open: false, isNew: true });

    return (
        <>
            <Banner background={{ src: bg, position: 'right bottom' }}>
                <SectionBlurb
                    icon={<Security fontSize={'inherit'} />}
                    headline={'Admin Portal'}
                    subheading={'Do the dirty'}
                    body={`This page will give you access to common behind-the-scenes administrative actions, including updating packages, adding discount codes, etc.`}
                    sx={{ color: 'primary.contrastText', zIndex: 100, maxWidth: 900 }}
                />
            </Banner>
            <AdminActionToolbar show>
                <Button
                    variant={'text'}
                    color={'secondary'}
                    onClick={(): void => setShowDiscountDialog({ open: true, isNew: true })}
                    startIcon={<AddCircle />}
                >
                    New Discount
                </Button>
                <Button
                    variant={'text'}
                    color={'secondary'}
                    sx={{ ml: 2 }}
                    onClick={async (): Promise<void> => {
                        try {
                            const result = await downloadLogs().unwrap();
                            if (result.url) {
                                const link = document.createElement('a');
                                link.href = result.url;
                                link.download = 'logs.zip'; // Name of the downloaded file
                                document.body.appendChild(link);
                                link.click();
                                link.remove();
                                window.URL.revokeObjectURL(result.url);
                            } else {
                                console.error('Error downloading logs: No URL returned');
                            }
                        } catch (error) {
                            console.error('Error downloading logs:', error);
                        }
                    }}
                    startIcon={<Download />}
                >
                    Get Logs
                </Button>
            </AdminActionToolbar>

            <EditDiscountDialog
                isNew={showDiscountDialog.isNew}
                discount={showDiscountDialog.isNew ? BlankDiscount : activeDiscount ? activeDiscount : BlankDiscount}
                open={showDiscountDialog.open}
                onClose={(): void => {
                    setShowDiscountDialog({ open: false, isNew: showDiscountDialog.isNew });
                }}
            />

            <Section sx={{ alignItems: 'center' }}>
                <Card sx={{ width: '100%', maxWidth: 512 }}>
                    <CardHeader
                        title={'Available Discounts'}
                        slotProps={{
                            title: { variant: 'subtitle2' },
                        }}
                    />
                    <List disablePadding sx={{}}>
                        {discounts.map((discount, ind) => (
                            <ListItem key={`discount_${ind}`} divider={ind !== discounts.length - 1}>
                                <ListItemIcon>
                                    <Edit
                                        onClick={(): void => {
                                            setActiveDiscount(discount);
                                            setShowDiscountDialog({ open: true, isNew: false });
                                        }}
                                        sx={{ cursor: 'pointer' }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={discount.code} secondary={discount.description} />
                                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                    <Typography
                                        variant={'overline'}
                                        sx={{
                                            fontSize: 10,
                                            display: 'block',
                                            lineHeight: 1,
                                            p: 0.75,
                                            backgroundColor: 'success.main',
                                            color: 'success.contrastText',
                                            fontWeight: 900,
                                        }}
                                    >
                                        {`${discount.type === 'amount' ? '$' : ''}${parseInt(
                                            discount.value,
                                            10
                                        ).toFixed(0)}${discount.type === 'percent' ? '%' : ''}`}
                                    </Typography>

                                    {parseInt(`${discount.quantity}`, 10) !== -1 && (
                                        <Typography
                                            variant={'overline'}
                                            sx={{
                                                fontSize: 10,
                                                display: 'block',
                                                lineHeight: 1,
                                                p: 0.75,
                                                backgroundColor: 'primary.main',
                                                color: 'primary.contrastText',
                                                fontWeight: 900,
                                            }}
                                        >
                                            {`${discount.quantity} Left`}
                                        </Typography>
                                    )}
                                </Stack>
                            </ListItem>
                        ))}
                        {isFetching &&
                            discounts.length === 0 &&
                            Array.from({ length: 8 }).map((_, i) => (
                                <ListItem key={i} dense divider>
                                    <Skeleton sx={{ width: '100%', height: 64 }}></Skeleton>{' '}
                                </ListItem>
                            ))}
                    </List>
                </Card>
            </Section>
        </>
    );
};
