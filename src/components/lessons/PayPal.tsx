/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { PayPalButton as PPButton } from 'react-paypal-button-v2';
import { Package } from '../../__types__';
// import paypal from 'paypal-checkout';

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
                clientId: 'AXiclZju9sfdcd2ZTr6nM1NqvjyiRkDU70b-Ro3MBttNE4bZ4bs5hG1hgeejf93KEmD7CkCbumIV7GFY', //TODO: process.env.REACT_APP_PAYPAL_PRODUCTION
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

// type PayPalV1ButtonProps = {
//     pkg: Package;
//     discount: number;
//     onAuthorized: Function;
//     onError: Function;
//     onCanceled: Function;
// };
// export const V1PayPalButton: React.FC<PayPalV1ButtonProps> = (props) => {
//     const { pkg, discount, onError, onAuthorized, onCanceled } = props;
//     const activePrice = parseFloat(pkg.price);

//     const configurePaypal = useCallback(() => {
//         const button = document.getElementById('ppbutton');
//         if (!button) {
//             return;
//         }
//         else {
//             button.innerHTML = "";
//         }
//         paypal.Button.render({
//             env: 'sandbox',//process.env.REACT_APP_PAYPAL_MODE, // 'sandbox' or 'production',
//             style: {
//                 size: 'responsive',
//                 color: 'blue',
//                 shape: 'rect',
//                 label: 'pay',
//                 fundingicons: true
//             },
//             client: {
//                 // from https://developer.paypal.com/developer/applications/
//                 sandbox: 'AXiclZju9sfdcd2ZTr6nM1NqvjyiRkDU70b-Ro3MBttNE4bZ4bs5hG1hgeejf93KEmD7CkCbumIV7GFY',//process.env.REACT_APP_PAYPAL_SANDBOX,
//                 production: process.env.REACT_APP_PAYPAL_PRODUCTION
//             },
//             // validate: (actions) => {
//             //     if (this.props.disabled) { actions.disable(); }
//             //     else { actions.enable(); }
//             // },
//             // See https://developer.paypal.com/docs/api/payments/#payment_create
//             payment: (data: any, actions: any) =>
//                 actions.payment.create({
//                     intent: "sale",
//                     payment: {
//                         transactions: [
//                             {
//                                 amount: {
//                                     total: `${Math.max(activePrice - discount, 0).toFixed(2)}`,
//                                     currency: "USD",
//                                     details: {
//                                         subtotal: `${Math.max(activePrice - discount, 0).toFixed(2)}`,
//                                         tax: "0.00"
//                                     }
//                                 },
//                                 description: "Golf Swing Analysis",
//                                 item_list: {
//                                     items: [
//                                         {
//                                             name: pkg.name,//this.props.deal.name,
//                                             description: `Swing Essentials Video Golf Lessons (${pkg.description})`,//this.props.deal.description,
//                                             quantity: 1,
//                                             price: `${Math.max(activePrice - discount, 0).toFixed(2)}`,//Math.max(this.props.total, 0.01),
//                                             tax: "0.00",
//                                             currency: "USD"
//                                         }
//                                     ]
//                                 }
//                             }]
//                     },
//                     experience: {
//                         input_fields: {
//                             no_shipping: 1
//                         }
//                     }
//                 }),
//             commit: true,
//             onAuthorize: onAuthorized,//(data, actions) => {}
//             onCancel: onCanceled, //(data)=>{}
//             onError: onError //(err) => {}
//         }, '#ppbutton');

//     }, [pkg, discount, activePrice, onAuthorized, onCanceled, onError]);

//     useEffect(() => {
//         if (document.getElementById('ppbutton')) {
//             configurePaypal();
//         }
//         else {
//             setTimeout(() => configurePaypal(), 1500);
//         }
//     }, [configurePaypal])

//     return (
//         <div id="ppbutton" className="button" style={{height: 'auto'}}></div>
//     );
// }
