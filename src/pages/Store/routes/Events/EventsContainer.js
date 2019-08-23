import { connect } from 'react-redux';
import { List, Map } from 'immutable';
//
import { fetchMyEvents, updateEvent } from 'actions/events';
import eventSchema from 'schemas/event';

import Events from './Events';

const mapStateToProps = (state, props) => ({
  events: state.getIn(['events', 'collection'], List()),
  user: state.getIn(['user', 'data'], Map()),
  loadingEvents: state.getIn(['events', 'loading'], false),
  ...props
});

const mapDispatchToProps = {
  loadEvents: () => fetchMyEvents(eventSchema),
  updateEvent: (id, body) => updateEvent(id, body, eventSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
