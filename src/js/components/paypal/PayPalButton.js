import React, { Component } from 'react';
import paypal from 'paypal-checkout';

class PaypalButton extends Component {
    componentDidMount() {
        if (document.getElementById('ppbutton')) {
            this._configPaypal();
        }
        else {
            setTimeout(() => this._configPaypal(), 1500);
        }
    }
    componentWillReceiveProps(nextProps) {
        this._configPaypal();
    }
    _configPaypal() {
        if (!document.getElementById('ppbutton')) {
            return;
        }
        document.getElementById('ppbutton').innerHTML = "";

        paypal.Button.render({
            env: process.env.REACT_APP_PAYPAL_MODE, // 'sandbox' or 'production',
            style: {
                size: 'responsive',
                color: 'blue',
                shape: 'rect',
                label: 'pay',
                fundingicons: true
            },
            client: {
                // from https://developer.paypal.com/developer/applications/
                sandbox: process.env.REACT_APP_PAYPAL_SANDBOX,
                production: process.env.REACT_APP_PAYPAL_PRODUCTION
            },
            validate: (actions) => {
                if (this.props.disabled) { actions.disable(); }
                else { actions.enable(); }
            },
            // See https://developer.paypal.com/docs/api/payments/#payment_create 
            payment: (data, actions) =>
                actions.payment.create({
                    intent: "sale",
                    payment: {
                        transactions: [
                            {
                                amount: {
                                    total: this.props.total,
                                    currency: "USD",
                                    details: {
                                        subtotal: this.props.total,
                                        tax: "0.00"
                                    }
                                },
                                description: "Golf Swing Analysis",
                                item_list: {
                                    items: [
                                        {
                                            name: this.props.deal.name,
                                            description: this.props.deal.description,
                                            quantity: 1,
                                            price: Math.max(this.props.total, 0.01),
                                            tax: "0.00",
                                            currency: "USD"
                                        }
                                    ]
                                }
                            }]
                    },
                    experience: {
                        input_fields: {
                            no_shipping: 1
                        }
                    }
                }),
            commit: true,
            onAuthorize: this.props.authorized,//(data, actions) => {}
            onCancel: this.props.canceled, //(data)=>{}
            onError: this.props.error //(err) => {}
        }, '#ppbutton');
    }


    render() {
        const style = this.props.disabled ? {
            marginTop: '2rem',
            height: 'auto',
            opacity: '0.5',
            pointerEvents: 'none'
        } :
            {
                marginTop: '2rem',
                height: 'auto'
            };

        return (
            <div id="ppbutton" className="button" style={style}></div>
        );
    }
}

export default PaypalButton;
