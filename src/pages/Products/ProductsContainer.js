import { connect } from 'react-redux';
import { List, Map } from 'immutable';

import { fetchProducts } from 'actions/products';
import productSchema from 'schemas/product';

import Products from './Products';

const mapStateToProps = state => ({
  products: state.getIn(['products', 'collection'], List()),
  loadingProducts: state.getIn(['products', 'loading'], false),
  user: state.getIn(['user', 'data'], Map())
});

const mapDispatchToProps = {
  loadProducts: () => fetchProducts(productSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
