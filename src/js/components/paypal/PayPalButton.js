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

    let CREATE_PAYMENT_URL = 'http://www.josephpboyle.com/api/myapi.php/createpayment';
    let EXECUTE_PAYMENT_URL = 'http://www.josephpboyle.com/api/myapi.php/executepayment';
    
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
        // payment: function(){
        //     return paypal.request.post(CREATE_PAYMENT_URL).then(function(data){
        //         return data.id;
        //     });
        // },
        commit: true,
        // onAuthorize: (data) =>{
        //     return paypal.request.post(EXECUTE_PAYMENT_URL, {
        //         paymentID: data.paymentID,
        //         payerID: data.payerID
        //     })
        //     .then(()=>
        //         alert('success: payment complete')
        // )
        // },
        //onAuthorize: this.props.authorized,//(data, actions)=>{}
        onAuthorize: (data, actions) => this.props.executePayment({paymentID: data.paymentID, payerID: data.payerID}),
        onCancel:(data)=>console.log(data)// this.props.canceled //(data)=>{}
    }, '#ppbutton');
  }


  render() {
    return (
        <div id="ppbutton" className="button" style={{marginTop:'2rem', height: 'auto'}}></div>
    );
  }
}

export default PaypalButton;
