import { connect } from 'react-redux';
import { Map, List } from 'immutable';

import { setTheme, setFontSize } from 'actions/ui';
import { signout, checkSession } from 'actions/auth';
import { fetchCart } from 'actions/cart';
import { fetchUser } from 'actions/user'
import { fetchSearch } from 'actions/search';
import cartSchema from 'schemas/cart';
import userSchema from 'schemas/user';
import searchSchema from 'schemas/search';

import TopNav from './TopNav';

const mapStateToProps = state => ({
  themeColor: state.getIn(['ui', 'theme'], 'theme-orange'),
  fontSize: state.getIn(['ui', 'font'], 'age-first'),
  user: state.getIn(['user', 'data'], Map()),
  notifications: state.getIn(['utilities', 'notifications'], List()),
  loadingUser: state.getIn(['user', 'loading'], false),
  cart: state.getIn(['cart', 'data'], Map()),
  searchData: state.getIn(['search', 'collection'], List()),
});

const mapDispatchToProps = {
  setTheme: themeColor => setTheme(themeColor),
  setFont: age => setFontSize(age),
  loadCart: () => fetchCart(cartSchema),
  loadUser: () => fetchUser(userSchema),
  signout: () => signout(),
  checkSession: () => checkSession(),
  search: (data) => fetchSearch(data, searchSchema)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNav);
