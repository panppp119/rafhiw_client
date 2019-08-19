import { connect } from 'react-redux';
import { List } from 'immutable';

import { fetchCategories } from 'actions/categories';
import { fetchProducts } from 'actions/products';
import { fetchEvents } from 'actions/events';
import categorySchema from 'schemas/category';
import productSchema from 'schemas/product';
import eventSchema from 'schemas/event';

import Home from './Home';

const mapStateToProps = state => ({
  categories: state.getIn(['categories', 'collection'], List()),
  products: state.getIn(['products', 'collection'], List()),
  events: state.getIn(['events', 'collection'], List()),
  loadingEvents: state.getIn(['events', 'loading'], false),
  loadingCategories: state.getIn(['categories', 'loading'], false),
  loadingProducts: state.getIn(['products', 'loading'], false),
  // user: state.getIn(['user', 'data'], Map())
});

const mapDispatchToProps = {
  loadCategories: () => fetchCategories(categorySchema),
  loadProducts: () => fetchProducts(productSchema),
  loadEvents: () => fetchEvents(eventSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
