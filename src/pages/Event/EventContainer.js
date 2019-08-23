import { connect } from 'react-redux';
import { Map } from 'immutable';

import { fetchEvent } from 'actions/events';
import eventSchema from 'schemas/event';

import Event from './Event';

const mapStateToProps = state => ({
  user: state.getIn(['user', 'data'], Map()),
  event: state.getIn(['events', 'data'], Map()),
  loadingEvent: state.getIn(['events', 'loading'], false)
});

const mapDispatchToProps = {
  loadEvent: (id, options) => fetchEvent(id, eventSchema, options)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
