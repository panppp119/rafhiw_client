import React, { Fragment } from 'react'
import ClassNames from 'classnames'
import { List } from 'immutable'
import { Link, withRouter } from 'react-router-dom'
import { FaShoppingCart, FaCommentDots, FaBell, FaUser, FaFont, FaSignInAlt } from 'react-icons/fa'

import logo from './logo.png'
import './TopNav.scss'

class TopNav extends React.Component {
  componentDidMount () {
    if (this.props.user.isEmpty() && localStorage.getItem('auth') == null) {
      this.props.checkSession();
    }
    else if (this.props.user.isEmpty() && localStorage.getItem('auth') !== null) {
      this.props.loadUser()
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.user.isEmpty() && prevProps.user !== this.props.user) ||
      prevProps.user !== this.props.user
    ) {
      this.props.loadCart();
    }
  }

  signOut = () => {
    this.props.signout()
  }

  render () {
    const { location, user } = this.props
    const { cart } = this.props;

    const roles = user.get('roles') || List()
    const totalQuantity = cart.get('total_qt') || 0;

    return (
      <div id="top-nav">
        <div className="mobile">
          <ul>
            <li className='search'></li>
            <li>
              <Link to='/cart'>
                <FaShoppingCart />
                {totalQuantity !== 0 && <span className='total-qt'>{totalQuantity}</span>}
              </Link>
            </li>
            <li><Link to='/messages'><FaCommentDots /></Link></li>
          </ul>
        </div>

        <div className="desktop">
          <div className="first">
            <ul className='container'>
              <li className='display'>
                การแสดงผล
                <span className='size1'><FaFont /></span>
                <span className='size2'><FaFont /></span>
                <span className='size3'><FaFont /></span>
              </li>
              <li className='empty' />
              <li className='user'>
                {
                  user.isEmpty() ? (
                    <Link to='/sign_in'><FaSignInAlt /></Link>
                  ) : (
                    <Fragment>
                      <FaUser />
                      <ul>
                        <li><Link to='/account'>บัญชีของฉัน</Link></li>
                        {
                          roles.filter(role => role === 'seller').size !== 0 ? (
                            <li><Link to='/store'>ร้านค้า</Link></li>
                          ) : null
                        }
                        <li onClick={this.signOut}>ออกจากระบบ</li>
                      </ul>
                    </Fragment>
                  )
                }
              </li>
              <li><FaBell /></li>
            </ul>
          </div>

          <div className="second">
            <ul className='container'>
              <li className='logo'>
                <Link to='/'><img src={logo} alt="logot" /></Link>
              </li>
              <li className='search'></li>
              <li>
                <Link to='/cart'>
                  <FaShoppingCart />
                  {totalQuantity !== 0 && <span className='total-qt'>{totalQuantity}</span>}
                </Link>
              </li>
            </ul>
          </div>

          <div className="third">
            <ul className='container'>
              <li className={ClassNames({ active: location.pathname === '/'})}>
                <Link to='/'>หน้าหลัก</Link>
              </li>
              <li className={ClassNames({ active: location.pathname === '/products'})}>
                <Link to='/products'>สินค้า</Link>
              </li>
              <li className={ClassNames({ active: location.pathname === '/events'})}>
                <Link to='/events'>งานลดราคา</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TopNav)
