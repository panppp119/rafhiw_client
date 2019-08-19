import { connect } from 'react-redux';
import { List, Map } from 'immutable';

import { fetchEvents } from 'actions/events';
import eventSchema from 'schemas/event';

import Events from './Events';

const mapStateToProps = state => ({
  events: state.getIn(['events', 'collection'], List()),
  loadingEvents: state.getIn(['events', 'loading'], false),
  user: state.getIn(['user', 'data'], Map())
});

const mapDispatchToProps = {
  loadEvents: () => fetchEvents(eventSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
