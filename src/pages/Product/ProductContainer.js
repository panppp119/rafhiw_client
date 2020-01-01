import { connect } from 'react-redux';
import { Map, List } from 'immutable';

import { fetchProduct } from 'actions/products';
import { fetchCategory } from 'actions/categories';
import { fetchEvents } from 'actions/events';
import {
  fetchCart,
  createCart,
  updateCart
} from 'actions/cart';
import productSchema from 'schemas/product';
import eventSchema from 'schemas/event';
import cartSchema from 'schemas/cart';
import categorySchema from 'schemas/category';

import Product from './Product';

const mapStateToProps = state => ({
  product: state.getIn(['products', 'data'], Map()),
  products: state.getIn(['categories', 'data', 'products'], List()),
  events: state.getIn(['events', 'collection'], List()),
  cartProducts: state.getIn(['cart', 'cartProducts'], List()),
  cart: state.getIn(['cart', 'data'], Map()),
  user: state.getIn(['user', 'data'], Map()),
  loadingProduct: state.getIn(['products', 'loading'], false),
  loadingEvents: state.getIn(['events', 'loading'], false)
});

const mapDispatchToProps = {
  loadProduct: id => fetchProduct(id, productSchema),
  loadProducts: id => fetchCategory(id, categorySchema),
  loadEvents: () => fetchEvents(eventSchema),
  loadCart: () => fetchCart(cartSchema),
  createCart: (body, cartProducts) => createCart(body, cartSchema),
  updateCart: (id, body) => updateCart(id, body, cartSchema),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
