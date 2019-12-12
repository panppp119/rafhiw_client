import React from 'react';
import { Link } from 'react-router-dom'
import { Map, List } from 'immutable';

import CountdownTimer from 'components/CountdownTimer';
import DateConvert from 'components/converts/DateConvert';

import './EventTable.scss';

class EventTable extends React.Component {
  static defaultProps = {
    item: Map(),
    events: List()
  };

  state = {
    num: 0
  };

  render() {
    const { events } = this.props;

    return (
      <div className="event-table table-responsive">
        <table>
          <thead>
            <tr>
              <th>ชื่องาน</th>
              <th>เวลา</th>
            </tr>
          </thead>
          <tbody>
            {
              !events.isEmpty() ? events.map((event, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <div
                        className="image"
                        style={{
                          backgroundImage: `url(${event.get('image') || process.env.REACT_APP_DEFAULT_IMAGE})`
                        }}
                        aria-label={event.get('name')}
                      />
                      <div className="info">
                        <Link to={`/e/${event.get('id')}`}>
                          <h4>{event.get('name')}</h4>
                        </Link>
                        <p>{event.getIn(['location', 'name'], '')}</p>
                        <p>
                          ระหว่างวันที{' '}
                          <DateConvert date={event.get('start_date')} /> -{' '}
                          <DateConvert date={event.get('end_date')} />
                        </p>
                      </div>
                    </td>
                    <td><CountdownTimer item={event} /></td>
                  </tr>
                )
              }) : (
                <tr>
                  <td colSpan='2' className='no-item'>ไม่มีงาน</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default EventTable;
