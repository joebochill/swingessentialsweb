/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { PayPalButton as PPButton } from 'react-paypal-button-v2';
import { Package } from '../../__types__';

type PayPalButtonProps = {
    pkg: Package;
    discount: number;
    onSuccess: (details: any) => void;
    onClick?: Function;
    onCanceled?: Function;
    onError?: Function;
};
export const PayPalButton: React.FC<PayPalButtonProps> = (props) => {
    const { pkg, discount, onSuccess } = props;

    const activePrice = parseFloat(pkg.price);

    return (
        <PPButton
            // @ts-ignore
            onClick={props.onClick}
            currency="USD"
            options={{
                clientId: process.env.REACT_APP_PAYPAL_PRODUCTION, // production
                currency: 'USD',
                disableFunding: 'card,credit',
            }}
            style={{
                color: 'blue',
                label: 'pay',
                shape: 'rect',
                height: 36,
            }}
            onSuccess={(details: any): void => {
                onSuccess(details);
            }}
            //eslint-disable-next-line @typescript-eslint/no-unused-vars
            createOrder={(data: any, actions: any): void =>
                actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: `${Math.max(activePrice - discount, 0).toFixed(2)}`,
                                breakdown: {
                                    item_total: {
                                        value: activePrice.toFixed(2),
                                        currency_code: 'USD',
                                    },
                                    tax_total: {
                                        value: '0.00',
                                        currency_code: 'USD',
                                    },
                                    shipping: {
                                        value: '0.00',
                                        currency_code: 'USD',
                                    },
                                    discount: {
                                        value: discount.toFixed(2),
                                        currency_code: 'USD',
                                    },
                                },
                            },
                            soft_descriptor: pkg.shortcode,
                            items: [
                                {
                                    name: pkg.name,
                                    unit_amount: {
                                        value: activePrice.toFixed(2),
                                        currency_code: 'USD',
                                    },
                                    quantity: 1,
                                    description: `Swing Essentials Video Golf Lessons (${pkg.description})`,
                                    tax: {
                                        value: '0.00',
                                        currency_code: 'USD',
                                    },
                                },
                            ],
                        },
                    ],
                    application_context: {
                        shipping_preference: 'NO_SHIPPING',
                    },
                })
            }
            onError={(err: object): void => {
                console.error('There was an error with your PayPal purchase', err);
                if (props.onError) props.onError();
            }}
            onCancel={(): void => {
                if (props.onCanceled) props.onCanceled();
            }}
            catchError={(err: any): void => console.error(err)}
        />
    );
};
