import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBios, updateBio, removeBio, addBio } from '../../actions/BioActions.js';
import { convertTextToP, convertLineToText, convertTextToLine } from '../../utils/utils.js';

import { openModal } from '../../actions/modalActions.js';


import Footer from '../footer/Footer.js';
import Loader from '../loader/Loader.js';


const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    admin: state.login.admin,
    pros: state.pros
  };
}
var mapDispatchToProps = function (dispatch) {
  return {
    requestBios: (token) => { dispatch(getBios(token)) },
    updateBio: (token, bio) => { dispatch(updateBio(token, bio)) },
    removeBio: (token, bio) => { dispatch(removeBio(token, bio)) },
    addBio: (token, bio) => { dispatch(addBio(token, bio)) },
    openModal: (modal) => { dispatch(openModal(modal)) }
  }
};

class OurProPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editPro: null,
      newPro: false,

      //Pro properties
      pro_name: '',
      pro_bio: '',
      pro_image: '',
      saving: null
    };
  }

  componentWillMount() {
    if (!this.props.pros.list.length) {
      this.props.requestBios(this.props.token);
    }
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pros.loading && !nextProps.pros.loading) {
      this.setState({ saving: null });
    }
  }

  _changeEditPro(newPro, save) {
    if (this.state.editPro && save) { //clicked the save button
      // Push the updated pro details to the server
      if (!this._validatePro()) { return; }
      this.props.updateBio(this.props.token, {
        id: this.state.editPro,
        name: this.state.pro_name,
        bio: convertLineToText(this.state.pro_bio),
        image: this.state.pro_image
      });
    }
    if (newPro) { // Clicked Edit Button
      this.setState({
        editPro: newPro.id,
        pro_name: newPro.name,
        pro_bio: convertTextToLine(newPro.bio),
        pro_image: newPro.image
      });
    }
    else { // Clicked cancel or save
      this.setState({
        editPro: null,
        newPro: false,

        pro_name: null,
        pro_bio: null,
        pro_image: null,
        saving: save ? this.state.editPro : null
      });
    }
  }

  _validatePro() {
    return !(
      !this.state.pro_name ||
      !this.state.pro_bio ||
      !this.state.pro_image
    );
  }

  _removePro(id) {
    this.props.removeBio(this.props.token, { id: id });
  }

  _createNewPro() {
    this.setState({
      newPro: true,
      editPro: -1,
      pro_name: '',
      pro_bio: '',
      pro_image: '',
      saving: null
    });
  }

  _addNewPro() {
    if (!this._validatePro()) { return; }

    this.props.addBio(this.props.token, {
      name: this.state.pro_name,
      bio: convertLineToText(this.state.pro_bio),
      image: this.state.pro_image
    });

    this.setState({
      editPro: null,
      newPro: false,

      pro_name: '',
      pro_bio: '',
      pro_image: '',
      saving: null
    });
  }

  render() {
    return (
      <div>
        <section className="landing_image image6">
          <div className="page_title">
            <h1>{this.props.pros.list.length > 1 ? 'Meet Our Pros' : 'Meet Our Pro'}</h1>
            <h3>The {this.props.pros.list.length > 1 ? 'Ones' : 'Man'} Behind the Magic</h3>
          </div>
        </section>
        {this.props.pros.loading &&
          <section className="left">
            <div>
              <p>Loading Bios...</p>
              <Loader />
            </div>
          </section>
        }
        {this.props.admin &&
          <section className="left">
            {!this.state.newPro &&
              <div className="structured_panel">
                <div className="button se_button" style={{ marginTop: '0rem' }} onClick={this._createNewPro.bind(this)}>
                  <span>New Pro</span>
                </div>
              </div>
            }
            {this.state.newPro && <h1>New Pro</h1>}
            {this.state.newPro &&
              <div className="structured_panel">
                <label style={{ marginTop: '2rem' }}>Name</label>
                <input type="text"
                  value={this.state.pro_name}
                  maxLength={64}
                  placeholder={'Tiger Woods'}
                  onChange={(evt) => { this.setState({ pro_name: evt.target.value }) }}
                />
                <label style={{ marginTop: '1rem' }}>Picture</label>
                <input type="text"
                  value={this.state.image}
                  maxLength={64}
                  onChange={(evt) => this.setState({ pro_image: evt.target.value })}
                />
                <label style={{ marginTop: '1rem' }}>Bio</label>
                <textarea value={this.state.pro_bio}
                  maxLength={65000}
                  onChange={(evt) => this.setState({ pro_bio: evt.target.value })}
                />
              </div>
            }
            {this.state.newPro &&
              <span style={{ marginTop: '2rem' }}>
                <span
                  className="button_link"
                  onClick={() => this._addNewPro()}
                  disabled={!this.state.pro_name || !this.state.pro_image || !this.state.pro_bio}
                >ADD</span>
                <span
                  className="button_link"
                  style={{ marginLeft: '1rem' }}
                  onClick={() => this.setState({ newPro: false })}
                >CANCEL</span>
              </span>
            }
          </section>
        }
        <div>
          {/* <section className="left">
            <div className="headshot" alt="Headshot"/>
            <h1>Alan J. Nelson</h1>
            <p>It's a pleasure to meet you. My name is A.J. Nelson and I am a Class A Member of the PGA. My goal is to grow the game of golf, one player at a time.</p>
            <p>I have been working in the golf industry for fifteen years and have given over 800 lessons.  I currently hold a Masters Degree from the University of Maryland, College Park and have graduated from the PGA sponsored Professional Golf Management Program.</p>
            <p>My strengths lie in teaching, club fitting, and player development. I look forward to bringing you my expertise in golf and feel extremely privileged to have the opportunity to work with you.</p>
          </section> */}
          {this.props.pros.list && this.props.pros.list.map((pro, index) => (
            <section key={'bio_' + index} className="left">
              <img className="headshot" alt="Headshot" src={"https://www.swingessentials.com/images/pros/" + pro.image} />
              {this.props.admin && this.state.editPro !== pro.id &&
                <span style={{ marginBottom: '2rem' }}>
                  <span
                    className="button_link"
                    onClick={this._changeEditPro.bind(this, pro, false)}
                  >EDIT</span>
                </span>
              }
              {this.state.editPro === pro.id &&
                <div className="structured_panel">
                  <label>Name</label>
                  <input type="text"
                    value={this.state.pro_name}
                    placeholder={'Tiger Woods'}
                    maxLength={64}
                    onChange={(evt) => { this.setState({ pro_name: evt.target.value }); }}
                  />
                  <label style={{ marginTop: '1rem' }}>Image</label>
                  <input type="text"
                    value={this.state.pro_image}
                    maxLength={64}
                    onChange={(evt) => this.setState({ pro_image: evt.target.value })}
                  />
                  <label style={{ marginTop: '1rem' }}>Bio</label>
                  <textarea value={this.state.pro_bio}
                    maxLength={65000}
                    onChange={(evt) => this.setState({ pro_bio: evt.target.value })}
                  />
                </div>
              }
              {this.props.admin && this.state.editPro === pro.id &&
                <span style={{ marginTop: '2rem' }}>
                  <span
                    className="button_link"
                    onClick={this._changeEditPro.bind(this, null, true)}
                    disabled={!this.state.pro_name || !this.state.pro_image || !this.state.pro_bio}
                  >SAVE</span>
                  <span
                    className="button_link"
                    style={{ marginLeft: '1rem' }}
                    onClick={() => this.props.openModal({
                      type: 'CONFIRM',
                      props: {
                        title: 'Remove Pro: ' + this.state.pro_name,
                        body: ['Deleting this pro will permanently remove them from the database. This action cannot be undone.',
                          'Are you sure you want to delete this pro?'],
                        buttons: [
                          { name: 'DELETE', action: () => this._removePro(pro.id) }
                        ]
                      }
                    })}
                  >DELETE</span>
                  <span
                    className="button_link"
                    style={{ marginLeft: '1rem' }}
                    onClick={this._changeEditPro.bind(this, null, false)}
                  >CANCEL</span>

                </span>
              }
              {this.props.pros.loading && this.state.saving === pro.id && <Loader />}
              {this.state.editPro !== pro.id && this.state.saving !== pro.id &&
                <div className="structured_panel wide bold">
                  <h1>{pro.name}</h1>
                  {convertTextToP(pro.bio)}
                </div>
              }
            </section>
          ))}
          <Footer />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OurProPage);
