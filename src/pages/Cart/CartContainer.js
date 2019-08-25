import { connect } from 'react-redux';
import { Map } from 'immutable';

import {
  updateCart,
  fetchCart,
  removeProduct,
} from 'actions/cart';
import { createOrder } from 'actions/orders';
import cartSchema from 'schemas/cart';
import orderSchema from 'schemas/order';

import Cart from './Cart';

const mapStateToProps = state => ({
  cart: state.getIn(['cart', 'data'], Map()),
  user: state.getIn(['user', 'data'], Map())
});

const mapDispatchToProps = {
  updateCart: (id, cartProducts) => updateCart(id, cartProducts, cartSchema),
  loadCart: () => fetchCart(cartSchema),
  removeProduct: (id, data) => removeProduct(id, data, cartSchema),
  createOrder: data => createOrder(data, orderSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
