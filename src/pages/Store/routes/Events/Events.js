import React from 'react';
// import { Map } from 'immutable';
//
// import EventTable from 'components/tables/EventTable';

import './Events.scss';

class Events extends React.Component {
  // static defaultProps = {
  //   user: Map()
  // };

  // componentDidMount() {
  //   !this.props.user.isEmpty() && this.props.loadEvents();
  // }
  //
  // componentDidUpdate(prevProps) {
  //   if (prevProps.user.isEmpty() && prevProps.user !== this.props.user) {
  //     this.props.loadEvents();
  //   }
  // }

  render() {
    return (
      <div className="events section">
        {/* <EventTable {...this.props} /> */}
      </div>
    );
  }
}

export default Events;
