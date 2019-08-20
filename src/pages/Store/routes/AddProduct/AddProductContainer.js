import { connect } from 'react-redux';
import { List, Map } from 'immutable';

import { createProduct } from 'actions/products';
// import { createAttachment } from 'actions/attachments';
import { fetchCategories } from 'actions/categories';
import { fetchSubCategories } from 'actions/sub_categories';
import { fetchEvents, createEvent } from 'actions/events';
import productSchema from 'schemas/product';
import categorySchema from 'schemas/category';
import subCategorySchema from 'schemas/sub_category';
import eventSchema from 'schemas/event';
// import attachmentSchema from 'schemas/attachment';

import AddProduct from './AddProduct';

const mapStateToProps = (state, props) => ({
  products: state.getIn(['products', 'collection'], List()),
  user: state.getIn(['user', 'data'], Map()),
  loadingProducts: state.getIn(['products', 'loading'], false),
  // loadingAttachments: state.getIn(['attachments', 'loading'], false),
  events: state.getIn(['events', 'collection'], List()),
  categories: state.getIn(['categories', 'collection'], List()),
  sub_categories: state.getIn(['sub_categories', 'collection'], List()),
  ...props
});

const mapDispatchToProps = {
  loadCategories: () => fetchCategories(categorySchema),
  loadSubCategories: (category_id) => fetchSubCategories(subCategorySchema, category_id),
  loadEvents: () => fetchEvents(eventSchema),
  createProduct: body => createProduct(body, productSchema),
  createEvent: body => createEvent(body, eventSchema),
  // createAttachment: (id, body, type) =>
  //   createAttachment(id, body, type, attachmentSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct);
