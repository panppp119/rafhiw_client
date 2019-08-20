import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FaShoppingCart, FaCommentDots, FaBell, FaUser, FaFont, FaPlus } from 'react-icons/fa'

import logo from './logo.png'
import './StoreTopNav.scss'

class StoreTopNav extends React.Component {
  componentDidMount () {
    if (this.props.user.isEmpty() || localStorage.getItem('auth') == null) {
      this.props.checkSession();
    }
  }

  signOut = () => {
    this.props.signout()
  }

  render () {
    return (
      <div id="store-top-nav">
        <div className="mobile">
          <ul>
            <li className='search'>ค้นหา</li>
            <li><Link to='/cart'><FaShoppingCart /></Link></li>
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
                <FaUser />
                <ul>
                  <li><Link to='/account'>บัญชีของฉัน</Link></li>
                  <li><Link to='/store'>ร้านค้า</Link></li>
                  <li onClick={this.signOut}>ออกจากระบบ</li>
                </ul>
              </li>
              <li><FaBell /></li>
            </ul>
          </div>

          <div className="second">
            <ul className='container'>
              <li className='logo'>
                <Link to='/'><img src={logo} alt="logot" /></Link>
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
