import { connect } from 'react-redux';
import { List, Map } from 'immutable';

import { fetchReviews, createReview } from 'actions/reviews';
import reviewSchema from 'schemas/review';

import Reviews from './Reviews';

const mapStateToProps = (state, props) => ({
  user: state.getIn(['user', 'data'], Map()),
  reviews: state.getIn(['reviews', 'collection'], List()),
  ...props
});

const mapDispatchToProps = {
  loadReviews: body => fetchReviews(body, reviewSchema),
  createReview: (body, options) => createReview(body, reviewSchema, options)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews);
