import React from 'react';
import Moment from 'moment';

class DateConvert extends React.Component {
  static defaultProps = {
    time: false,
    date: new Date()
  };

  render() {
    return this.props.time
      ? Moment(this.props.date).format('DD/MM/YYYY HH:mm')
      : Moment(this.props.date).format('DD/MM/YYYY');
  }
}

export default DateConvert;
