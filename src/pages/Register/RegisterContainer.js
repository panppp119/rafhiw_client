import { connect } from 'react-redux';
import { List } from 'immutable';

import { register } from 'actions/auth';
import { fetchDisabilities } from 'actions/info'

import Register from './Register';

const mapStateToProps = state => ({
  // loadingSignUp: state.getIn(['user', 'loading', 'user'], false),
  // user: state.getIn(['user', 'data'], Map())
  disabilities: state.getIn(['info', 'disabilities', 'data'], List())
});

const mapDispatchToProps = {
  loadDisabilities: () => fetchDisabilities(),
  signUp: (data) => register(data)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
