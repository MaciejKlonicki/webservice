import React, { Component } from 'react'

class About extends Component {

  render() {
    return (
    <>
      <div className='About'>
        About {localStorage.getItem("email")}
        {localStorage.getItem("username")}
      </div>
    </>
    );
  }
}

export default About;
