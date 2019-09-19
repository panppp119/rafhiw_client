import React from 'react'
import { List } from 'immutable'
import { Route, Switch, Link } from 'react-router-dom';
import { FaUser, FaWallet, FaStore, FaMapMarkedAlt, FaStar, FaHistory, FaSignOutAlt } from 'react-icons/fa'

import UserLayout from 'components/layouts/UserLayout'

import { Profile, Wallet, Addresses, Seller, Orders, Reviews } from './routes'

import './Account.scss'

class Account extends React.Component {
  render () {
    const { user } = this.props

    const roles = user.get('roles') || List()
    roles.filter(role => role === 'seller')

    return (
      <UserLayout>
        <div id="account-page">
          <div className="container">
            <div className="menu mobile">
              <ul>
                <li><Link to='/account'><FaUser /></Link></li>
                <li><Link to='/account/wallet'><FaWallet /></Link></li>
                <li><Link to='/account/addresses'><FaMapMarkedAlt /></Link></li>
                {
                  roles.filter(role => role === 'seller').size === 0 ? (
                    <li>
                      <Link to='/account/seller'><FaStore /></Link>
                    </li>
                  ) : null
                }
                <li><Link to='/account/orders'><FaStar /></Link></li>
                <li><Link to='/account/reviews'><FaHistory /></Link></li>
                <li><FaSignOutAlt onClick={() => this.props.signout()} /></li>
              </ul>
            </div>

            <div className="menu desktop">
              <ul>
                <li><Link to='/account'>บัญชีของฉัน</Link></li>
                <li><Link to='/account/wallet'>บัญชีธนาคาร/บัตร</Link></li>
                <li><Link to='/account/addresses'>ที่อยู่</Link></li>
                {
                  roles.filter(role => role === 'seller').size === 0 ? (
                    <li>
                      <Link to='/account/seller'>ยืนยันตัวตนผู้ขาย</Link>
                    </li>
                  ) : null
                }
                <li><Link to='/account/orders'>การซื้อของฉัน</Link></li>
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
                <Route
                  path="/account/wallet"
                  render={() => <Wallet {...this.props} />}
                />
                <Route
                  path="/account/addresses"
                  render={() => <Addresses {...this.props} />}
                />
                <Route
                  path="/account/seller"
                  render={() => <Seller {...this.props} />}
                />
                <Route
                  path="/account/orders"
                  render={() => <Orders {...this.props} />}
                />
                <Route
                  path="/account/reviews"
                  render={() => <Reviews {...this.props} />}
                />
              </Switch>
            </div>
          </div>
        </div>
      </UserLayout>
    )
  }
}

export default Account
