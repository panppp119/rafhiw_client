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

    return (
      <Link id="event-card" to={`/e/${event.get('id')}`} as='div'>
        <div className="image"
          style={{
            backgroundImage: `url(${event.get('image') || `https://rafhiw.com/uploads/default.png`})`
          }}
          alt={event.get('name')}
        />

        <div className="content">
          <h4 className="name">{event.get('name')}</h4>
          <p>{event.get('location_name')}</p>
          <p className="date">
            <DateConvert date={event.get('start_date')} /> -{' '}
            <DateConvert date={event.get('end_date')} />
          </p>
        </div>
      </Link>
    )
  }
}

export default EventCard
