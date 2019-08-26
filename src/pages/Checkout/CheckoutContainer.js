import { connect } from 'react-redux';
import { Map } from 'immutable';

import { fetchOrder, cancelOrder, createTransfer } from 'actions/orders';
import orderSchema from 'schemas/order';

import Checkout from './Checkout';

const mapStateToProps = state => ({
  order: state.getIn(['orders', 'data'], Map()),
  id: state.getIn(['orders', 'id'], Map()),
  user: state.getIn(['user', 'data'], Map())
});

const mapDispatchToProps = {
  loadOrder: id => fetchOrder(id, orderSchema),
  cancelOrder: id => cancelOrder(id, orderSchema),
  createTransfer: (id, data, key) => createTransfer(id, data, key, orderSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
