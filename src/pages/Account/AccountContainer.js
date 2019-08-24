import { connect } from 'react-redux';
import { Map, List } from 'immutable';

import { fetchDisabilities } from 'actions/info'
import { fetchUser, createAttachment } from 'actions/user'
import userSchema from 'schemas/user'
import Account from './Account';

const mapStateToProps = state => ({
  user: state.getIn(['user', 'data'], Map()),
  disabilities: state.getIn(['info', 'disabilities', 'data'], List())
});

const mapDispatchToProps = {
  loadDisabilities: () => fetchDisabilities(),
  loadUser: () => fetchUser(userSchema),
  upload: (id, data, type) =>
    createAttachment(id, data, userSchema, type)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
