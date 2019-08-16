import { connect } from 'react-redux';
// import { List, Map } from 'immutable';
//
// import { fetchProducts, deleteProduct } from 'actions/products';
// import productSchema from 'schemas/product';

import Products from './Products';

const mapStateToProps = (state, props) => ({
  // products: state.getIn(['products', 'collection'], List()),
  // user: state.getIn(['user', 'data'], Map()),
  // loadingProducts: state.getIn(['products', 'loading'], false),
  // ...props
});

const mapDispatchToProps = {
  // loadProducts: () => fetchProducts(productSchema),
  // deleteProduct: (id, options) => deleteProduct(id, productSchema, options)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
