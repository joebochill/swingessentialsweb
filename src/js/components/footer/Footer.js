import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Footer extends Component {
  render() {
    const year = (new Date()).getFullYear();
    return (
      <section className="se_footer">
        <p>{`Copyright © Swing Essentials, LLC. ${year - 1} - ${year}`}</p>
        <p><NavLink to='/legal/privacy'>Privacy Policy</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;<NavLink to='/legal/terms'>Terms of Use</NavLink></p>
      </section>
    );
  }
}

export default Footer;
