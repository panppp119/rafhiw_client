import React from 'react';
import Countdown from 'react-countdown-now';
import Numeral from 'numeral';

import './CountdownTimer.scss';

class CountdownTimer extends React.Component {
  static defaultProps = {
    days: 0,
    hours: 0,
    seconds: 0,
    completed: true
  }

  renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return (
        <div className="countdown-timer">
          <div className="unit">
            <h3 className="fixfontsize">{Numeral(days).format('00')}</h3>
            <h4 className="fixfontsize">วัน</h4>
          </div>
          <div className="unit">
            <h3 className="fixfontsize">{Numeral(hours).format('00')}</h3>
            <h4 className="fixfontsize">ชั่วโมง</h4>
          </div>
          <div className="unit">
            <h3 className="fixfontsize">{Numeral(minutes).format('00')}</h3>
            <h4 className="fixfontsize">นาที</h4>
          </div>
          <div className="unit">
            <h3 className="fixfontsize">{Numeral(seconds).format('00')}</h3>
            <h4 className="fixfontsize">วินาที</h4>
          </div>
        </div>
      );
    } else {
      // Render a countdown
      return (
        <div className="countdown-timer">
          <div className="unit">
            <h3 className="fixfontsize">{Numeral(days).format('00')}</h3>
            <h4 className="fixfontsize">วัน</h4>
          </div>
          <div className="unit">
            <h3 className="fixfontsize">{Numeral(hours).format('00')}</h3>
            <h4 className="fixfontsize">ชั่วโมง</h4>
          </div>
          <div className="unit">
            <h3 className="fixfontsize">{Numeral(minutes).format('00')}</h3>
            <h4 className="fixfontsize">นาที</h4>
          </div>
          <div className="unit">
            <h3 className="fixfontsize">{Numeral(seconds).format('00')}</h3>
            <h4 className="fixfontsize">วินาที</h4>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      this.props.item !== undefined && (
        <Countdown
          date={this.props.item.get('end_date')}
          renderer={this.renderer}
        />
      )
    );
  }
}

export default CountdownTimer;
