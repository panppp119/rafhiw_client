import { connect } from 'react-redux';
import { Map } from 'immutable'

import { fetchCategory } from 'actions/categories';
import categorySchema from 'schemas/category'

import Categories from './Categories';

const mapStateToProps = state => ({
  category: state.getIn(['categories', 'data'], Map()),
});

const mapDispatchToProps = {
  loadCategory: (slug) => fetchCategory(slug, categorySchema),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
