import React, { Component } from 'react';

class Banner extends Component {
  constructor(props){
    super(props);
    this.state={
      hidden: false
    }
  }
  render() {
    return (
      <span className="banner" style={this.state.hidden?{display:'none'}:{}}>
        Welcome to our new site! If you find any bugs, please let us know at <b style={{fontWeight: 'bold'}}><a href='mailto:info@swingessentials.com'>info@swingessentials.com</a></b>.
        <svg viewBox="0 0 20 20" onClick={()=>this.setState({hidden:true})} style={{
          position: 'absolute',
          right: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          height: '1.25rem',
          width: '1.25rem',
          cursor: 'pointer',
          fill: 'white'
        }}>
                <polygon points="17.9,3.7 16.3,2.1 10,8.4 3.7,2.1 2.1,3.7 8.4,10 2.1,16.3 3.7,17.9 10,11.6 16.3,17.9 17.9,16.3 11.6,10 "/>
            </svg>      
      </span>
    );
  }
}
export default Banner;
