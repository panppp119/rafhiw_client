import React from 'react'
import { withRouter, Route, Switch, Link } from 'react-router-dom';
import { FaUser, FaWallet, FaStore, FaMapMarkedAlt, FaStar, FaHistory } from 'react-icons/fa'

import UserLayout from 'components/layouts/UserLayout'

import Profile from './Profile';
// import Wallet from './Wallet';
import Addresses from './Addresses';
// import Seller from './Seller';
// import History from './History';
// import Reviews from './Reviews';

import './Account.scss'

class Account extends React.Component {
  render () {
    return (
      <UserLayout>
        <div id="account-page">
          <div className="container">
            <div className="menu mobile">
              <ul>
                <li><Link to='/account'><FaUser /></Link></li>
                <li><Link to='/account/wallet'><FaWallet /></Link></li>
                <li><Link to='/account/addresses'><FaMapMarkedAlt /></Link></li>
                <li><Link to='/account/seller'><FaStore /></Link></li>
                <li><Link to='/account/history'><FaStar /></Link></li>
                <li><Link to='/account/reviews'><FaHistory /></Link></li>
              </ul>
            </div>
            <div className="menu desktop">
              <ul>
                <li><Link to='/account'>บัญชีของฉัน</Link></li>
                <li><Link to='/account/wallet'>บัญชีธนาคาร/บัตร</Link></li>
                <li><Link to='/account/addresses'>ที่อยู่</Link></li>
                <li><Link to='/account/seller'>ยืนยันตัวตนผู้ขาย</Link></li>
                <li><Link to='/account/history'>การซื้อของฉัน</Link></li>
                <li><Link to='/account/reviews'>รีวิว</Link></li>
              </ul>
            </div>

            <div className="content">
              <Switch>
                <Route
                  exact
                  path="/account"
                  render={() => <Profile {...this.props} />}
                />
                {/* <Route
                  path="/account/wallet"
                  render={() => <Wallet {...this.props} />}
                /> */}
                <Route
                  path="/account/addresses"
                  render={() => <Addresses {...this.props} />}
                />
                {/* <Route
                  path="/account/seller"
                  render={() => <Seller {...this.props} />}
                />
                <Route
                  path="/account/history"
                  render={() => <History {...this.props} />}
                />
                <Route
                  path="/account/reviews"
                  render={() => <Reviews {...this.props} />}
                /> */}
              </Switch>
            </div>
          </div>
        </div>
      </UserLayout>
    )
  }
}

export default Account
