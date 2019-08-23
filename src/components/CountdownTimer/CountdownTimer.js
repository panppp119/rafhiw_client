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
            <h3>{Numeral(days).format('00')}</h3>
            <p className='time'>วัน</p>
          </div>
          <div className="unit">
            <h3>{Numeral(hours).format('00')}</h3>
            <p className='time'>ชั่วโมง</p>
          </div>
          <div className="unit">
            <h3>{Numeral(minutes).format('00')}</h3>
            <p className='time'>นาที</p>
          </div>
          <div className="unit">
            <h3>{Numeral(seconds).format('00')}</h3>
            <p className='time'>วินาที</p>
          </div>
        </div>
      );
    } else {
      // Render a countdown
      return (
        <div className="countdown-timer">
          <div className="unit">
            <h3>{Numeral(days).format('00')}</h3>
            <p className='time'>วัน</p>
          </div>
          <div className="unit">
            <h3>{Numeral(hours).format('00')}</h3>
            <p className='time'>ชั่วโมง</p>
          </div>
          <div className="unit">
            <h3>{Numeral(minutes).format('00')}</h3>
            <p className='time'>นาที</p>
          </div>
          <div className="unit">
            <h3>{Numeral(seconds).format('00')}</h3>
            <p className='time'>วินาที</p>
          </div>
        </div>
      );
    }
  };

  render() {
    const { item } = this.props
    
    return (
      item !== undefined && (
        <Countdown
          date={item.get('end_date')}
          renderer={this.renderer}
        />
      )
    );
  }
}

export default CountdownTimer;
