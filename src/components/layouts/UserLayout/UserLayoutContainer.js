import { connect } from 'react-redux';
import { Map } from 'immutable';

import { setFontSize, setTheme } from 'actions/ui';

import UserLayout from './UserLayout';

const mapStateToProps = state => ({
  themeColor: state.getIn(['ui', 'theme'], 'theme-orange'),
  fontSize: state.getIn(['ui', 'font'], 'age-first'),
  flash_message: state.getIn(['ui', 'flash_message'], Map()),
  // user: state.getIn(['user', 'data'], Map())
});

const mapDispatchToProps = {
  setFontSize: bool => setFontSize(bool),
  setTheme: theme => setTheme(theme)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLayout);
