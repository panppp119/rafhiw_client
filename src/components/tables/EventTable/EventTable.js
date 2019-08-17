import React from 'react';
// import Moment from 'moment';
import { Link } from 'react-router-dom'
import { Map, List } from 'immutable';

import CountdownTimer from 'components/CountdownTimer';

import './EventTable.scss';

class EventTable extends React.Component {
  static defaultProps = {
    item: Map(),
    events: List()
  };

  state = {
    num: 0
  };

  setActive(i) {
    if (i === this.state.num) {
      this.setState({ num: 0, index: i });
    } else {
      this.setState({ num: i, index: i });
    }
  }

  render() {
    // const { events } = this.props;
    // const { num, index } = this.state;

    return (
      <div className="event-table">
        <table>
          <thead>
            <tr>
              <th>ชื่องาน</th>
              <th>เวลา</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div
                  className="image"
                  style={{
                    backgroundImage: `url()`
                  }}
                />
                <div className="info">
                  <Link to={`/events/`}>
                    <h4>ชื่องาน</h4>
                  </Link>
                  <p>ชื่อสถานที่</p>
                  <p>
                    ระหว่างวันที{' '}
                    {/* {Moment(event.get('start_date')).format('MM/DD/YY')}
                    -{Moment(event.get('end_date')).format('MM/DD/YY')} */}
                  </p>
                </div>
              </td>
              <td><CountdownTimer /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default EventTable;
