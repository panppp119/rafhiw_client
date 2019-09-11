import { connect } from 'react-redux';
import { Map, List } from 'immutable';

import {
  updateCart,
  fetchCart,
  removeProduct,
} from 'actions/cart';
import { fetchAddresses } from 'actions/addresses';
import { createOrder } from 'actions/orders';
import cartSchema from 'schemas/cart';
import orderSchema from 'schemas/order';
import addressSchema from 'schemas/address';

import Cart from './Cart';

const mapStateToProps = state => ({
  cart: state.getIn(['cart', 'data'], Map()),
  user: state.getIn(['user', 'data'], Map()),
  addresses: state.getIn(['addresses', 'collection'], List())
});

const mapDispatchToProps = {
  updateCart: (id, cartProducts) => updateCart(id, cartProducts, cartSchema),
  loadCart: () => fetchCart(cartSchema),
  loadAddresses: () => fetchAddresses(addressSchema),
  removeProduct: (id, data) => removeProduct(id, data, cartSchema),
  createOrder: data => createOrder(data, orderSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
