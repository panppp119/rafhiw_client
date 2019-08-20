import { connect } from 'react-redux';
import { Map } from 'immutable';

import Account from './Account';

const mapStateToProps = state => ({
  user: state.getIn(['user', 'data'], Map())
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
