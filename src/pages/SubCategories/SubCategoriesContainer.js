import { connect } from 'react-redux';
import { Map } from 'immutable'

import { fetchSubCategory } from 'actions/sub_categories';
import subCategorySchema from 'schemas/sub_category'

import SubCategories from './SubCategories';

const mapStateToProps = state => ({
  subCategory: state.getIn(['sub_categories', 'data'], Map()),
});

const mapDispatchToProps = {
  loadSubCategory: (slug) => fetchSubCategory(slug, subCategorySchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubCategories);
