import React, { Fragment } from 'react'
import ClassNames from 'classnames'
import { Link, withRouter } from 'react-router-dom'
import { List } from 'immutable'
import { FaShoppingCart, FaCommentDots, FaBell, FaUser, FaFont, FaSignInAlt, FaSun, FaMoon, FaArchive, FaAddressCard, FaSignOutAlt, FaPlus } from 'react-icons/fa'

import logo from './logo.png'
import logo_pimary from './logo_pimary.png'
import './StoreTopNav.scss'

class StoreTopNav extends React.Component {

  state = {
    nightmode: this.props.themeColor === 'theme-dark'
  }

  componentDidMount () {
    if (this.props.user.isEmpty()) {
      return this.props.checkSession();
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
    this.props.signout().then(() => {
      this.props.history.push('/sign_in')
    })
  }

  handleChangeFont(age) {
    this.props.setFont(age);
  }

  changeMode = e => {
    this.setState({ nightmode: !this.state.nightmode })

    if (!this.state.nightmode) {
      this.props.setTheme('theme-dark')
    }
    else {
      this.props.setTheme('theme-orange')
    }
  }

  render () {

    const {  user } = this.props
    const roles = user.get('roles') || List()


    
    return (
      <div id="store-top-nav">
        <div className="mobile">
          <ul>
            <li className='search'></li>
            <li><Link to='/cart'><FaShoppingCart /></Link></li>
            <li><Link to='/messages'><FaCommentDots /></Link></li>
          </ul>
        </div>

        <div className="desktop">
          <div className="first">
            <ul className='container'>
              <li className='display'>
                {/* การแสดงผล */}
                <span className='size1' onClick={() => this.handleChangeFont(20)}>
                  <FaFont />
                </span>
                <span className='size2' onClick={() => this.handleChangeFont(35)}>
                  <FaFont />
                </span>
                <span className='size3' onClick={() => this.handleChangeFont(45)}>
                  <FaFont />
                </span>
                {
                  this.state.nightmode ? (
                    <span>
                      <FaMoon className='moon' 
                        onClick={this.changeMode}
                      />
                    </span>
                  ) : (
                    <span>
                      <FaSun className='sun'
                        onClick={this.changeMode}
                      />
                    </span>
                  )
                }
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
                        <li><Link to='/account'><FaAddressCard /> บัญชีของฉัน</Link></li>
                        {
                          roles.filter(role => role === 'seller').size !== 0 ? (
                            <li><Link to='/store'><FaArchive /> ร้านค้า</Link></li>
                          ) : null
                        }
                        <li onClick={this.signOut}><Link to='/'><FaSignOutAlt /> ออกจากระบบ</Link></li>
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
                {/* {
                this.state.nightmode ? (
                      <Link to='/'><img src={logo} alt="logo" /></Link>
                  ) : (
                      <Link to='/'><img src={logo_pimary} alt="logo" /></Link>
                  )
                  
                } */}
                <Link to='/'><img src={logo} alt="logo" /></Link>
              </li>
              <li><h3>ร้านค้า</h3></li>
              <li className='add-product'>
                <Link to='/store/add_product'>
                  <FaPlus /> เพิ่มสินค้า
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(StoreTopNav)
