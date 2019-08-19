import { connect } from 'react-redux';
import { List, Map } from 'immutable'

import { fetchProducts } from 'actions/products';
import { fetchCategory } from 'actions/categories';
import productSchema from 'schemas/product'
import categorySchema from 'schemas/category'

import Categories from './Categories';

const mapStateToProps = state => ({
  products: state.getIn(['products', 'collection'], List()),
  category: state.getIn(['categories', 'data'], Map()),
  loadingProducts: state.getIn(['products', 'loading'], false)
});

const mapDispatchToProps = {
  loadProducts: (query) => fetchProducts(productSchema, query),
  loadCategory: (slug) => fetchCategory(slug, categorySchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
