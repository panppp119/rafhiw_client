import { connect } from 'react-redux';
import { Map, List } from 'immutable';

import { setTheme, setFontSize } from 'actions/ui';
import { signout, checkSession } from 'actions/auth';
// import { fetchCart } from 'actions/cart';
// import { fetchNotifications } from 'actions/utilities';
// import cartSchema from 'schemas/cart';

import StoreTopNav from './StoreTopNav';

const mapStateToProps = state => ({
  themeColor: state.getIn(['ui', 'theme'], 'theme-orange'),
  fontSize: state.getIn(['ui', 'font'], 'age-first'),
  user: state.getIn(['user', 'data'], Map()),
  notifications: state.getIn(['utilities', 'notifications'], List()),
  loadingUser: state.getIn(['user', 'loading'], false)
});

const mapDispatchToProps = {
  setTheme: themeColor => setTheme(themeColor),
  setFont: age => setFontSize(age),
  // loadCart: () => fetchCart(cartSchema),
  // loadNotifications: () => fetchNotifications(),
  signout: () => signout(),
  checkSession: () => checkSession()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreTopNav);
