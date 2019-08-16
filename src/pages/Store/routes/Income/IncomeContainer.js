import { connect } from 'react-redux';
// import { List, Map } from 'immutable';
//
// import { fetchSellerOrders } from 'actions/orders';
// import orderSchema from 'schemas/order';

import Income from './Income';

const mapStateToProps = (state, props) => ({
  // orders: state.getIn(['orders', 'collection'], List()),
  // user: state.getIn(['user', 'data'], Map()),
  // loadingorders: state.getIn(['orders', 'loading'], false),
  // ...props
});

const mapDispatchToProps = {
  // loadOrders: id => fetchSellerOrders(id, orderSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Income);
