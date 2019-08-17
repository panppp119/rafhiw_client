import React from 'react';
import Numeral from 'numeral';

class PriceConvert extends React.Component {
  render() {
    return '฿' + Numeral(this.props.price / 100).format('0,0.00');
  }
}

export default PriceConvert;
