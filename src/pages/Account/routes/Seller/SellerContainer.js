import { connect } from 'react-redux';
import { Map } from 'immutable';

import { requestRole, fetchRequestRole } from 'actions/user';
// import { createAttachment } from 'actions/attachments';
import userSchema from 'schemas/user';
// import attachmentSchema from 'schemas/attachment';

import Seller from './Seller';

const mapStateToProps = (state, props) => ({
  user: state.getIn(['user', 'data'], Map()),
  requestSeller: state.getIn(['user', 'requestSeller'], Map()),
  loadingRequest: state.getIn(['user', 'loading'], false),
  loadingAttachment: state.getIn(['attachments', 'loading'], false),
  ...props
});

const mapDispatchToProps = {
  loadRequestRole: () => fetchRequestRole(userSchema),
  requestRole: data => requestRole(data, userSchema),
  // addAttachment: (id, data, type) =>
  //   createAttachment(id, data, type, attachmentSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Seller);
