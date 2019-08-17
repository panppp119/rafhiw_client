import React from 'react';

import deafultImg from './default.png'

class Img extends React.Component {
  render() {
    const { src, alt } = this.props;

    return (
      <img
        src={src || deafultImg}
        alt={alt || 'รูป'}
      />
    );
  }
}

export default Img;
