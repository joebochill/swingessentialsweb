import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
    <section className="se_footer">
      <p>Copyright &copy; Swing Essentials, LLC. 2017 - 2018</p>
      <p><NavLink to='/legal/privacy'>Privacy Policy</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;<NavLink to='/legal/terms'>Terms of Use</NavLink></p>
    </section>
    );
  }
}

export default Footer;
