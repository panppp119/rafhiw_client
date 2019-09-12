import { connect } from 'react-redux';
import { List, Map } from 'immutable';

import { fetchMyProducts, deleteProduct } from 'actions/products';
import productSchema from 'schemas/product';

import OutOfStock from './OutOfStock';

const mapStateToProps = (state, props) => ({
  products: state.getIn(['products', 'collection'], List()),
  user: state.getIn(['user', 'data'], Map()),
  loadingProducts: state.getIn(['products', 'loading'], false),
  ...props
});

const mapDispatchToProps = {
  loadProducts: () => fetchMyProducts(productSchema),
  deleteProduct: (id) => deleteProduct(id, productSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OutOfStock);
