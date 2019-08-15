import React from 'react'
import { Link } from 'react-router-dom'
import { FaCart, FaCommentDots, FaBell, FaUser, FaFont } from 'react-icons/fa'

import logo from './logo.png'
import './TopNav.scss'

class TopNav extends React.Component {
  signOut = () => {
    console.log('sign_out')
  }

  render () {
    return (
      <div id="top-nav">
        <div className="mobile">
          <ul>
            <li className='search'>ค้นหา</li>
            <li><Link to='/cart'><FaCart /></Link></li>
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
              <li className='user'><FaUser />
                <ul>
                  <li><Link to='/profile'>บัญชีของฉัน</Link></li>
                  <li><Link to='/store'>ร้านของฉัน</Link></li>
                  <li><Link to='/sign_in'>เข้าสู่ระบบ</Link></li>
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
              <li className='search'>ค้นหา</li>
              <li><Link to='/cart'><FaCart /></Link></li>
            </ul>
          </div>

          <div className="third">
            <ul className='container'>
              <li><Link to='/'>หน้าหลัก</Link></li>
              <li><Link to='/products'>สินค้า</Link></li>
              <li><Link to='/events'>งานลดราคา</Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default TopNav
