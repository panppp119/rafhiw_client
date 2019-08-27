import { connect } from 'react-redux';
import { List, Map } from 'immutable';

import {
  fetchOrders,
  cancelOrder,
  updateOrder,
  updateOrderId,
  comfirmProduct
} from 'actions/orders';
// import { createReview } from 'actions/reviews';
import orderSchema from 'schemas/order';
// import reviewSchema from 'schemas/review';

import Orders from './Orders';

const mapStateToProps = (state, props) => ({
  user: state.getIn(['user', 'data'], Map()),
  orders: state.getIn(['orders', 'collection'], List()),
  ...props
});

const mapDispatchToProps = {
  loadOrders: options => fetchOrders(orderSchema, { query: options }),
  cancelOrder: (id, user_id) => cancelOrder(id, user_id, orderSchema),
  update: (id, body) => updateOrder(id, body, orderSchema),
  updateOrderId: id => updateOrderId(id, orderSchema),
  confirm: id => comfirmProduct(id, orderSchema),
  // review: body => createReview(body, reviewSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
