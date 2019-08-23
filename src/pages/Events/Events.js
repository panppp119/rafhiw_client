import React from 'react'

import UserLayout from 'components/layouts/UserLayout'
import { EventCard } from 'components/cards'

import './Events.scss'

class Events extends React.Component {
  componentDidMount () {
    this.props.loadEvents()
  }

  render () {
    const { events } = this.props

    return (
      <UserLayout>
        <div id="events-page">
          <div className="container">
            <div className="events">
              <div className="mobile">
                {
                  !events.isEmpty() ? events.map((event, i) => {
                    return (
                      <div className="column" key={i}>
                        <EventCard event={event} />
                      </div>
                    )
                  }) : <p>ไม่มีงาน</p>
                }
              </div>

              <div className="desktop">
                {
                  !events.isEmpty() ? events.map((event, i) => {
                    return (
                      <div className="column" key={i}>
                        <EventCard event={event} />
                      </div>
                    )
                  }) : <p>ไม่มีงาน</p>
                }
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    )
  }
}

export default Events
