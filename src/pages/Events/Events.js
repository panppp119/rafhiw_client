import React from 'react'

import UserLayout from 'components/layouts/UserLayout'
import { EventCard } from 'components/cards'

import './Events.scss'

class Events extends React.Component {
  render () {
    return (
      <UserLayout>
        <div id="events-page">
          <div className="container">
            <div className="events">
              <h3>งานลดราคา</h3>

              <div className="mobile">
                <div className="column">
                  <EventCard />
                </div>
                <div className="column">
                  <EventCard />
                </div>
              </div>

              <div className="desktop">
                <div className="column">
                  <EventCard />
                </div>
                <div className="column">
                  <EventCard />
                </div>
                <div className="column">
                  <EventCard />
                </div>
                <div className="column">
                  <EventCard />
                </div>
                <div className="column">
                  <EventCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    )
  }
}

export default Events
