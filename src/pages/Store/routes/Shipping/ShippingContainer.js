import { connect } from 'react-redux';
import { List, Map } from 'immutable';

import { fetchSellerOrders, updateTrackingId } from 'actions/orders';
import orderSchema from 'schemas/order';

import Shipping from './Shipping';

const mapStateToProps = (state, props) => ({
  orders: state.getIn(['orders', 'collection'], List()),
  user: state.getIn(['user', 'data'], Map()),
  ...props
});

const mapDispatchToProps = {
  loadOrders: id => fetchSellerOrders(id, orderSchema),
  updateTrackingId: (id, track) => updateTrackingId(id, track, orderSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shipping);
