import { connect } from 'react-redux';
import { List, Map } from 'immutable'

import { fetchProducts } from 'actions/products';
import { fetchSubCategory } from 'actions/sub_categories';
import productSchema from 'schemas/product'
import subCategorySchema from 'schemas/sub_category'

import SubCategories from './SubCategories';

const mapStateToProps = state => ({
  products: state.getIn(['products', 'collection'], List()),
  subCategory: state.getIn(['sub_categories', 'data'], Map()),
  loadingProducts: state.getIn(['products', 'loading'], false)
});

const mapDispatchToProps = {
  loadProducts: (query) => fetchProducts(productSchema, query),
  loadSubCategory: (slug) => fetchSubCategory(slug, subCategorySchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubCategories);
