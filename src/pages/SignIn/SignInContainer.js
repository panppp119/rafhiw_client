import { connect } from 'react-redux';

import { signin, oauth } from 'actions/auth';

import SignIn from './SignIn';

const mapStateToProps = state => ({
  loadingSignIn: state.getIn(['auth', 'loading'], false)
});

const mapDispatchToProps = {
  signin: data => signin(data),
  oauth: provider => oauth(provider)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
