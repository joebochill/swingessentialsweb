import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Footer extends Component {
  render() {
    const year = (new Date()).getFullYear();
    return (
      <section className="se_footer" style={{position: 'relative'}}>
        <p>{`Copyright © Swing Essentials, LLC. ${year} - ${year + 1}`}</p>
        <p><NavLink to='/legal/privacy'>Privacy Policy</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;<NavLink to='/legal/terms'>Terms of Use</NavLink></p>
        <p style={{
            position: 'absolute', 
            width: 'auto',
            right: '0.5rem', 
            bottom: '0.5rem', 
            fontSize: '0.65rem',
            lineHeight: 1,
            opacity: 0.5
          }}>{`v 2.1.0`}</p>
      </section>
    );
  }
}

export default Footer;
