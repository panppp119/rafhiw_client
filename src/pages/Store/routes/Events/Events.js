import React from 'react';
import { Map } from 'immutable';

import EventTable from 'components/tables/EventTable';
import Loader from 'components/Loader'

import './Events.scss';

class Events extends React.Component {
  static defaultProps = {
    user: Map()
  };

  componentDidMount() {
    !this.props.user.isEmpty() && this.props.loadEvents();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.isEmpty() && prevProps.user !== this.props.user) {
      this.props.loadEvents();
    }
  }

  render() {
    return (
      <div className="events">
        <Loader loading={this.props.loadingEvents}>
          <EventTable {...this.props} />
        </Loader>
      </div>
    );
  }
}

export default Events;
