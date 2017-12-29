import React, { Component } from 'react';
import paypal from 'paypal-checkout';
//var braintree = require('braintree-web');


// let paypal = require('braintree-web/paypal');
// let client = require('braintree-web/client');
// let paypalCheckout = require('braintree-web/paypal-checkout');
// import {paypalCheckout} from 'braintree-web';
// import {paypal} from 'braintree-web';

class PaypalButton extends Component {
  componentDidMount(){
    if(document.getElementById('ppbutton')){
        this._configPaypal();
    }
    else{
        setTimeout(()=>this._configPaypal(),1500);
    }
  }
  componentWillReceiveProps(nextProps){
    this._configPaypal();
  }
  _configPaypal(){
    if(!document.getElementById('ppbutton')){
        return;
    }
    document.getElementById('ppbutton').innerHTML = "";

    paypal.Button.render({
        env: 'sandbox',
        style: {
            size: 'responsive',
            color: 'blue',
            shape: 'rect',
            label: 'pay',
            fundingicons: true
        },
        client: {
        // from https://developer.paypal.com/developer/applications/
            sandbox:    'AUdpw5-vad4rjjbmn52xP5Gw_8NfZO14Ff0iB0GvjN2cvjFNvq-9yzgVuAUxckNVIf9VDRQCnd8OF2Vg',
            production: 'xxxxxxxxx'  
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
                                price: this.props.total,
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
        onAuthorize: this.props.authorized,//(data, actions)=>{}
        onCancel: this.props.canceled //(data)=>{}
    }, '#ppbutton');
  }


  render() {
    return (
        <div id="ppbutton" className="button" style={{marginTop:'2rem', height: 'auto'}}></div>
    );
  }
}

export default PaypalButton;
