import { connect } from 'react-redux';
import { List, Map } from 'immutable';

import { fetchSellerOrders } from 'actions/orders';
import orderSchema from 'schemas/order';

import Income from './Income';

const mapStateToProps = (state, props) => ({
  orders: state.getIn(['orders', 'collection'], List()),
  user: state.getIn(['user', 'data'], Map()),
  ...props
});

const mapDispatchToProps = {
  loadOrders: () => fetchSellerOrders(orderSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Income);
