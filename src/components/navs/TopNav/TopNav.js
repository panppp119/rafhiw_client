import React from 'react'
import { Link } from 'react-router-dom'
import { FaOpencart, FaCommentDots, FaBell, FaUser } from 'react-icons/fa'

import './TopNav.scss'

class TopNav extends React.Component {
  render () {
    return (
      <div id="top-nav">
        <div className="mobile">
          <ul>
            <li className='search'>ค้นหา</li>
            <li><Link to='/cart'><FaOpencart /></Link></li>
            <li><Link to='/messages'><FaCommentDots /></Link></li>
          </ul>
        </div>

        <div className="desktop">
          <div className="first">
            <ul className='container'>
              <li className='display'>การแสดงผล</li>
              <li className='empty' />
              <li><Link to='/profile'><FaUser /></Link></li>
              <li><FaBell /></li>
            </ul>
          </div>

          <div className="second">
            <ul className='container'>
              <li className='logo'><Link to='/'>โลโก้</Link></li>
              <li className='search'>ค้นหา</li>
              <li><Link to='/cart'><FaOpencart /></Link></li>
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
