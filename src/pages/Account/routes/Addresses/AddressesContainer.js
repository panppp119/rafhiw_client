import { connect } from 'react-redux';

// import {
//   fetchAddresses,
//   createAddress,
//   deleteAddress
// } from 'actions/addresses';
// import addressSchema from 'schemas/address';

import Addresses from './Addresses';

const mapStateToProps = (state, props) => ({
  // addresses: state.getIn(['addresses', 'collection'], List()),
  // loadingAddresses: state.getIn(['user', 'loading', 'addresses'], false),
  ...props
});

const mapDispatchToProps = {
  // loadAddresses: options => fetchAddresses(addressSchema, options),
  // createAddress: (body, options) => createAddress(body, addressSchema, options),
  // deleteAddress: (id, options) => deleteAddress(id, addressSchema, options)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Addresses);
