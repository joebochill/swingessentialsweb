import React, { useEffect } from 'react';
import {
    useCapturePayPalOrderMutation,
    useCreatePayPalOrderMutation,
} from '../../../redux/apiServices/packagesService';
import { Box, BoxProps } from '@mui/material';
import { PayPalButtons } from '@paypal/react-paypal-js';

type PayPalButtonProps = BoxProps & {
    packageId: number;
    couponCode: string;
    total: number;
    onSuccess: () => void;
    onClick?: () => void;
    onCanceled?: () => void;
    onError?: () => void;
};
export const PayPalButton: React.FC<PayPalButtonProps> = (props) => {
    const { packageId, couponCode, total, onSuccess, onClick, onCanceled, onError, sx, ...other } = props;
    const [createPayPalOrder] = useCreatePayPalOrderMutation();
    const [capturePayPalOrder, { isSuccess, isError: captureError }] = useCapturePayPalOrderMutation();

    useEffect(() => {
        if (captureError) onError?.();
    }, [captureError]);
    useEffect(() => {
        if (isSuccess) onSuccess?.();
    }, [isSuccess]);
    return (
        <Box
            sx={[
                { cursor: 'pointer', backgroundColor: 'background.paper', colorScheme: 'none' },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        >
            <PayPalButtons
                onClick={onClick}
                createOrder={async () => {
                    try {
                        const response = await createPayPalOrder({
                            packageId,
                            coupon: couponCode,
                            total,
                        }).unwrap();
                        if (response.id) {
                            return response.id;
                        } else {
                            throw new Error('Failed to create PayPal order');
                        }
                    } catch (e) {
                        console.error(e);
                        throw e;
                    }
                }}
                onApprove={async (data) => {
                    await capturePayPalOrder({
                        orderId: data.orderID,
                        packageId,
                        coupon: couponCode,
                        total,
                    });
                }}
                onCancel={onCanceled}
                forceReRender={[packageId, couponCode, total]}
                style={{
                    shape: 'rect',
                    color: 'gold',
                    label: 'pay',
                    height: 36,
                }}
            />
        </Box>
    );
};
