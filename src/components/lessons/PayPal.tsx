/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { PayPalButton as PPButton } from 'react-paypal-button-v2';
import { LessonPackage } from '../../__types__';

type PayPalButtonProps = {
    pkg: LessonPackage;
    discount: number;
};
export const PayPalButton: React.FC<PayPalButtonProps> = (props) => {
    const { pkg, discount } = props;

    return (
        <PPButton
            currency="USD"
            options={{
                clientId: 'sb', // TODO change to our credentials
                currency: 'USD',
                disableFunding: 'card,credit',
            }}
            style={{
                color: 'blue',
                label: 'pay',
                shape: 'rect',
                height: 36,
            }}
            //eslint-disable-next-line @typescript-eslint/no-unused-vars
            onSuccess={(details: any): void => {
                // console.log("Transaction completed", details);
                // TODO Make the API call to give the credits
            }}
            //eslint-disable-next-line @typescript-eslint/no-unused-vars
            createOrder={(data: any, actions: any): void =>
                actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: `${Math.max(pkg.price - discount, 0).toFixed(2)}`,
                                breakdown: {
                                    item_total: {
                                        value: pkg.price.toFixed(2),
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
                                        value: pkg.price.toFixed(2),
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
            }}
        />
    );
};
