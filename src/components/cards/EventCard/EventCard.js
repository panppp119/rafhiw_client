import React from 'react'
import { Link } from 'react-router-dom'
import { Map } from 'immutable'

import DateConvert from 'components/converts/DateConvert';

import './EventCard.scss'

class EventCard extends React.Component {
  static defaultProps = {
    event: Map()
  }

  render () {
    const { event } = this.props
    const location = event.get('location') || Map()

    return (
      <div id="event-card">
        <Link to={`/e/${event.get('id')}`}>
          <div className="image"
            style={{
              backgroundImage: `url(${event.get('image') || `https://rafhiw.com/uploads/default.png`})`
            }}
            aria-label={event.get('name')}
          />

          <div className="content">
            <h4 className="name">{event.get('name')}</h4>
            <p className='location'>{location.get('name')}</p>
            <p className="date">
              <DateConvert date={event.get('start_date')} /> -{' '}
              <DateConvert date={event.get('end_date')} />
            </p>
          </div>
        </Link>
      </div>
    )
  }
}

export default EventCard
