import React from 'react'
import { Link } from 'react-router-dom'

import './EventCard.scss'

class EventCard extends React.Component {
  render () {
    return (
      <Link id="event-card" to='/' as='div'>
        <div className="image"
          style={{
            backgroundImage: 'url()'
          }}
          alt=''
        />

        <div className="content">
          <p className="name">Name</p>
          <p className="date">Date</p>
        </div>
      </Link>
    )
  }
}

export default EventCard
