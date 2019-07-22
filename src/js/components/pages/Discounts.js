import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

import CardRow from '../rows/CardRow.js';
import Footer from '../footer/Footer.js';
import Loader from '../loader/Loader.js';

import { getDiscounts, updateDiscount, removeDiscount, addDiscount } from '../../actions/DiscountActions.js';
import { openModal } from '../../actions/modalActions.js';
import { getDate } from '../../utils/utils.js';

import '../../../css/Cards.css';
import '../../../css/Buttons.css';


const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    admin: state.login.admin,
    discounts: state.discounts
  };
}
var mapDispatchToProps = function (dispatch) {
  return {
    goToSignIn: () => { dispatch(replace('/signin')); },
    replace: (val) => { dispatch(replace(val)); },
    requestDiscounts: (token) => { dispatch(getDiscounts(token)) },
    updateDiscount: (token, pack) => { dispatch(updateDiscount(token, pack)) },
    removeDiscount: (token, pack) => { dispatch(removeDiscount(token, pack)) },
    addDiscount: (token, pack) => { dispatch(addDiscount(token, pack)) },
    openModal: (modal) => { dispatch(openModal(modal)) }
  }
};

class DiscountsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editDiscount: null,
      newDiscount: false,

      // Coupon Code Properties
      c_code: '',
      c_description: '',
      c_amount: '',
      c_type: '',
      c_quantity: '',
      c_unlimited: true,
      c_expires: '',
      c_forever: false
    };
  }
  componentWillMount() {
    if (!this.props.token || !this.props.admin) {
      this.props.replace('/home');
    }
    else {
      // If we don't have Discounts, request them from the server
      if (!this.props.discounts.list.length) {
        this.props.requestDiscounts(this.props.token);
      }
      window.scrollTo(0, 0);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.token || !nextProps.admin) {
      this.props.goToSignIn();
    }
  }

  _changeEditDiscount(newDiscount, save) {
    if (this.state.editDiscount && save) { //clicked the save button
      // Push the updated discount details to the server
      if (!this._validateDiscount()) { return; }
      this.props.updateDiscount(this.props.token, {
        id: this.state.editDiscount,
        code: this.state.c_code,
        description: this.state.c_description,
        type: this.state.c_type,
        value: this.state.c_amount,
        expires: (this.state.c_forever ? -1 : new Date(this.state.c_expires).getTime() / 1000),
        quantity: (this.state.c_unlimited ? -1 : this.state.c_quantity)
      });
    }
    if (newDiscount) { // Clicked Edit Button
      this.setState({
        editDiscount: newDiscount.id,
        c_code: newDiscount.code,
        c_description: newDiscount.description,
        c_type: newDiscount.type,
        c_amount: newDiscount.value,
        c_unlimited: (parseInt(newDiscount.quantity, 10) === -1),
        c_expires: getDate(parseInt(newDiscount.expires, 10) * 1000),
        c_forever: (parseInt(newDiscount.expires, 10) === -1),
        c_quantity: newDiscount.quantity
      });
    }
    else { // Clicked cancel or save
      this.setState({
        editDiscount: null,
        newDiscount: false,

        c_code: '',
        c_description: '',
        c_type: 'amount',
        c_amount: '',
        c_unlimited: false,
        c_expires: '',
        c_forever: false,
        c_quantity: ''
      });
    }
  }

  _validateDiscount() {
    return !(
      !this.state.c_code ||
      !this.state.c_description ||
      !this.state.c_type ||
      !this.state.c_amount ||
      (!this.state.c_forever && !this.state.c_expires) ||
      (!this.state.c_forever && !this.state.c_expires.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) ||
      (!this.state.c_unlimited && !this.state.c_quantity)
    );
  }

  _removeDiscount(id) {
    this.props.removeDiscount(this.props.token, { id: id });
  }

  _createNewDiscount() {
    this.setState({
      newDiscount: true,
      editDiscount: -1,

      c_code: '',
      c_description: '',
      c_type: 'amount',
      c_amount: '',
      c_unlimited: false,
      c_expires: '',
      c_forever: false,
      c_quantity: ''
    });
  }

  _addNewDiscount() {
    if (!this._validateDiscount()) { return; }

    this.props.addDiscount(this.props.token, {
      code: this.state.c_code,
      description: this.state.c_description,
      type: this.state.c_type,
      value: this.state.c_amount,
      quantity: (this.state.c_unlimited ? -1 : this.state.c_quantity),
      expires: (this.state.c_forever ? -1 : new Date(this.state.c_expires).getTime() / 1000)
    });

    this.setState({
      editDiscount: null,
      newDiscount: false,

      c_code: '',
      c_description: '',
      c_type: 'amount',
      c_amount: '',
      c_unlimited: false,
      c_expires: '',
      c_forever: false,
      c_quantity: ''
    });
  }

  render() {
    return (
      <div>
        <section className="landing_image image5">
          <div className="page_title">
            <h1>Administrator Tools</h1>
            <h3>Manage Your Discounts</h3>
          </div>
        </section>
        <div>
          {this.props.discounts.loading &&
            <section className="left">
              <div>
                <p>Loading Discounts...</p>
                <Loader />
              </div>
            </section>
          }
          <section className="left">
            <div className="structured_panel">
              <h1>ACTIVE DISCOUNTS</h1>
              {!this.state.newDiscount &&
                <div className="button se_button" style={{ marginTop: '0rem' }} onClick={this._createNewDiscount.bind(this)}>
                  <span>New Discount</span>
                </div>
              }
              {this.state.newDiscount &&
                <div className="card">
                  <div className="card_header">
                    <span>New Discount</span>
                    <span onClick={() => this._addNewDiscount()} disabled={!this._validateDiscount()}>ADD</span>
                    <span onClick={this._changeEditDiscount.bind(this, null, false)}>CANCEL</span>
                  </div>
                  <div className="card_body">
                    <CardRow alternate nohover title={"Code"} extra={
                      <input
                        ref={(me) => this.code = me}
                        value={this.state.c_code}
                        onChange={(evt) => {
                          let pos = this.code.selectionStart;
                          this.setState({ c_code: evt.target.value.replace(/[^A-Z0-9]/gi, "") });
                          this.code.selectionStart = pos;
                        }}
                        placeholder={"XXXXXX"}
                      />
                    } />
                    <CardRow alternate nohover title={"Description"} extra={
                      <input
                        value={this.state.c_description}
                        onChange={(evt) => this.setState({ c_description: evt.target.value })}
                        placeholder={"Summer Savings 2018"}
                      />
                    } />
                    <CardRow alternate nohover title={"Discount"} extra={
                      <span>
                        <input
                          ref={(me) => this.disc = me}
                          style={{ marginRight: '1rem' }}
                          value={this.state.c_amount}
                          onChange={(evt) => {
                            let pos = this.disc.selectionStart;
                            this.setState({ c_amount: evt.target.value.replace(/[^0-9.]/gi, "") });
                            this.disc.selectionStart = pos;
                          }}
                        />
                        <select
                          style={{ width: '4rem' }}
                          value={this.state.c_type}
                          onChange={(evt) => this.setState({ c_type: evt.target.value })}
                        >
                          <option value='amount'>$</option>
                          <option value='percent'>%</option>
                        </select>
                      </span>
                    } />
                    <CardRow alternate nohover title={"Quantity"} extra={
                      <span>
                        <input
                          ref={(me) => this.quant = me}
                          style={{ marginRight: '1rem' }}
                          value={(this.state.c_unlimited ? '' : this.state.c_quantity)}
                          disabled={this.state.c_unlimited}
                          onChange={(evt) => {
                            let pos = this.quant.selectionStart;
                            this.setState({ c_quantity: evt.target.value.replace(/[^0-9.]/gi, "") });
                            this.quant.selectionStart = pos;
                          }}
                        />
                        <input
                          type="checkbox"
                          onChange={(evt) => this.setState({ c_unlimited: evt.target.checked, c_quantity: '' })}
                          checked={this.state.c_unlimited}
                        />
                        <span style={{ marginLeft: '0.5rem' }}>No Limit</span>
                      </span>
                    } />
                    <CardRow alternate nohover title={"Expires"} extra={
                      <span>
                        <input
                          ref={(me) => this.exp = me}
                          style={{ marginRight: '1rem' }}
                          value={(this.state.c_forever ? '' : this.state.c_expires)}
                          disabled={this.state.c_forever}
                          placeholder={'YYYY-MM-DD'}
                          onChange={(evt) => {
                            let pos = this.exp.selectionStart;
                            this.setState({ c_expires: evt.target.value.replace(/[^0-9-]/gi, "") });
                            this.exp.selectionStart = pos;
                          }}
                        />
                        <input
                          type="checkbox"
                          onChange={(evt) => this.setState({ c_forever: evt.target.checked, c_expires: '' })}
                          checked={this.state.c_forever}
                        />
                        <span style={{ marginLeft: '0.5rem' }}>Never</span>
                      </span>
                    } />
                  </div>
                </div>
              }
              {this.props.discounts.list && this.props.discounts.list.map((deal, index) =>
                (this.state.editDiscount === deal.id ?
                  <div key={'discount_' + index} className="card">
                    <div className="card_header">
                      <span />
                      <span onClick={this._changeEditDiscount.bind(this, null, true)} disabled={!this._validateDiscount()}>SAVE</span>
                      <span
                        onClick={() => this.props.openModal({
                          type: 'CONFIRM',
                          props: {
                            title: 'Remove Discount: ' + deal.description,
                            body: ['Deleting this discount will permanently remove it from the database. This action cannot be undone.',
                              'Are you sure you want to delete this discount?'],
                            buttons: [
                              { name: 'DELETE', action: () => this._removeDiscount(deal.id) }
                            ]
                          }
                        })}
                      >DELETE</span>
                      <span onClick={this._changeEditDiscount.bind(this, null, false)}>CANCEL</span>
                    </div>
                    <div className="card_body">
                      <CardRow alternate nohover title={"Code"} extra={
                        <input
                          ref={(me) => this.code = me}
                          value={this.state.c_code}
                          onChange={(evt) => {
                            let pos = this.code.selectionStart;
                            this.setState({ c_code: evt.target.value.replace(/[^A-Z0-9]/gi, "") });
                            this.code.selectionStart = pos;
                          }}
                          placeholder={"XXXXXX"}
                        />
                      } />
                      <CardRow alternate nohover title={"Description"} extra={
                        <input
                          value={this.state.c_description}
                          onChange={(evt) => this.setState({ c_description: evt.target.value })}
                          placeholder={"Summer Savings 2018"}
                        />
                      } />
                      <CardRow alternate nohover title={"Discount"} extra={
                        <span>
                          <input
                            ref={(me) => this.disc = me}
                            style={{ marginRight: '1rem' }}
                            value={this.state.c_amount}
                            onChange={(evt) => {
                              let pos = this.disc.selectionStart;
                              this.setState({ c_amount: evt.target.value.replace(/[^0-9.]/gi, "") });
                              this.disc.selectionStart = pos;
                            }}
                          />
                          <select
                            style={{ width: '4rem' }}
                            value={this.state.c_type}
                            onChange={(evt) => this.setState({ c_type: evt.target.value })}
                          >
                            <option value='amount'>$</option>
                            <option value='percent'>%</option>
                          </select>
                        </span>
                      } />
                      <CardRow alternate nohover title={"Quantity"} extra={
                        <span>
                          <input
                            ref={(me) => this.quant = me}
                            style={{ marginRight: '1rem' }}
                            value={(this.state.c_unlimited ? '' : this.state.c_quantity)}
                            disabled={this.state.c_unlimited}
                            onChange={(evt) => {
                              let pos = this.quant.selectionStart;
                              this.setState({ c_quantity: evt.target.value.replace(/[^0-9.]/gi, "") });
                              this.quant.selectionStart = pos;
                            }}
                          />
                          <input
                            type="checkbox"
                            onChange={(evt) => this.setState({ c_unlimited: evt.target.checked, c_quantity: '' })}
                            checked={this.state.c_unlimited}
                          />
                          <span style={{ marginLeft: '0.5rem' }}>No Limit</span>
                        </span>
                      } />
                      <CardRow alternate nohover title={"Expires"} extra={
                        <span>
                          <input
                            ref={(me) => this.exp = me}
                            style={{ marginRight: '1rem' }}
                            value={(this.state.c_forever ? '' : this.state.c_expires)}
                            disabled={this.state.c_forever}
                            placeholder={'YYYY-MM-DD'}
                            onChange={(evt) => {
                              let pos = this.exp.selectionStart;
                              this.setState({ c_expires: evt.target.value.replace(/[^0-9-]/gi, "") });
                              this.exp.selectionStart = pos;
                            }}
                          />
                          <input
                            type="checkbox"
                            onChange={(evt) => this.setState({ c_forever: evt.target.checked, c_expires: '' })}
                            checked={this.state.c_forever}
                          />
                          <span style={{ marginLeft: '0.5rem' }}>Never</span>
                        </span>
                      } />
                    </div>
                  </div>
                  :
                  <div key={'discount_' + index} className="card">
                    <div className="card_header">
                      <span>{deal.description}</span>
                      <span onClick={this._changeEditDiscount.bind(this, deal, false)}>EDIT</span>
                    </div>
                    <div className="card_body">
                      <CardRow alternate nohover title={"Code"} extra={deal.code} />
                      <CardRow alternate nohover title={"Discount"} extra={(deal.type === 'percent' ? deal.value + '%' : '$' + deal.value)} />
                      <CardRow alternate nohover title={"Remaining"} extra={(parseInt(deal.quantity, 10) === -1 ? "No Limit" : deal.quantity)} />
                      <CardRow alternate nohover title={"Expires"} extra={(parseInt(deal.expires, 10) === -1 ? "Never" : getDate(parseInt(deal.expires, 10) * 1000))} />
                    </div>
                  </div>
                ))}
            </div>
          </section>
          <Footer />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscountsPage);
