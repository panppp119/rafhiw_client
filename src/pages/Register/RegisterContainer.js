import { connect } from 'react-redux';
import { List } from 'immutable';

import { register } from 'actions/auth';
import { fetchDisabilities } from 'actions/info'
import { addFlashMessage } from 'actions/ui'

import Register from './Register';

const mapStateToProps = state => ({
  // loadingSignUp: state.getIn(['user', 'loading', 'user'], false),
  // user: state.getIn(['user', 'data'], Map())
  disabilities: state.getIn(['info', 'disabilities', 'data'], List())
});

const mapDispatchToProps = {
  loadDisabilities: () => fetchDisabilities(),
  register: (data) => register(data),
  addFlashMessage: (data) => addFlashMessage(data)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
