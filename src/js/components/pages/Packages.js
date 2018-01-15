import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';

import CardRow from '../rows/CardRow.js';
import Footer from '../footer/Footer.js';
import Loader from '../loader/Loader.js';

import { getPackages, updatePackage, removePackage, addPackage } from '../../actions/PackageActions.js';
import {openModal} from '../../actions/modalActions.js';

import '../../../css/Cards.css';
import '../../../css/Buttons.css';


const mapStateToProps = (state)=>{
  return {
    token: state.login.token,
    admin: state.login.admin,
    packages: state.packages
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    goToSignIn: () => {dispatch(replace('/signin'));},
    replace: (val) => {dispatch(replace(val));},
    requestPackages: (token) => {dispatch(getPackages(token))},
    updatePackage: (token, pack) => {dispatch(updatePackage(token, pack))},
    removePackage: (token, pack) => {dispatch(removePackage(token, pack))},
    addPackage: (token, pack) => {dispatch(addPackage(token, pack))},
    openModal: (modal) => {dispatch(openModal(modal))} 
  }
};

class PackagesPage extends Component {
  constructor(props){
    super(props);
    this.state={
      editPackage: null,
      newPackage: false,

      // Package Properties
      p_name: '',
      p_description: '',
      // p_shortcode: '',
      p_count: '',
      p_unlimited: false,
      p_duration: '',
      p_price: ''
    };
  }
  componentWillMount(){
    if(!this.props.token || !this.props.admin){
      this.props.replace('/home');
    }
    else{
      // If we don't have packages, request them from the server
      if(!this.props.packages.list.length){
        this.props.requestPackages(this.props.token);
      }
      window.scrollTo(0,0);
    }
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.token || !nextProps.admin){
      this.props.goToSignIn();
    }
  }

  _changeEditPackage(newPackage, save){
    if(this.state.editPackage && save){ //clicked the save button
      // Push the updated package details to the server
      if(!this._validatePackage()){return;}
      this.props.updatePackage(this.props.token,{
        id: this.state.editPackage,
        name: this.state.p_name,
        description: this.state.p_description,
        shortcode: this.state.p_name.split(' ')[0].toLowerCase(),
        count: (this.state.p_unlimited ? -1 : this.state.p_count),
        duration: (this.state.p_unlimited ? this.state.p_duration : 0),
        price: this.state.p_price
      });
    }
    if(newPackage){ // Clicked Edit Button
      this.setState({
        editPackage: newPackage.id,
        p_name: newPackage.name,
        p_description: newPackage.description,
        // p_shortcode: newPackage.shortcode,
        p_count: newPackage.count,
        p_unlimited: (parseInt(newPackage.count, 10) === -1),
        p_duration: newPackage.duration,
        p_price: newPackage.price
      }); 
    }
    else{ // Clicked cancel or save
      this.setState({
        editPackage: null,
        newPackage: false,

        p_name: null,
        p_description: null,
        // p_shortcode: null,
        p_count: null,
        p_unlimited: null,
        p_duration: null,
        p_price: null,
      }); 
    }
  }

  _validatePackage(){
    return !(
      !this.state.p_name ||
      !this.state.p_description ||
      (!this.state.p_count && !this.state.p_unlimited) ||
      (this.state.p_unlimited && !this.state.p_duration) ||
      !this.state.p_price ||
      !this.state.p_price.match(/^[0-9]*\.[0-9]{2}$/i) 
    );
  }

  _removePackage(id){
    this.props.removePackage(this.props.token, {id:id});
  }

  _createNewPackage(){
    this.setState({
      newPackage: true,
      editPackage: -1,
      p_name: '',
      p_description: '',
      p_count: '',
      p_unlimited: false,
      p_duration: '',
      p_price: ''
    });
  }

  _addNewPackage(){
    if(!this._validatePackage()){return;}
    
    this.props.addPackage(this.props.token,{
      name: this.state.p_name,
      description: this.state.p_description,
      shortcode: this.state.p_name.split(' ')[0].toLowerCase(),
      count: (this.state.p_unlimited ? -1 : this.state.p_count),
      duration: (this.state.p_unlimited ? this.state.p_duration : 0),
      price: this.state.p_price
    });

    this.setState({
      editPackage: null,
      newPackage: false,
      
      p_name: '',
      p_description: '',
      p_count: '',
      p_unlimited: false,
      p_duration: '',
      p_price: ''
    });
  }

  render() {
    return (
      <div>
        <section className="landing_image image5">
          <main className="page_title">
            <h1>Administrator Tools</h1>
            <h3>Manage Your Deals</h3>
          </main>
        </section>
        <div>
        {this.props.packages.loading &&
            <section className="left">
              <div>
                  <p>Loading Packages...</p>
                  <Loader/>
              </div>
            </section>
          }
        <section className="left">
            <div className="structured_panel">
              <h1>PACKAGES</h1>
              {!this.state.newPackage && 
                <div className="button se_button" style={{marginTop:'0rem'}} onClick={this._createNewPackage.bind(this)}>
                  <span>New Package</span>
                </div>
              }
              {this.state.newPackage &&
                <div className="card">
                <div className="card_header">
                  <span>New Package</span>
                  <span onClick={() => this._addNewPackage()} disabled={!this._validatePackage()}>ADD</span>
                  <span onClick={this._changeEditPackage.bind(this, null, false)}>CANCEL</span>                    
                </div>
                <div className="card_body">
                  <CardRow alternate nohover title={"Name"} extra={
                    <input 
                      value={this.state.p_name} 
                      onChange={(evt) => this.setState({p_name: evt.target.value})}
                      placeholder={"Package Name"}
                    />
                  }/>
                  <CardRow alternate nohover title={"Description"} extra={
                    <input 
                      value={this.state.p_description} 
                      onChange={(evt) => this.setState({p_description: evt.target.value})}
                      placeholder={"Brief Description"}
                    />
                  }/>
                  <CardRow alternate nohover title={"Lesson Count"} extra={
                    <span>
                      <input 
                        ref={(me) => this.lessonCount = me}
                        style={{marginRight: '1rem'}}
                        value={(parseInt(this.state.p_count, 10) === -1 ? '' : this.state.p_count)} 
                        disabled={this.state.p_unlimited}
                        placeholder={'0'}
                        onChange={(evt) => {
                          let pos = this.lessonCount.selectionStart; 
                          this.setState({p_count: evt.target.value.replace(/[^0-9]/gi,"")}); 
                          this.lessonCount.selectionStart = pos;
                        }}
                      />
                      <input 
                        type="checkbox" 
                        onChange={(evt) => this.setState({p_unlimited: evt.target.checked, p_count: ''})}
                        checked={this.state.p_unlimited}
                      />
                      <span style={{marginLeft:'0.5rem'}}>Unlimited</span>
                    </span>
                  }/>
                  {this.state.p_unlimited &&
                    <CardRow alternate nohover title={"Duration (Days)"} extra={
                      <input 
                        ref={(me) => this.unlDur = me}
                        value={this.state.p_duration} 
                        placeholder={'0'}
                        onChange={(evt) => {
                          let pos = this.unlDur.selectionStart; 
                          this.setState({p_duration: evt.target.value.replace(/[^0-9]/gi,"")}); 
                          this.unlDur.selectionStart = pos;
                        }}
                      />
                    }/>
                  }
                  <CardRow alternate nohover title={"Price"} extra={
                    <input 
                      ref={(me) => this.price = me}
                      value={this.state.p_price} 
                      placeholder={'XX.XX'}
                      onChange={(evt) => {
                        let pos = this.price.selectionStart; 
                        this.setState({p_price: evt.target.value.replace(/[^0-9.]/gi,"")}); 
                        this.price.selectionStart = pos;
                      }}
                    />
                  }/>
                </div>
              </div>
              }
              {this.props.packages.list && this.props.packages.list.map((deal, index) =>
                (this.state.editPackage === deal.id ? 
                <div key={'package_' + index} className="card">
                  <div className="card_header">
                    <span/>
                    <span onClick={this._changeEditPackage.bind(this, null, true)} disabled={!this._validatePackage()}>SAVE</span>
                    <span 
                      onClick={() => this.props.openModal({
                        type: 'CONFIRM',
                        props:{
                          title: 'Remove Package: ' + deal.name,
                          body: ['Deleting this package will permanently remove it from the database. This action cannot be undone.',
                                  'Are you sure you want to delete this package?'],
                          buttons: [
                            {name:'DELETE', action: () => this._removePackage(deal.id)}
                          ]
                        }
                      })}
                    >DELETE</span>
                    <span onClick={this._changeEditPackage.bind(this, null, false)}>CANCEL</span>                    
                  </div>
                  <div className="card_body">
                    <CardRow alternate nohover title={"Name"} extra={
                      <input 
                        value={this.state.p_name} 
                        onChange={(evt) => this.setState({p_name: evt.target.value})}
                        placeholder={"Package Name"}
                      />
                    }/>
                    <CardRow alternate nohover title={"Description"} extra={
                      <input 
                        value={this.state.p_description} 
                        onChange={(evt) => this.setState({p_description: evt.target.value})}
                        placeholder={"Brief Description"}
                      />
                    }/>
                    <CardRow alternate nohover title={"Lesson Count"} extra={
                      <span>
                        <input 
                          ref={(me) => this.lessonCount = me}
                          style={{marginRight: '1rem'}}
                          value={(parseInt(this.state.p_count, 10) === -1 ? '' : this.state.p_count)} 
                          disabled={this.state.p_unlimited}
                          placeholder={'0'}
                          onChange={(evt) => {
                            let pos = this.lessonCount.selectionStart; 
                            this.setState({p_count: evt.target.value.replace(/[^0-9]/gi,"")}); 
                            this.lessonCount.selectionStart = pos;
                          }}
                        />
                        <input 
                          type="checkbox" 
                          onChange={(evt) => this.setState({p_unlimited: evt.target.checked, p_count: ''})}
                          checked={this.state.p_unlimited}
                        />
                        <span style={{marginLeft:'0.5rem'}}>Unlimited</span>
                      </span>
                    }/>
                    {this.state.p_unlimited &&
                      <CardRow alternate nohover title={"Duration (Days)"} extra={
                        <input 
                          ref={(me) => this.unlDur = me}
                          value={this.state.p_duration} 
                          placeholder={'0'}
                          onChange={(evt) => {
                            let pos = this.unlDur.selectionStart; 
                            this.setState({p_duration: evt.target.value.replace(/[^0-9]/gi,"")}); 
                            this.unlDur.selectionStart = pos;
                          }}
                        />
                      }/>
                    }
                    <CardRow alternate nohover title={"Price"} extra={
                      <input 
                        ref={(me) => this.price = me}
                        value={this.state.p_price} 
                        placeholder={'XX.XX'}
                        onChange={(evt) => {
                          let pos = this.price.selectionStart; 
                          this.setState({p_price: evt.target.value.replace(/[^0-9.]/gi,"")}); 
                          this.price.selectionStart = pos;
                        }}
                      />
                    }/>
                  </div>
                </div>
                :
                <div key={'package_' + index} className="card">
                  <div className="card_header">
                    <span>{deal.name}</span>
                    <span onClick={this._changeEditPackage.bind(this, deal, false)}>EDIT</span>
                  </div>
                  <div className="card_body">
                    <CardRow alternate nohover title={"Description"} extra={deal.description}/>
                    <CardRow alternate nohover title={"Lesson Count"} extra={parseInt(deal.count,10) === -1 ? "Unlimited" : deal.count}/>
                    {parseInt(deal.count, 10) === -1 && 
                      <CardRow alternate nohover title={"Duration (Days)"} extra={deal.duration}/>
                    }
                    <CardRow alternate nohover title={"Price"} extra={"$" + deal.price}/>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PackagesPage);
